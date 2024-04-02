import { AsyncPriorityQueue } from 'async';
import { JingleAction, JingleReasonCondition, JingleSessionRole } from '../Constants';
import { Jingle, JingleReason } from '../protocol';
import SessionManager from './SessionManager';
export declare type ActionCallback = (err?: any, res?: any) => void;
export interface LocalProcessingTask {
    type: 'local';
    name: string;
    handler: () => Promise<any>;
    reject: (err?: any) => void;
    resolve: (res?: any) => void;
}
export interface RemoteProcessingTask {
    type: 'remote';
    action: JingleAction;
    changes: Jingle;
    cb: ActionCallback;
}
export interface SessionOpts {
    sid?: string;
    peerID: string;
    initiator?: boolean;
    parent: SessionManager;
    applicationTypes?: string[];
}
export default class JingleSession {
    parent: SessionManager;
    sid: string;
    peerID: string;
    role: JingleSessionRole;
    pendingApplicationTypes?: string[];
    pendingAction?: JingleAction;
    processingQueue: AsyncPriorityQueue<any>;
    private _sessionState;
    private _connectionState;
    constructor(opts: SessionOpts);
    get isInitiator(): boolean;
    get peerRole(): JingleSessionRole;
    get state(): string;
    set state(value: string);
    get connectionState(): string;
    set connectionState(value: string);
    send(action: JingleAction, data: Partial<Jingle>): void;
    processLocal(name: string, handler: () => Promise<void>): Promise<void>;
    process(action: JingleAction, changes: Jingle, cb: ActionCallback): void;
    start(_next?: ActionCallback): void;
    accept(_next?: ActionCallback): void;
    cancel(): void;
    decline(): void;
    end(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    protected _log(level: string, message: string, ...data: any[]): void;
    protected onSessionInitiate(changes: Jingle, cb: ActionCallback): void;
    protected onSessionAccept(changes: Jingle, cb: ActionCallback): void;
    protected onSessionTerminate(changes: Jingle, cb: ActionCallback): void;
    protected onSessionInfo(changes: Jingle, cb: ActionCallback): void;
    protected onSecurityInfo(changes: Jingle, cb: ActionCallback): void;
    protected onDescriptionInfo(changes: Jingle, cb: ActionCallback): void;
    protected onTransportInfo(changes: Jingle, cb: ActionCallback): void;
    protected onContentAdd(changes: Jingle, cb: ActionCallback): void;
    protected onContentAccept(changes: Jingle, cb: ActionCallback): void;
    protected onContentReject(changes: Jingle, cb: ActionCallback): void;
    protected onContentModify(changes: Jingle, cb: ActionCallback): void;
    protected onContentRemove(changes: Jingle, cb: ActionCallback): void;
    protected onTransportReplace(changes: Jingle, cb: ActionCallback): void;
    protected onTransportAccept(changes: Jingle, cb: ActionCallback): void;
    protected onTransportReject(changes: Jingle, cb: ActionCallback): void;
}
