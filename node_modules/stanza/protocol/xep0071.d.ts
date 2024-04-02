import { DefinitionOptions, JSONElement, LanguageSet, XMLElement } from '../jxt';
declare module './' {
    interface Message {
        html?: XHTMLIM;
    }
}
export interface XHTMLIM {
    body?: XMLElement;
    alternateLanguageBodies?: LanguageSet<JSONElement | string>;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
