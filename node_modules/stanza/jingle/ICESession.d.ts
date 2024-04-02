import { JingleReasonCondition } from '../Constants';
import { Jingle, JingleIce, JingleReason } from '../protocol';
import BaseSession, { ActionCallback, SessionOpts } from './Session';
import { SessionManagerConfig } from './SessionManager';
export interface ICESessionOpts extends SessionOpts {
    maxRelayBandwidth?: number;
    iceServers?: RTCIceServer[];
    config?: SessionManagerConfig['peerConnectionConfig'];
    constraints?: SessionManagerConfig['peerConnectionConstraints'];
}
export default class ICESession extends BaseSession {
    pc: RTCPeerConnection;
    bitrateLimit: number;
    maximumBitrate?: number;
    currentBitrate?: number;
    maxRelayBandwidth?: number;
    candidateBuffer: Array<{
        sdpMid: string;
        candidate: string;
    } | null>;
    transportType: JingleIce['transportType'];
    restartingIce: boolean;
    usingRelay: boolean;
    private _maybeRestartingIce;
    constructor(opts: ICESessionOpts);
    end(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    restartIce(): Promise<void>;
    setMaximumBitrate(maximumBitrate: number): Promise<void>;
    protected onTransportInfo(changes: Jingle, cb: ActionCallback): Promise<void>;
    protected onSessionAccept(changes: Jingle, cb: ActionCallback): Promise<void>;
    protected onSessionTerminate(changes: Jingle, cb: ActionCallback): void;
    protected onIceCandidate(e: RTCPeerConnectionIceEvent): void;
    protected onIceEndOfCandidates(): void;
    protected onIceStateChange(): void;
    protected processBufferedCandidates(): Promise<void>;
    private restrictRelayBandwidth;
    private maybeRestartIce;
}
