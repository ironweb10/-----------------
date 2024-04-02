"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receiver = exports.Sender = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const Hashes = tslib_1.__importStar(require("stanza-shims"));
const Constants_1 = require("../Constants");
const Namespaces_1 = require("../Namespaces");
const ICESession_1 = tslib_1.__importDefault(require("./ICESession"));
const Intermediate_1 = require("./sdp/Intermediate");
const Protocol_1 = require("./sdp/Protocol");
class Sender extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        this.config = {
            chunkSize: 16384,
            hash: 'sha-1',
            ...opts
        };
        this.file = undefined;
        this.channel = undefined;
        this.hash = Hashes.createHash(this.config.hash);
    }
    send(file, channel) {
        if (this.file && this.channel) {
            return;
        }
        this.file = file;
        this.channel = channel;
        this.channel.binaryType = 'arraybuffer';
        const fileReader = new FileReader();
        let offset = 0;
        let pendingRead = false;
        const sliceFile = () => {
            if (pendingRead || offset >= file.size) {
                return;
            }
            pendingRead = true;
            const slice = file.slice(offset, offset + this.config.chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };
        channel.bufferedAmountLowThreshold = 8 * this.config.chunkSize;
        channel.onbufferedamountlow = () => {
            sliceFile();
        };
        fileReader.addEventListener('load', (event) => {
            const data = event.target.result;
            pendingRead = false;
            offset += data.byteLength;
            this.channel.send(data);
            this.hash.update(new Uint8Array(data));
            this.emit('progress', offset, file.size, data);
            if (offset < file.size) {
                if (this.channel.bufferedAmount <= this.channel.bufferedAmountLowThreshold) {
                    sliceFile();
                }
                // Otherwise wait for bufferedamountlow event to trigger reading more data
            }
            else {
                this.emit('progress', file.size, file.size, null);
                this.emit('sentFile', {
                    algorithm: this.config.hash,
                    name: file.name,
                    size: file.size,
                    value: this.hash.digest()
                });
            }
        });
        sliceFile();
    }
}
exports.Sender = Sender;
class Receiver extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        this.config = {
            hash: 'sha-1',
            ...opts
        };
        this.receiveBuffer = [];
        this.received = 0;
        this.channel = undefined;
        this.hash = Hashes.createHash(this.config.hash);
    }
    receive(metadata, channel) {
        this.metadata = metadata;
        this.channel = channel;
        this.channel.binaryType = 'arraybuffer';
        this.channel.onmessage = e => {
            const len = e.data.byteLength;
            this.received += len;
            this.receiveBuffer.push(e.data);
            if (e.data) {
                this.hash.update(new Uint8Array(e.data));
            }
            this.emit('progress', this.received, this.metadata.size, e.data);
            if (this.received === this.metadata.size) {
                this.metadata.actualhash = this.hash.digest('hex');
                this.emit('receivedFile', new Blob(this.receiveBuffer), this.metadata);
                this.receiveBuffer = [];
            }
            else if (this.received > this.metadata.size) {
                // FIXME
                console.error('received more than expected, discarding...');
                this.receiveBuffer = []; // just discard...
            }
        };
    }
}
exports.Receiver = Receiver;
class FileTransferSession extends ICESession_1.default {
    constructor(opts) {
        super(opts);
        this.sender = undefined;
        this.receiver = undefined;
        this.file = undefined;
    }
    async start(file, next) {
        next = next || (() => undefined);
        if (!file || typeof file === 'function') {
            throw new Error('File object required');
        }
        this.state = 'pending';
        this.role = 'initiator';
        this.file = file;
        this.sender = new Sender();
        this.sender.on('progress', (sent, size) => {
            this._log('info', 'Send progress ' + sent + '/' + size);
        });
        this.sender.on('sentFile', meta => {
            this._log('info', 'Sent file', meta.name);
            this.send(Constants_1.JingleAction.SessionInfo, {
                info: {
                    creator: Constants_1.JingleSessionRole.Initiator,
                    file: {
                        hashes: [
                            {
                                algorithm: meta.algorithm,
                                value: meta.value
                            }
                        ]
                    },
                    infoType: Constants_1.JINGLE_INFO_CHECKSUM_5,
                    name: this.contentName
                }
            });
            this.parent.emit('sentFile', this, meta);
        });
        this.channel = this.pc.createDataChannel('filetransfer', {
            ordered: true
        });
        this.channel.onopen = () => {
            this.sender.send(this.file, this.channel);
        };
        try {
            await this.processLocal(Constants_1.JingleAction.SessionInitiate, async () => {
                const offer = await this.pc.createOffer({
                    offerToReceiveAudio: false,
                    offerToReceiveVideo: false
                });
                const json = Intermediate_1.importFromSDP(offer.sdp);
                const jingle = Protocol_1.convertIntermediateToRequest(json, this.role, this.transportType);
                this.contentName = jingle.contents[0].name;
                jingle.sid = this.sid;
                jingle.action = Constants_1.JingleAction.SessionInitiate;
                jingle.contents[0].application = {
                    applicationType: Namespaces_1.NS_JINGLE_FILE_TRANSFER_5,
                    file: {
                        date: file.lastModified ? new Date(file.lastModified) : undefined,
                        hashesUsed: [
                            {
                                algorithm: 'sha-1'
                            }
                        ],
                        name: file.name,
                        size: file.size
                    }
                };
                this.send('session-initiate', jingle);
                await this.pc.setLocalDescription(offer);
            });
            next();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC offer', err);
            return this.end('failed-application', true);
        }
    }
    async accept(next) {
        this._log('info', 'Accepted incoming session');
        this.role = 'responder';
        this.state = 'active';
        next = next || (() => undefined);
        try {
            await this.processLocal(Constants_1.JingleAction.SessionAccept, async () => {
                const answer = await this.pc.createAnswer();
                const json = Intermediate_1.importFromSDP(answer.sdp);
                const jingle = Protocol_1.convertIntermediateToRequest(json, this.role, this.transportType);
                jingle.sid = this.sid;
                jingle.action = 'session-accept';
                for (const content of jingle.contents) {
                    content.creator = 'initiator';
                }
                this.contentName = jingle.contents[0].name;
                this.send('session-accept', jingle);
                await this.pc.setLocalDescription(answer);
                await this.processBufferedCandidates();
            });
            next();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC answer', err);
            this.end('failed-application');
        }
    }
    async onSessionInitiate(changes, cb) {
        this._log('info', 'Initiating incoming session');
        this.role = 'responder';
        this.state = 'pending';
        this.transportType = changes.contents[0].transport.transportType;
        const json = Protocol_1.convertRequestToIntermediate(changes, this.peerRole);
        const sdp = Intermediate_1.exportToSDP(json);
        const desc = changes.contents[0].application;
        const hashes = desc.file.hashesUsed ? desc.file.hashesUsed : desc.file.hashes || [];
        this.receiver = new Receiver({ hash: hashes[0] && hashes[0].algorithm });
        this.receiver.on('progress', (received, size) => {
            this._log('info', 'Receive progress ' + received + '/' + size);
        });
        this.receiver.on('receivedFile', file => {
            this.receivedFile = file;
            this._maybeReceivedFile();
        });
        this.receiver.metadata = desc.file;
        this.pc.addEventListener('datachannel', e => {
            this.channel = e.channel;
            this.receiver.receive(this.receiver.metadata, e.channel);
        });
        try {
            await this.pc.setRemoteDescription({ type: 'offer', sdp });
            await this.processBufferedCandidates();
            cb();
        }
        catch (err) {
            this._log('error', 'Could not create WebRTC answer', err);
            cb({ condition: 'general-error' });
        }
    }
    onSessionInfo(changes, cb) {
        const info = changes.info;
        if (!info || !info.file || !info.file.hashes) {
            return;
        }
        this.receiver.metadata.hashes = info.file.hashes;
        if (this.receiver.metadata.actualhash) {
            this._maybeReceivedFile();
        }
        cb();
    }
    _maybeReceivedFile() {
        if (!this.receiver.metadata.hashes || !this.receiver.metadata.hashes.length) {
            // unknown hash, file transfer not completed
            return;
        }
        for (const hash of this.receiver.metadata.hashes || []) {
            if (hash.value && hash.value.toString('hex') === this.receiver.metadata.actualhash) {
                this._log('info', 'File hash matches');
                this.parent.emit('receivedFile', this, this.receivedFile, this.receiver.metadata);
                this.end('success');
                return;
            }
        }
        this._log('error', 'File hash does not match');
        this.end('media-error');
    }
}
exports.default = FileTransferSession;
