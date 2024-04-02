import { JID } from '../JID';
import { DefinitionOptions, LanguageSet } from '../jxt';
declare module './' {
    interface Message {
        addresses?: ExtendedAddress[];
    }
    interface Presence {
        addresses?: ExtendedAddress[];
    }
}
export interface ExtendedAddress {
    type: string;
    jid?: JID;
    uri?: string;
    node?: string;
    description?: string;
    alternateLanguageDescriptions?: LanguageSet<string>;
    delivered?: boolean;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
