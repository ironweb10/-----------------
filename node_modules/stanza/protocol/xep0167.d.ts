/// <reference types="node" />
import { JingleContentSenders } from '../Constants';
import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_RTP_1 } from '../Namespaces';
import { JingleApplication, JingleDtlsFingerprint, Thumbnail } from './';
declare module './xep0166' {
    interface JingleReason {
        rtpError?: 'invalid-crypto' | 'crypto-required';
    }
}
export interface JingleRtpDescription extends JingleApplication {
    applicationType: typeof NS_JINGLE_RTP_1;
    media?: 'audio' | 'video';
    ssrc?: string;
    rtcpMux?: boolean;
    rtcpFeedback?: JingleRtcpFeedback[];
    rtcpReducedSize?: boolean;
    headerExtensions?: JingleRtpHeaderExtension[];
    codecs?: JingleRtpCodec[];
    sources?: JingleRtpSource[];
    sourceGroups?: JingleRtpSourceGroup[];
    streams?: JingleRtpMediaStream[];
    thumbnails?: Thumbnail[];
    encryption?: JingleRtpEncryption;
}
export interface JingleRtpCodec {
    channels?: number;
    clockRate?: number;
    id: string;
    maxptime?: number;
    name: string;
    ptime?: number;
    parameters?: {
        [key: string]: string;
    };
    rtcpFeedback?: JingleRtcpFeedback[];
}
export interface JingleRtcpFeedback {
    type: string;
    parameter?: string;
}
export interface JingleRtpSource {
    ssrc: string;
    parameters: {
        [key: string]: string;
    };
}
export interface JingleRtpMediaStream {
    id: string;
    track?: string;
}
export interface JingleRtpHeaderExtension {
    id: number;
    uri: string;
    senders?: JingleContentSenders;
}
export interface JingleRtpSourceGroup {
    semantics: string;
    sources: string[];
}
export interface JingleRtpEncryption {
    required?: boolean;
    sdes?: JingleRtpSdes[];
    zrtp?: JingleRtpZrtp;
    dtls?: JingleDtlsFingerprint[];
}
export interface JingleRtpSdes {
    cryptoSuite?: string;
    keyParameterss?: string;
    sessionParameters?: string;
    tag?: number;
}
export interface JingleRtpZrtp {
    version?: string;
    value?: Buffer;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
