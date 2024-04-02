import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        originId?: string;
        stanzaIds?: StanzaId[];
    }
}
export interface StanzaId {
    id: string;
    by: JID;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
