import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
declare module './' {
    interface IQPayload {
        disco?: Disco;
    }
    interface Message {
        disco?: Disco;
    }
    interface StreamFeatures {
        disco?: DiscoInfo;
    }
}
export interface DiscoInfoIdentity {
    type: string;
    category: string;
    name?: string;
    lang?: string;
}
export interface DiscoInfo {
    type: 'info';
    node?: string;
    features?: string[];
    identities?: DiscoInfoIdentity[];
    extensions?: DataForm[];
}
export interface DiscoInfoResult extends DiscoInfo {
    features: string[];
    identities: DiscoInfoIdentity[];
    extensions: DataForm[];
}
export interface DiscoItems {
    type: 'items';
    node?: string;
    items?: DiscoItem[];
}
export interface DiscoItemsResult extends DiscoItems {
    items: DiscoItem[];
}
export interface DiscoItem {
    node?: string;
    jid?: JID;
    name?: string;
    lang?: string;
}
export declare type Disco = DiscoInfo | DiscoItems;
declare const Protocol: DefinitionOptions[];
export default Protocol;
