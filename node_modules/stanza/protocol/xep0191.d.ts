import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        blockList?: Blocking;
    }
    interface StanzaError {
        blocked?: boolean;
    }
}
export interface Blocking {
    action: 'list' | 'block' | 'unblock';
    jids?: JID[];
}
export interface BlockingList extends Blocking {
    action: 'list';
    jids: JID[];
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
