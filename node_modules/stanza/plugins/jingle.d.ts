import { Agent } from '../';
import * as Jingle from '../jingle';
import { ExternalServiceCredentials, ExternalServiceList, IQ, Jingle as JingleRequest } from '../protocol';
declare module '../' {
    interface Agent {
        jingle: Jingle.SessionManager;
        discoverICEServers(opts?: {
            version?: '2' | '1';
        }): Promise<RTCIceServer[]>;
        getServices(jid: string, type?: string, version?: '2' | '1'): Promise<ExternalServiceList>;
        getServiceCredentials(jid: string, host: string, type?: string, port?: number, version?: '2' | '1'): Promise<ExternalServiceCredentials>;
    }
    interface AgentEvents {
        'iq:set:jingle': IQ & {
            jingle: JingleRequest;
        };
        'jingle:created': Jingle.Session;
        'jingle:outgoing': Jingle.Session;
        'jingle:incoming': Jingle.Session;
        'jingle:accepted': Jingle.Session;
        'jingle:terminated': (session: Jingle.Session, reason?: JingleRequest['reason']) => void;
        'jingle:mute': (session: Jingle.Session, info: JingleRequest['info']) => void;
        'jingle:unmute': (session: Jingle.Session, info: JingleRequest['info']) => void;
        'jingle:hold': (session: Jingle.Session, info?: JingleRequest['info']) => void;
        'jingle:resumed': (session: Jingle.Session, info?: JingleRequest['info']) => void;
        'jingle:ringing': (session: Jingle.Session, info?: JingleRequest['info']) => void;
    }
    interface AgentConfig {
        jingle?: JinglePluginConfig;
    }
}
interface JinglePluginConfig {
    advertiseAudio?: boolean;
    advertiseVideo?: boolean;
    advertiseFileTransfer?: boolean;
    hasRTCPeerConnection?: boolean;
    trickleIce: boolean;
    bundlePolicy?: RTCConfiguration['bundlePolicy'];
    iceTransportPolicy?: RTCConfiguration['iceTransportPolicy'];
    rtcpMuxPolicy?: RTCConfiguration['rtcpMuxPolicy'];
    iceServers?: RTCIceServer[];
    sdpSemantics?: 'unified-plan' | 'plan-b';
}
export default function (client: Agent): void;
export {};
