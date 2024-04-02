/// <reference types="node" />
import { IQType, MessageType, PresenceType, SASLFailureCondition, StanzaErrorCondition, StreamErrorCondition, StreamType } from '../Constants';
import { DefinitionOptions, LanguageSet } from '../jxt';
import { IQ, Message, Presence } from './';
declare module './' {
    interface Stream {
        type?: 'stream' | 'open' | 'close';
        to?: string;
        from?: string;
        id?: string;
        version?: string;
        lang?: string;
    }
    interface StreamFeatures {
        sasl?: SASLFeature;
        tls?: TLS;
        bind?: Bind;
    }
    interface StreamError {
        condition: StreamErrorCondition;
        text?: string;
        alternateLanguageText?: LanguageSet<string>;
        seeOtherHost?: string;
    }
    interface StanzaError {
        by?: string;
        type?: string;
        condition: StanzaErrorCondition;
        text?: string;
        alternateLanguageText?: LanguageSet<string>;
        redirect?: string;
        gone?: string;
    }
    interface Message {
        to?: string;
        from?: string;
        id?: string;
        lang?: string;
        streamType?: StreamType;
        type?: MessageType;
        error?: StanzaError;
    }
    interface Presence {
        to?: string;
        from?: string;
        id?: string;
        lang?: string;
        streamType?: StreamType;
        type?: PresenceType;
        error?: StanzaError;
    }
    interface IQBase {
        to?: string;
        from?: string;
        id?: string;
        type: IQType;
        lang?: string;
        streamType?: StreamType;
        error?: StanzaError;
        payloadType?: Exclude<keyof IQ, keyof IQBase> | 'invalid-payload-count' | 'unknown-payload';
    }
    interface IQ {
        bind?: Bind;
    }
}
export interface ReceivedIQ extends IQ {
    to: string;
    from: string;
    id: string;
}
export interface ReceivedIQGet extends ReceivedIQ {
    type: typeof IQType.Get;
}
export interface ReceivedIQSet extends ReceivedIQ {
    type: typeof IQType.Set;
}
export interface ReceivedMessage extends Message {
    to: string;
    from: string;
}
export interface ReceivedPresence extends Presence {
    to: string;
    from: string;
}
export interface SASLFeature {
    mechanisms: string[];
}
export interface SASLAbort {
    type: 'abort';
}
export interface SASLChallengeResponse {
    type: 'challenge' | 'response';
    value?: Buffer;
}
export interface SASLSuccess {
    type: 'success';
    value?: Buffer;
}
export interface SASLAuth {
    type: 'auth';
    mechanism: string;
    value?: Buffer;
}
export interface SASLFailure {
    type: 'failure';
    condition: SASLFailureCondition;
    text?: string;
    alternateLanguageText?: LanguageSet<string>;
}
export declare type SASL = SASLAbort | SASLChallengeResponse | SASLSuccess | SASLFailure | SASLAuth;
export interface TLS {
    type?: 'start' | 'proceed' | 'failure';
    required?: boolean;
}
export interface Bind {
    jid?: string;
    resource?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
