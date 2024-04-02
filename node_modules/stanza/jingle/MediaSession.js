"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Constants_1 = require("../Constants");
const ICESession_1 = tslib_1.__importDefault(require("./ICESession"));
const Intermediate_1 = require("./sdp/Intermediate");
const Protocol_1 = require("./sdp/Protocol");
function applyStreamsCompatibility(content) {
    const application = content.application;
    /* signal .streams as a=ssrc: msid */
    if (application.streams &&
        application.streams.length &&
        application.sources &&
        application.sources.length) {
        const msid = application.streams[0];
        application.sources[0].parameters.msid = `${msid.id} ${msid.track}`;
        if (application.sourceGroups && application.sourceGroups.length > 0) {
            application.sources.push({
                parameters: {
                    cname: application.sources[0].parameters.cname,
                    msid: `${msid.id} ${msid.track}`
                },
                ssrc: application.sourceGroups[0].sources[1]
            });
        }
    }
}
class MediaSession extends ICESession_1.default {
    constructor(opts) {
        super(opts);
        this.includesAudio = false;
        this.includesVideo = false;
        this._ringing = false;
        this.pc.addEventListener('track', (e) => {
            this.onAddTrack(e.track, e.streams[0]);
        });
        if (opts.stream) {
            for (const track of opts.stream.getTracks()) {
                this.addTrack(track, opts.stream);
            }
        }
    }
    get ringing() {
        return this._ringing;
    }
    set ringing(value) {
        if (value !== this._ringing) {
            this._ringing = value;
        }
    }
    get streams() {
        if (this.pc.signalingState !== 'closed') {
            return this.pc.getRemoteStreams();
        }
        return [];
    }
    // ----------------------------------------------------------------
    // Session control methods
    // ----------------------------------------------------------------
    async start(opts, next) {
        this.state = 'pending';
        if (arguments.length === 1 && typeof opts === 'function') {
            next = opts;
            opts = {};
        }
        next = next || (() => undefined);
        opts = opts || {};
        this.role = 'initiator';
        this.offerOptions = opts;
        try {
            await this.processLocal(Constants_1.JingleAction.SessionInitiate, async () => {
                const offer = await this.pc.createOffer(opts);
                const json = Intermediate_1.importFromSDP(offer.sdp);
                const jingle = Protocol_1.convertIntermediateToRequest(json, this.role, this.transportType);
                jingle.sid = this.sid;
                jingle.action = Constants_1.JingleAction.SessionInitiate;
                for (const content of jingle.contents || []) {
                    content.creator = 'initiator';
                    applyStreamsCompatibility(content);
                }
                await this.pc.setLocalDescription(offer);
                this.send('session-initiate', jingle);
            });
            next();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC offer', err);
            this.end('failed-application', true);
        }
    }
    async accept(opts, next) {
        // support calling with accept(next) or accept(opts, next)
        if (arguments.length === 1 && typeof opts === 'function') {
            next = opts;
            opts = {};
        }
        next = next || (() => undefined);
        opts = opts || {};
        this._log('info', 'Accepted incoming session');
        this.state = 'active';
        this.role = 'responder';
        try {
            await this.processLocal(Constants_1.JingleAction.SessionAccept, async () => {
                const answer = await this.pc.createAnswer(opts);
                const json = Intermediate_1.importFromSDP(answer.sdp);
                const jingle = Protocol_1.convertIntermediateToRequest(json, this.role, this.transportType);
                jingle.sid = this.sid;
                jingle.action = Constants_1.JingleAction.SessionAccept;
                for (const content of jingle.contents || []) {
                    content.creator = 'initiator';
                }
                await this.pc.setLocalDescription(answer);
                await this.processBufferedCandidates();
                this.send('session-accept', jingle);
            });
            next();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC answer', err);
            this.end('failed-application');
        }
    }
    end(reason = 'success', silent = false) {
        for (const receiver of this.pc.getReceivers()) {
            this.onRemoveTrack(receiver.track);
        }
        super.end(reason, silent);
    }
    ring() {
        return this.processLocal('ring', async () => {
            this._log('info', 'Ringing on incoming session');
            this.ringing = true;
            this.send(Constants_1.JingleAction.SessionInfo, {
                info: {
                    infoType: Constants_1.JINGLE_INFO_RINGING
                }
            });
        });
    }
    mute(creator, name) {
        return this.processLocal('mute', async () => {
            this._log('info', 'Muting', name);
            this.send(Constants_1.JingleAction.SessionInfo, {
                info: {
                    creator,
                    infoType: Constants_1.JINGLE_INFO_MUTE,
                    name
                }
            });
        });
    }
    unmute(creator, name) {
        return this.processLocal('unmute', async () => {
            this._log('info', 'Unmuting', name);
            this.send(Constants_1.JingleAction.SessionInfo, {
                info: {
                    creator,
                    infoType: Constants_1.JINGLE_INFO_UNMUTE,
                    name
                }
            });
        });
    }
    hold() {
        return this.processLocal('hold', async () => {
            this._log('info', 'Placing on hold');
            this.send('session-info', {
                info: {
                    infoType: Constants_1.JINGLE_INFO_HOLD
                }
            });
        });
    }
    resume() {
        return this.processLocal('resume', async () => {
            this._log('info', 'Resuming from hold');
            this.send('session-info', {
                info: {
                    infoType: Constants_1.JINGLE_INFO_ACTIVE
                }
            });
        });
    }
    // ----------------------------------------------------------------
    // Track control methods
    // ----------------------------------------------------------------
    addTrack(track, stream, cb) {
        if (track.kind === 'audio') {
            this.includesAudio = true;
        }
        if (track.kind === 'video') {
            this.includesVideo = true;
        }
        return this.processLocal('addtrack', async () => {
            if (this.pc.addTrack) {
                this.pc.addTrack(track, stream);
            }
            else {
                this.pc.addStream(stream);
            }
            if (cb) {
                cb();
            }
        });
    }
    async removeTrack(sender, cb) {
        return this.processLocal('removetrack', async () => {
            this.pc.removeTrack(sender);
            if (cb) {
                return cb();
            }
        });
    }
    // ----------------------------------------------------------------
    // Track event handlers
    // ----------------------------------------------------------------
    onAddTrack(track, stream) {
        this._log('info', 'Track added');
        this.parent.emit('peerTrackAdded', this, track, stream);
    }
    onRemoveTrack(track) {
        this._log('info', 'Track removed');
        this.parent.emit('peerTrackRemoved', this, track);
    }
    // ----------------------------------------------------------------
    // Jingle action handers
    // ----------------------------------------------------------------
    async onSessionInitiate(changes, cb) {
        this._log('info', 'Initiating incoming session');
        this.state = 'pending';
        this.role = 'responder';
        this.transportType = changes.contents[0].transport.transportType;
        const json = Protocol_1.convertRequestToIntermediate(changes, this.peerRole);
        for (const media of json.media) {
            if (media.kind === 'audio') {
                this.includesAudio = true;
            }
            if (media.kind === 'video') {
                this.includesVideo = true;
            }
            if (!media.streams) {
                media.streams = [{ stream: 'legacy', track: media.kind }];
            }
        }
        const sdp = Intermediate_1.exportToSDP(json);
        try {
            await this.pc.setRemoteDescription({ type: 'offer', sdp });
            await this.processBufferedCandidates();
            return cb();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC answer', err);
            return cb({ condition: 'general-error' });
        }
    }
    onSessionTerminate(changes, cb) {
        for (const receiver of this.pc.getReceivers()) {
            this.onRemoveTrack(receiver.track);
        }
        super.onSessionTerminate(changes, cb);
    }
    onSessionInfo(changes, cb) {
        const info = changes.info || { infoType: '' };
        switch (info.infoType) {
            case Constants_1.JINGLE_INFO_RINGING:
                this._log('info', 'Outgoing session is ringing');
                this.ringing = true;
                this.parent.emit('ringing', this);
                return cb();
            case Constants_1.JINGLE_INFO_HOLD:
                this._log('info', 'On hold');
                this.parent.emit('hold', this);
                return cb();
            case Constants_1.JINGLE_INFO_UNHOLD:
            case Constants_1.JINGLE_INFO_ACTIVE:
                this._log('info', 'Resuming from hold');
                this.parent.emit('resumed', this);
                return cb();
            case Constants_1.JINGLE_INFO_MUTE:
                this._log('info', 'Muting', info);
                this.parent.emit('mute', this, info);
                return cb();
            case Constants_1.JINGLE_INFO_UNMUTE:
                this._log('info', 'Unmuting', info);
                this.parent.emit('unmute', this, info);
                return cb();
            default:
        }
        return cb();
    }
}
exports.default = MediaSession;
