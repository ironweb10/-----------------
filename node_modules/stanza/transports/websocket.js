"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readable_stream_1 = require("readable-stream");
const stanza_shims_1 = require("stanza-shims");
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const WS_OPEN = 1;
class WSConnection extends readable_stream_1.Duplex {
    constructor(client, sm, stanzas) {
        super({ objectMode: true });
        this.sm = sm;
        this.stanzas = stanzas;
        this.closing = false;
        this.client = client;
        this.on('data', e => {
            this.client.emit('stream:data', e.stanza, e.kind);
        });
        this.on('error', () => {
            this.end();
        });
        this.on('end', () => {
            if (this.client.transport === this) {
                this.client.emit('--transport-disconnected');
            }
        });
    }
    _read() {
        return;
    }
    _write(chunk, encoding, done) {
        if (!this.socket || this.socket.readyState !== WS_OPEN) {
            return done(new Error('Socket closed'));
        }
        const data = Buffer.from(chunk, 'utf8').toString();
        this.client.emit('raw', 'outgoing', data);
        this.socket.send(data);
        done();
    }
    connect(opts) {
        this.config = opts;
        this.hasStream = false;
        this.closing = false;
        this.parser = new jxt_1.StreamParser({
            acceptLanguages: this.config.acceptLanguages,
            allowComments: false,
            lang: this.config.lang,
            registry: this.stanzas,
            wrappedStream: false
        });
        this.parser.on('data', (e) => {
            const name = e.kind;
            const stanzaObj = e.stanza;
            if (name === 'stream') {
                if (stanzaObj.action === 'open') {
                    this.hasStream = true;
                    this.stream = stanzaObj;
                    return this.client.emit('stream:start', stanzaObj);
                }
                if (stanzaObj.action === 'close') {
                    this.client.emit('stream:end');
                    return this.disconnect();
                }
            }
            this.push({ kind: e.kind, stanza: e.stanza });
        });
        this.parser.on('error', (err) => {
            const streamError = {
                condition: Constants_1.StreamErrorCondition.InvalidXML
            };
            this.client.emit('stream:error', streamError, err);
            this.write(this.stanzas.export('error', streamError).toString());
            return this.disconnect();
        });
        this.socket = new stanza_shims_1.WebSocket(opts.url, 'xmpp');
        this.socket.onopen = () => {
            this.emit('connect');
            this.sm.started = false;
            this.client.emit('connected');
            this.write(this.startHeader());
        };
        this.socket.onmessage = wsMsg => {
            const data = Buffer.from(wsMsg.data, 'utf8').toString();
            this.client.emit('raw', 'incoming', data);
            if (this.parser) {
                this.parser.write(data);
            }
        };
        this.socket.onclose = () => {
            this.push(null);
        };
    }
    disconnect(clean = true) {
        if (this.socket && !this.closing && this.hasStream && clean) {
            this.closing = true;
            this.write(this.closeHeader());
        }
        else {
            this.hasStream = false;
            this.stream = undefined;
            if (this.socket) {
                this.end();
                this.socket.close();
                if (this.client.transport === this) {
                    this.client.emit('--transport-disconnected');
                }
            }
            this.socket = undefined;
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
    restart() {
        this.hasStream = false;
        this.write(this.startHeader());
    }
    startHeader() {
        const header = this.stanzas.export('stream', {
            action: 'open',
            lang: this.config.lang,
            to: this.config.server,
            version: '1.0'
        });
        return header.toString();
    }
    closeHeader() {
        const header = this.stanzas.export('stream', {
            action: 'close'
        });
        return header.toString();
    }
}
exports.default = WSConnection;
