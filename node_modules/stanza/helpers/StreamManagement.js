"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const MAX_SEQ = Math.pow(2, 32);
const mod = (v, n) => ((v % n) + n) % n;
class StreamManagement extends events_1.EventEmitter {
    constructor() {
        super();
        this.allowResume = true;
        this.lastAck = 0;
        this.handled = 0;
        this.unacked = [];
        this.inboundStarted = false;
        this.outboundStarted = false;
        this.id = undefined;
        this.jid = undefined;
        this.allowResume = true;
        this.started = false;
        this.cacheHandler = () => undefined;
        this._reset();
    }
    get started() {
        return this.outboundStarted && this.inboundStarted;
    }
    set started(value) {
        if (!value) {
            this.outboundStarted = false;
            this.inboundStarted = false;
        }
    }
    get resumable() {
        return this.started && this.allowResume;
    }
    load(opts) {
        var _a;
        this.id = opts.id;
        this.allowResume = (_a = opts.allowResume) !== null && _a !== void 0 ? _a : true;
        this.handled = opts.handled;
        this.lastAck = opts.lastAck;
        this.unacked = opts.unacked;
        this.emit('prebound', opts.jid);
    }
    cache(handler) {
        this.cacheHandler = handler;
    }
    async bind(jid) {
        this.jid = jid;
        await this._cache();
    }
    async enable() {
        this.emit('send', {
            allowResumption: this.allowResume,
            type: 'enable'
        });
    }
    async resume() {
        this.emit('send', {
            handled: this.handled,
            previousSession: this.id,
            type: 'resume'
        });
    }
    async enabled(resp) {
        this.id = resp.id;
        this.handled = 0;
        this.inboundStarted = true;
        await this._cache();
    }
    async resumed(resp) {
        this.id = resp.previousSession;
        this.inboundStarted = true;
        await this.process(resp, true);
        await this._cache();
    }
    async failed(resp) {
        // Resumption might fail, but the server can still tell us how far
        // the old session progressed.
        await this.process(resp);
        // We alert that any remaining unacked stanzas failed to send. It has
        // been too long for auto-retrying these to be the right thing to do.
        for (const [kind, stanza] of this.unacked) {
            this.emit('failed', { kind, stanza });
        }
        this._reset();
        await this._cache();
    }
    ack() {
        this.emit('send', {
            handled: this.handled,
            type: 'ack'
        });
    }
    request() {
        this.emit('send', {
            type: 'request'
        });
    }
    async process(ack, resend = false) {
        if (ack.handled === undefined) {
            return;
        }
        const numAcked = mod(ack.handled - this.lastAck, MAX_SEQ);
        for (let i = 0; i < numAcked && this.unacked.length > 0; i++) {
            const [kind, stanza] = this.unacked.shift();
            this.emit('acked', { kind, stanza });
        }
        this.lastAck = ack.handled;
        if (resend) {
            const resendUnacked = this.unacked;
            this.unacked = [];
            if (resendUnacked.length) {
                this.emit('begin-resend');
                for (const [kind, stanza] of resendUnacked) {
                    this.emit('resend', { kind, stanza });
                }
                this.emit('end-resend');
            }
        }
        await this._cache();
    }
    async track(kind, stanza) {
        if (kind === 'sm' && (stanza.type === 'enable' || stanza.type === 'resume')) {
            this.handled = 0;
            this.outboundStarted = true;
            await this._cache();
            return false;
        }
        if (!this.outboundStarted) {
            return false;
        }
        if (kind !== 'message' && kind !== 'presence' && kind !== 'iq') {
            return false;
        }
        this.unacked.push([kind, stanza]);
        await this._cache();
        return true;
    }
    async handle() {
        if (this.inboundStarted) {
            this.handled = mod(this.handled + 1, MAX_SEQ);
            await this._cache();
        }
    }
    async hibernate() {
        if (!this.resumable) {
            return this.shutdown();
        }
        for (const [kind, stanza] of this.unacked) {
            this.emit('hibernated', { kind, stanza });
        }
    }
    async shutdown() {
        return this.failed({ type: 'failed' });
    }
    async _cache() {
        try {
            await this.cacheHandler({
                allowResume: this.allowResume,
                handled: this.handled,
                id: this.id,
                jid: this.jid,
                lastAck: this.lastAck,
                unacked: this.unacked
            });
        }
        catch (err) {
            // TODO: Is there a good way to handle this?
            // istanbul ignore next
            console.error('Failed to cache stream state', err);
        }
    }
    _reset() {
        this.id = '';
        this.inboundStarted = false;
        this.outboundStarted = false;
        this.lastAck = 0;
        this.handled = 0;
        this.unacked = [];
    }
}
exports.default = StreamManagement;
