import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_ICE_0, NS_JINGLE_ICE_UDP_1 } from '../Namespaces';
import { JingleTransport } from './';
export interface JingleIce extends JingleTransport {
    transportType: typeof NS_JINGLE_ICE_0 | typeof NS_JINGLE_ICE_UDP_1;
    password?: string;
    usernameFragment?: string;
    gatheringComplete?: boolean;
    remoteCandidate?: JingleIceRemoteCandidate;
    candidates?: JingleIceCandidate[];
    iceLite?: boolean;
}
export interface JingleIceCandidate {
    component: number;
    generation?: number;
    foundation: string;
    id?: string;
    ip: string;
    network?: number;
    port: number;
    priority: number;
    protocol?: 'tcp' | 'udp';
    relatedAddress?: string;
    relatedPort?: number;
    tcpType?: 'active' | 'passive' | 'so';
    type: 'host' | 'prflx' | 'srflx' | 'relay';
}
export interface JingleIceRemoteCandidate {
    component: number;
    ip: string;
    port: number;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
