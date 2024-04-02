import { DefinitionOptions } from '../jxt';
import { NS_TUNE } from '../Namespaces';
import { PubsubItemContent } from './';
export interface UserTune extends PubsubItemContent {
    itemType?: typeof NS_TUNE;
    artist?: string;
    length?: number;
    rating?: number;
    source?: string;
    title?: string;
    track?: string;
    uri?: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
