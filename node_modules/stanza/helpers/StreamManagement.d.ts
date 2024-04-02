/// <reference types="node" />
import { EventEmitter } from 'events';
import { IQ, Message, Presence, StreamManagementAck, StreamManagementEnable, StreamManagementEnabled, StreamManagementFailed, StreamManagementResume } from '../protocol';
declare type Unacked = ['message', Message] | ['presence', Presence] | ['iq', IQ];
interface SMState {
    allowResume: boolean;
    handled: number;
    id?: string;
    jid?: string;
    lastAck: number;
    unacked: Unacked[];
}
export default class StreamManagement extends EventEmitter {
    id?: string;
    jid?: string;
    allowResume: boolean;
    lastAck: number;
    handled: number;
    unacked: Unacked[];
    private inboundStarted;
    private outboundStarted;
    private cacheHandler;
    constructor();
    get started(): boolean;
    set started(value: boolean);
    get resumable(): boolean;
    load(opts: SMState): void;
    cache(handler: (data: SMState) => void): void;
    bind(jid: string): Promise<void>;
    enable(): Promise<void>;
    resume(): Promise<void>;
    enabled(resp: StreamManagementEnabled): Promise<void>;
    resumed(resp: StreamManagementResume): Promise<void>;
    failed(resp: StreamManagementFailed): Promise<void>;
    ack(): void;
    request(): void;
    process(ack: StreamManagementAck | StreamManagementResume | StreamManagementFailed, resend?: boolean): Promise<void>;
    track(kind: string, stanza: StreamManagementEnable | StreamManagementResume | Message | Presence | IQ): Promise<boolean>;
    handle(): Promise<void>;
    hibernate(): Promise<void>;
    shutdown(): Promise<void>;
    private _cache;
    private _reset;
}
export {};
