import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm, Forward, Paging } from './';
declare module './' {
    interface Message {
        archive?: MAMResult;
    }
    interface IQPayload {
        archive?: MAMQuery | MAMFin | MAMPrefs;
    }
}
export interface MAMQuery {
    type?: 'query';
    version?: string;
    node?: string;
    form?: DataForm;
    queryId?: string;
    paging?: Paging;
}
export interface MAMFin {
    type: 'result';
    version?: string;
    complete?: boolean;
    stable?: boolean;
    results?: MAMResult[];
    paging?: Paging;
}
export interface MAMPrefs {
    type: 'preferences';
    version?: string;
    default?: 'always' | 'never' | 'roster';
    always?: JID[];
    never?: JID[];
}
export interface MAMResult {
    version?: string;
    queryId: string;
    id: string;
    item: Forward;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
