import { DefinitionOptions, LanguageSet } from '../jxt';
import { NS_ACTIVITY } from '../Namespaces';
import { PubsubItemContent } from './';
export interface UserActivity extends PubsubItemContent {
    itemType?: typeof NS_ACTIVITY;
    activity: [string] | [string, string];
    text?: string;
    alternateLanguageText?: LanguageSet<string>;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
