import { MUCAffiliation, MUCRole, MUCStatusCode } from '../Constants';
import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm, Presence, ReceivedPresence } from './';
declare module './' {
    interface Presence {
        muc?: MUCJoin | MUCInfo;
    }
    interface Message {
        muc?: MUCInfo | MUCDirectInvite;
        legacyMUC?: MUCDirectInvite;
    }
    interface IQPayload {
        muc?: MUCConfigure | MUCUserList | MUCUnique;
    }
}
export interface MUCPresence extends Presence {
    muc?: MUCJoin;
}
export interface ReceivedMUCPresence extends ReceivedPresence {
    muc: MUCInfo;
}
export interface MUCJoin {
    type: 'join';
    password?: string;
    history?: MUCHistory;
}
export interface MUCInfo extends MUCUserItem {
    type: 'info';
    action?: 'invite' | 'decline' | 'destroy';
    password?: string;
    statusCodes?: Array<MUCStatusCode | string>;
    destroy?: MUCDestroy;
    invite?: MUCInvite[];
    decline?: MUCDecline;
}
export interface MUCUserItem {
    affiliation?: MUCAffiliation;
    role?: MUCRole;
    jid?: JID;
    nick?: string;
    reason?: string;
    actor?: MUCActor;
}
export interface MUCActor {
    nick?: string;
    jid?: JID;
}
export interface MUCHistory {
    maxCharacters?: number;
    maxStanzas?: number;
    seconds?: number;
    since?: Date;
}
export interface MUCInvite {
    to?: JID;
    from?: JID;
    reason?: string;
    thread?: string;
    continue?: boolean;
}
export interface MUCDirectInvite {
    type: 'direct-invite';
    action?: 'invite';
    jid?: JID;
    password?: string;
    reason?: string;
    thread?: string;
    continue?: boolean;
    legacyReason?: string;
}
export interface MUCDecline {
    to?: JID;
    from?: JID;
    reason?: string;
}
export interface MUCUserList {
    type: 'user-list';
    users?: MUCUserItem[];
}
export interface MUCConfigure {
    type: 'configure';
    form?: DataForm;
    destroy?: MUCDestroy;
}
export interface MUCDestroy {
    jid?: JID;
    password?: string;
    reason?: string;
}
export interface MUCUnique {
    type: 'unique';
    name?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
