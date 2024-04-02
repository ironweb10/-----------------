import { DefinitionOptions } from '../jxt';
import { NS_JSON_0 } from '../Namespaces';
import { PubsubItemContent } from './';
declare module './' {
    interface Message {
        json?: any;
        jsonPayloads?: JSONTransfer[];
    }
}
export interface JSONTransfer {
    type: string;
    data?: any;
}
export interface JSONItem extends PubsubItemContent {
    itemType: typeof NS_JSON_0;
    json?: any;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
