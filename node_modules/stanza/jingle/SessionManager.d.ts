/// <reference types="node" />
import { EventEmitter } from 'events';
import { JingleReasonCondition } from '../Constants';
import { IQ, Jingle, JingleReason, ExternalService } from '../protocol';
import FileTransferSession from './FileTransferSession';
import MediaSession from './MediaSession';
import BaseSession from './Session';
export interface SessionManagerConfig {
    debug?: boolean;
    selfID?: string;
    bundlePolicy?: RTCConfiguration['bundlePolicy'];
    iceTransportPolicy?: RTCConfiguration['iceTransportPolicy'];
    rtcpMuxPolicy?: RTCConfiguration['rtcpMuxPolicy'];
    iceServers?: RTCIceServer[];
    sdpSemantics?: 'unified-plan' | 'plan-b';
    peerConnectionConfig?: RTCConfiguration;
    hasRTCPeerConnection?: boolean;
    peerConnectionConstraints?: unknown;
    performTieBreak?: (session: BaseSession, req: IQ & {
        jingle: Jingle;
    }) => boolean;
    prepareSession?: (opts: any, req?: IQ & {
        jingle: Jingle;
    }) => BaseSession | undefined;
    createPeerConnection?: (session: BaseSession, opts?: RTCConfiguration) => RTCPeerConnection | undefined;
}
export default class SessionManager extends EventEmitter {
    selfID?: string;
    sessions: {
        [key: string]: BaseSession;
    };
    peers: {
        [key: string]: BaseSession[];
    };
    iceServers: RTCIceServer[];
    config: SessionManagerConfig;
    performTieBreak: (session: BaseSession, req: IQ & {
        jingle: Jingle;
    }) => boolean;
    prepareSession: (opts: any, req?: IQ & {
        jingle: Jingle;
    }) => BaseSession | undefined;
    createPeerConnection: (session: BaseSession, opts?: RTCConfiguration) => RTCPeerConnection | undefined;
    constructor(conf?: SessionManagerConfig);
    addICEServer(server: RTCIceServer | ExternalService | string): void;
    resetICEServers(): void;
    addSession<T extends BaseSession = BaseSession>(session: T): T;
    forgetSession(session: BaseSession): void;
    createMediaSession(peer: string, sid?: string, stream?: MediaStream): MediaSession;
    createFileTransferSession(peer: string, sid?: string): FileTransferSession;
    endPeerSessions(peer: string, reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    endAllSessions(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    process(req: IQ & {
        jingle: Jingle;
    }): void;
    signal(session: BaseSession, data: IQ & {
        jingle: Jingle;
    }): void;
    private _createIncomingSession;
    private _sendError;
    private _log;
}
