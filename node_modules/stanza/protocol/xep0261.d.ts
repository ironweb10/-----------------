import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_IBB_1 } from '../Namespaces';
import { JingleTransport } from './';
export interface JingleIBB extends JingleTransport {
    transportType: typeof NS_JINGLE_IBB_1;
    sid: string;
    blockSize?: number;
    ack?: boolean;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
