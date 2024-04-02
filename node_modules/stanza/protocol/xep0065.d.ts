import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        socks5?: SOCKS5;
    }
}
export interface SOCKS5 {
    mode?: 'tcp' | 'udp';
    address?: string;
    sid: string;
    activate?: string;
    candidateUsed?: JID;
    udpSuccess?: string;
    candidates?: SOCKS5Candidate[];
}
export interface SOCKS5Candidate {
    jid?: JID;
    host?: string;
    port?: number;
    uri?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
