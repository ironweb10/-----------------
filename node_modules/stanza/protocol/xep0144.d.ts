import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        rosterExchange?: RosterExchange[];
    }
    interface IQPayload {
        rosterExchange?: RosterExchange[];
    }
}
export interface RosterExchange {
    action: 'add' | 'delete' | 'modify';
    jid: JID;
    name?: string;
    groups?: string[];
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
