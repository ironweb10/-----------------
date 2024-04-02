import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_RAW_UDP_1 } from '../Namespaces';
import { JingleTransport } from './';
export interface JingleRawUdp extends JingleTransport {
    transportType: typeof NS_JINGLE_RAW_UDP_1;
    candidates?: JingleRawUdpCandidate[];
}
export interface JingleRawUdpCandidate {
    component: string;
    foundation: string;
    id: string;
    ip: string;
    port: number;
    type: 'host' | 'prflx' | 'srflx' | 'relay';
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
