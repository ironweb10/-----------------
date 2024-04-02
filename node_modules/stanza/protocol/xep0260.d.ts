import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_SOCKS5_1 } from '../Namespaces';
import { JingleTransport } from './';
export interface JingleSocks5 extends JingleTransport {
    transportType: typeof NS_JINGLE_SOCKS5_1;
    sid: string;
    mode?: 'tcp' | 'udp';
    address?: string;
    activated?: string;
    candidateUsed?: string;
    candidateError?: boolean;
    proxyError?: boolean;
    candidates?: JingleSocks5Candidate[];
}
export interface JingleSocks5Candidate {
    cid: string;
    host?: string;
    port?: number;
    uri?: string;
    priority?: number;
    type?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
