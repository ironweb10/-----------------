import { DefinitionOptions } from '../jxt';
import { NS_NICK } from '../Namespaces';
import { PubsubItemContent } from './';
declare module './' {
    interface Message {
        nick?: string;
    }
    interface Presence {
        nick?: string;
    }
}
export interface UserNick extends PubsubItemContent {
    itemType?: typeof NS_NICK;
    nick?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
