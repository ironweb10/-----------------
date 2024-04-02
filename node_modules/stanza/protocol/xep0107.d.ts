import { DefinitionOptions, LanguageSet } from '../jxt';
import { NS_MOOD } from '../Namespaces';
import { PubsubItemContent } from './';
declare module './' {
    interface Message {
        mood?: UserMood;
    }
}
export interface UserMood extends PubsubItemContent {
    itemType?: typeof NS_MOOD;
    value?: string;
    text?: string;
    alternateLanguageText?: LanguageSet<string>;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
