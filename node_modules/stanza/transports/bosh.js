"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readable_stream_1 = require("readable-stream");
const stanza_shims_1 = require("stanza-shims");
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Utils_1 = require("../Utils");
class RequestChannel {
    constructor(stream) {
        this.active = false;
        this.maxRetries = 5;
        this.stream = stream;
        this.maxTimeout = 1000 * 1.1 * this.stream.maxWaitTime;
    }
    async send(rid, body) {
        this.rid = rid;
        this.active = true;
        let attempts = 0;
        while (attempts <= this.maxRetries) {
            attempts += 1;
            try {
                const res = await Utils_1.timeoutPromise(stanza_shims_1.fetch(this.stream.url, {
                    body,
                    headers: {
                        'Content-Type': this.stream.contentType
                    },
                    method: 'POST'
                }), this.maxTimeout, () => new Error('Request timed out'));
                if (!res.ok) {
                    throw new Error('HTTP Status Error: ' + res.status);
                }
                const result = await res.text();
                this.active = false;
                return result;
            }
            catch (err) {
                if (attempts === 1) {
                    continue;
                }
                else if (attempts < this.maxRetries) {
                    const backoff = Math.min(this.maxTimeout, Math.pow(attempts, 2) * 1000);
                    await Utils_1.sleep(backoff + Math.random() * 1000);
                    continue;
                }
                else {
                    this.active = false;
                    throw err;
                }
            }
        }
        throw new Error('Request failed');
    }
}
class BOSH extends readable_stream_1.Duplex {
    constructor(client, sm, stanzas) {
        super({
            objectMode: true
        });
        this.rid = Math.floor(Math.random() * 0xffffffff);
        this.sid = '';
        this.maxHoldOpen = 2;
        this.maxWaitTime = 30;
        this.contentType = 'text/xml; charset=utf-8';
        this.channels = [new RequestChannel(this), new RequestChannel(this)];
        this.activeChannelID = 0;
        this.queue = [];
        this.isEnded = false;
        this.client = client;
        this.sm = sm;
        this.stanzas = stanzas;
        this.on('data', e => {
            this.client.emit('stream:data', e.stanza, e.kind);
        });
        this.on('end', () => {
            this.isEnded = true;
            clearTimeout(this.idleTimeout);
            if (this.client.transport === this) {
                this.client.emit('--transport-disconnected');
            }
        });
    }
    _write(chunk, encoding, done) {
        this.queue.push([chunk, done]);
        this.scheduleRequests();
    }
    _writev(chunks, done) {
        this.queue.push([chunks.map(c => c.chunk).join(''), done]);
        this.scheduleRequests();
    }
    _read() {
        return;
    }
    process(result) {
        const parser = new jxt_1.StreamParser({
            acceptLanguages: this.config.acceptLanguages,
            allowComments: false,
            lang: this.config.lang,
            registry: this.stanzas,
            rootKey: 'bosh',
            wrappedStream: true
        });
        parser.on('error', (err) => {
            const streamError = {
                condition: Constants_1.StreamErrorCondition.InvalidXML
            };
            this.client.emit('stream:error', streamError, err);
            this.send('error', streamError);
            return this.disconnect();
        });
        parser.on('data', (e) => {
            if (e.event === 'stream-start') {
                this.stream = e.stanza;
                if (e.stanza.type === 'terminate') {
                    this.hasStream = false;
                    this.rid = undefined;
                    this.sid = undefined;
                    if (!this.isEnded) {
                        this.isEnded = true;
                        this.client.emit('bosh:terminate', e.stanza);
                        this.client.emit('stream:end');
                        this.push(null);
                    }
                }
                else if (!this.hasStream) {
                    this.hasStream = true;
                    this.stream = e.stanza;
                    this.sid = e.stanza.sid || this.sid;
                    this.maxWaitTime = e.stanza.maxWaitTime || this.maxWaitTime;
                    this.client.emit('stream:start', e.stanza);
                }
                return;
            }
            if (!e.event) {
                this.push({ kind: e.kind, stanza: e.stanza });
            }
        });
        this.client.emit('raw', 'incoming', result);
        parser.write(result);
        this.scheduleRequests();
    }
    connect(opts) {
        this.config = opts;
        this.url = opts.url;
        if (opts.rid) {
            this.rid = opts.rid;
        }
        if (opts.sid) {
            this.sid = opts.sid;
        }
        if (opts.wait) {
            this.maxWaitTime = opts.wait;
        }
        if (opts.maxHoldOpen) {
            this.maxHoldOpen = opts.maxHoldOpen;
        }
        if (this.sid) {
            this.hasStream = true;
            this.stream = {};
            this.client.emit('connected');
            this.client.emit('session:prebind', this.config.jid);
            this.client.emit('session:started');
            return;
        }
        this._send({
            lang: opts.lang,
            maxHoldOpen: this.maxHoldOpen,
            maxWaitTime: this.maxWaitTime,
            to: opts.server,
            version: '1.6',
            xmppVersion: '1.0'
        });
    }
    restart() {
        this.hasStream = false;
        this._send({
            to: this.config.server,
            xmppRestart: true
        });
    }
    disconnect(clean = true) {
        if (this.hasStream && clean) {
            this._send({
                type: 'terminate'
            });
        }
        else {
            this.stream = undefined;
            this.sid = undefined;
            this.rid = undefined;
            this.client.emit('--transport-disconnected');
        }
    }
    async send(dataOrName, data) {
        var _a;
        let output;
        if (data) {
            output = (_a = this.stanzas.export(dataOrName, data)) === null || _a === void 0 ? void 0 : _a.toString();
        }
        if (!output) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.write(output, 'utf8', err => (err ? reject(err) : resolve()));
        });
    }
    get sendingChannel() {
        return this.channels[this.activeChannelID];
    }
    get pollingChannel() {
        return this.channels[this.activeChannelID === 0 ? 1 : 0];
    }
    toggleChannel() {
        this.activeChannelID = this.activeChannelID === 0 ? 1 : 0;
    }
    async _send(boshData, payload = '') {
        if (this.isEnded) {
            return;
        }
        const rid = this.rid++;
        const header = this.stanzas.export('bosh', {
            ...boshData,
            rid,
            sid: this.sid
        });
        let body;
        if (payload) {
            body = [header.openTag(), payload, header.closeTag()].join('');
        }
        else {
            body = header.toString();
        }
        this.client.emit('raw', 'outgoing', body);
        this.sendingChannel
            .send(rid, body)
            .then(result => {
            this.process(result);
        })
            .catch(err => {
            this.end(err);
        });
        this.toggleChannel();
    }
    async _poll() {
        if (this.isEnded) {
            return;
        }
        const rid = this.rid++;
        const body = this.stanzas
            .export('bosh', {
            rid,
            sid: this.sid
        })
            .toString();
        this.client.emit('raw', 'outgoing', body);
        this.pollingChannel
            .send(rid, body)
            .then(result => {
            this.process(result);
        })
            .catch(err => {
            this.end(err);
        });
    }
    scheduleRequests() {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = setTimeout(() => {
            this.fireRequests();
        }, 10);
    }
    fireRequests() {
        if (this.isEnded) {
            return;
        }
        if (this.queue.length) {
            if (!this.sendingChannel.active) {
                const [data, done] = this.queue.shift();
                this._send({}, data);
                done();
            }
            else {
                this.scheduleRequests();
            }
            return;
        }
        if (this.authenticated && !(this.channels[0].active || this.channels[1].active)) {
            this._poll();
        }
    }
}
exports.default = BOSH;
