import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_XML_0 } from '../Namespaces';
import { JingleApplication } from './';
export interface JingleXMLStreamDescription extends JingleApplication {
    applicationType: typeof NS_JINGLE_XML_0;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
