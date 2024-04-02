"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const Constants_1 = require("../Constants");
const Utils_1 = require("../Utils");
const badRequest = { condition: Constants_1.StanzaErrorCondition.BadRequest };
const unsupportedInfo = {
    condition: Constants_1.StanzaErrorCondition.FeatureNotImplemented,
    jingleError: Constants_1.JingleErrorCondition.UnsupportedInfo,
    type: 'modify'
};
class JingleSession {
    constructor(opts) {
        this.parent = opts.parent;
        this.sid = opts.sid || Utils_1.uuid();
        this.peerID = opts.peerID;
        this.role = opts.initiator ? Constants_1.JingleSessionRole.Initiator : Constants_1.JingleSessionRole.Responder;
        this._sessionState = 'starting';
        this._connectionState = 'starting';
        // We track the intial pending description types in case
        // of the need for a tie-breaker.
        this.pendingApplicationTypes = opts.applicationTypes || [];
        this.pendingAction = undefined;
        // Here is where we'll ensure that all actions are processed
        // in order, even if a particular action requires async handling.
        this.processingQueue = async_1.priorityQueue(async (task, next) => {
            if (this.state === 'ended') {
                // Don't process anything once the session has been ended
                if (task.type === 'local' && task.reject) {
                    task.reject(new Error('Session ended'));
                }
                if (next) {
                    next();
                }
                return;
            }
            if (task.type === 'local') {
                this._log('debug', 'Processing local action:', task.name);
                try {
                    const res = await task.handler();
                    task.resolve(res);
                }
                catch (err) {
                    task.reject(err);
                }
                if (next) {
                    next();
                }
                return;
            }
            const { action, changes, cb } = task;
            this._log('debug', 'Processing remote action:', action);
            return new Promise(resolve => {
                const done = (err, result) => {
                    cb(err, result);
                    if (next) {
                        next();
                    }
                    resolve();
                };
                switch (action) {
                    case Constants_1.JingleAction.ContentAccept:
                        return this.onContentAccept(changes, done);
                    case Constants_1.JingleAction.ContentAdd:
                        return this.onContentAdd(changes, done);
                    case Constants_1.JingleAction.ContentModify:
                        return this.onContentModify(changes, done);
                    case Constants_1.JingleAction.ContentReject:
                        return this.onContentReject(changes, done);
                    case Constants_1.JingleAction.ContentRemove:
                        return this.onContentRemove(changes, done);
                    case Constants_1.JingleAction.DescriptionInfo:
                        return this.onDescriptionInfo(changes, done);
                    case Constants_1.JingleAction.SecurityInfo:
                        return this.onSecurityInfo(changes, done);
                    case Constants_1.JingleAction.SessionAccept:
                        return this.onSessionAccept(changes, done);
                    case Constants_1.JingleAction.SessionInfo:
                        return this.onSessionInfo(changes, done);
                    case Constants_1.JingleAction.SessionInitiate:
                        return this.onSessionInitiate(changes, done);
                    case Constants_1.JingleAction.SessionTerminate:
                        return this.onSessionTerminate(changes, done);
                    case Constants_1.JingleAction.TransportAccept:
                        return this.onTransportAccept(changes, done);
                    case Constants_1.JingleAction.TransportInfo:
                        return this.onTransportInfo(changes, done);
                    case Constants_1.JingleAction.TransportReject:
                        return this.onTransportReject(changes, done);
                    case Constants_1.JingleAction.TransportReplace:
                        return this.onTransportReplace(changes, done);
                    default:
                        this._log('error', 'Invalid or unsupported action: ' + action);
                        done({ condition: Constants_1.StanzaErrorCondition.BadRequest });
                }
            });
        }, 1);
    }
    get isInitiator() {
        return this.role === Constants_1.JingleSessionRole.Initiator;
    }
    get peerRole() {
        return this.isInitiator ? Constants_1.JingleSessionRole.Responder : Constants_1.JingleSessionRole.Initiator;
    }
    get state() {
        return this._sessionState;
    }
    set state(value) {
        if (value !== this._sessionState) {
            this._log('info', 'Changing session state to: ' + value);
            this._sessionState = value;
            if (this.parent) {
                this.parent.emit('sessionState', this, value);
            }
        }
    }
    get connectionState() {
        return this._connectionState;
    }
    set connectionState(value) {
        if (value !== this._connectionState) {
            this._log('info', 'Changing connection state to: ' + value);
            this._connectionState = value;
            if (this.parent) {
                this.parent.emit('connectionState', this, value);
            }
        }
    }
    send(action, data) {
        data = data || {};
        data.sid = this.sid;
        data.action = action;
        const requirePending = new Set([
            Constants_1.JingleAction.ContentAccept,
            Constants_1.JingleAction.ContentAdd,
            Constants_1.JingleAction.ContentModify,
            Constants_1.JingleAction.ContentReject,
            Constants_1.JingleAction.ContentRemove,
            Constants_1.JingleAction.SessionAccept,
            Constants_1.JingleAction.SessionInitiate,
            Constants_1.JingleAction.TransportAccept,
            Constants_1.JingleAction.TransportReject,
            Constants_1.JingleAction.TransportReplace
        ]);
        if (requirePending.has(action)) {
            this.pendingAction = action;
        }
        else {
            this.pendingAction = undefined;
        }
        this.parent.signal(this, {
            id: Utils_1.uuid(),
            jingle: data,
            to: this.peerID,
            type: 'set'
        });
    }
    processLocal(name, handler) {
        return new Promise((resolve, reject) => {
            this.processingQueue.push({
                handler,
                name,
                reject,
                resolve,
                type: 'local'
            }, 1 // Process local requests first
            );
        });
    }
    process(action, changes, cb) {
        this.processingQueue.push({
            action,
            cb,
            changes,
            type: 'remote'
        }, 2 // Process remote requests second
        );
    }
    start(_opts, _next) {
        this._log('error', 'Can not start base sessions');
        this.end('unsupported-applications', true);
    }
    accept(_opts, _next) {
        this._log('error', 'Can not accept base sessions');
        this.end('unsupported-applications');
    }
    cancel() {
        this.end('cancel');
    }
    decline() {
        this.end('decline');
    }
    end(reason = 'success', silent = false) {
        this.state = 'ended';
        this.processingQueue.kill();
        if (typeof reason === 'string') {
            reason = {
                condition: reason
            };
        }
        if (!silent) {
            this.send('session-terminate', {
                reason
            });
        }
        this.parent.emit('terminated', this, reason);
        this.parent.forgetSession(this);
    }
    _log(level, message, ...data) {
        if (this.parent) {
            message = this.sid + ': ' + message;
            this.parent.emit('log', level, message, ...data);
            this.parent.emit('log:' + level, message, ...data);
        }
    }
    onSessionInitiate(changes, cb) {
        cb();
    }
    onSessionAccept(changes, cb) {
        cb();
    }
    onSessionTerminate(changes, cb) {
        this.end(changes.reason, true);
        cb();
    }
    // It is mandatory to reply to a session-info action with
    // an unsupported-info error if the info isn't recognized.
    //
    // However, a session-info action with no associated payload
    // is acceptable (works like a ping).
    onSessionInfo(changes, cb) {
        if (!changes.info) {
            cb();
        }
        else {
            cb(unsupportedInfo);
        }
    }
    // It is mandatory to reply to a security-info action with
    // an unsupported-info error if the info isn't recognized.
    onSecurityInfo(changes, cb) {
        cb(unsupportedInfo);
    }
    // It is mandatory to reply to a description-info action with
    // an unsupported-info error if the info isn't recognized.
    onDescriptionInfo(changes, cb) {
        cb(unsupportedInfo);
    }
    // It is mandatory to reply to a transport-info action with
    // an unsupported-info error if the info isn't recognized.
    onTransportInfo(changes, cb) {
        cb(unsupportedInfo);
    }
    // It is mandatory to reply to a content-add action with either
    // a content-accept or content-reject.
    onContentAdd(changes, cb) {
        // Allow ack for the content-add to be sent.
        cb();
        this.send(Constants_1.JingleAction.ContentReject, {
            reason: {
                condition: Constants_1.JingleReasonCondition.FailedApplication,
                text: 'content-add is not supported'
            }
        });
    }
    onContentAccept(changes, cb) {
        cb(badRequest);
    }
    onContentReject(changes, cb) {
        cb(badRequest);
    }
    onContentModify(changes, cb) {
        cb(badRequest);
    }
    onContentRemove(changes, cb) {
        cb(badRequest);
    }
    // It is mandatory to reply to a transport-add action with either
    // a transport-accept or transport-reject.
    onTransportReplace(changes, cb) {
        // Allow ack for the transport-replace be sent.
        cb();
        this.send(Constants_1.JingleAction.TransportReject, {
            reason: {
                condition: Constants_1.JingleReasonCondition.FailedTransport,
                text: 'transport-replace is not supported'
            }
        });
    }
    onTransportAccept(changes, cb) {
        cb(badRequest);
    }
    onTransportReject(changes, cb) {
        cb(badRequest);
    }
}
exports.default = JingleSession;
