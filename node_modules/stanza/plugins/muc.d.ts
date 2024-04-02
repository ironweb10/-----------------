import { Agent } from '../';
import { MUCAffiliation, MUCRole } from '../Constants';
import { DataForm, IQ, MUCBookmark, MUCConfigure, MUCDestroy, MUCDirectInvite, MUCInvite, MUCUserItem, MUCUserList, Presence, ReceivedMessage, ReceivedMUCPresence, ReceivedPresence } from '../protocol';
declare module '../' {
    interface Agent {
        joinedRooms: Map<string, string>;
        joiningRooms: Map<string, string>;
        leavingRooms: Map<string, string>;
        joinRoom(jid: string, nick: string, opts?: Presence): Promise<ReceivedMUCPresence>;
        leaveRoom(jid: string, nick?: string, opts?: Presence): Promise<ReceivedPresence>;
        ban(jid: string, occupant: string, reason?: string): Promise<IQ & {
            muc: MUCUserList;
        }>;
        kick(jid: string, nick: string, reason?: string): Promise<IQ & {
            muc: MUCUserList;
        }>;
        invite(room: string, invites: MUCInvite | MUCInvite[]): void;
        directInvite(room: string, to: string, opts?: Partial<MUCDirectInvite>): void;
        declineInvite(room: string, sender: string, reason?: string): void;
        changeNick(room: string, nick: string): Promise<ReceivedMUCPresence>;
        setSubject(room: string, subject: string): void;
        getReservedNick(room: string): Promise<string>;
        requestRoomVoice(room: string): void;
        setRoomAffiliation(room: string, jid: string, affiliation: MUCAffiliation, reason?: string): Promise<IQ & {
            muc: MUCUserList;
        }>;
        setRoomRole(room: string, nick: string, role: MUCRole, reason?: string): Promise<IQ & {
            muc: MUCUserList;
        }>;
        getRoomMembers(room: string, opts?: MUCUserItem): Promise<IQ & {
            muc: MUCUserList;
        }>;
        getRoomConfig(room: string): Promise<DataForm>;
        configureRoom(room: string, form: Partial<DataForm>): Promise<IQ & {
            muc: MUCConfigure;
        }>;
        destroyRoom(room: string, opts?: MUCDestroy): Promise<IQ & {
            muc: MUCConfigure;
        }>;
        getUniqueRoomName(mucHost: string): Promise<string>;
        getBookmarks(): Promise<MUCBookmark[]>;
        setBookmarks(bookmarks: MUCBookmark[]): Promise<IQ>;
        addBookmark(bookmark: MUCBookmark): Promise<IQ>;
        removeBookmark(jid: string): Promise<IQ>;
    }
    interface AgentEvents {
        'muc:topic': MUCTopicEvent;
        'muc:invite': MUCInviteEvent;
        'muc:other': ReceivedMessage;
        'muc:declined': MUCDeclinedEvent;
        'muc:failed': Presence;
        'muc:error': Presence;
        'muc:available': ReceivedMUCPresence;
        'muc:unavailable': ReceivedMUCPresence;
        'muc:destroyed': MUCDestroyedEvent;
        'muc:leave': ReceivedMUCPresence;
        'muc:join': ReceivedMUCPresence;
    }
}
export interface MUCTopicEvent {
    topic?: string;
    room: string;
    from: string;
}
export interface MUCInviteEvent {
    from: string;
    password?: string;
    reason?: string;
    room: string;
    thread?: string;
    type: 'direct' | 'mediated';
}
export interface MUCDeclinedEvent {
    from: string;
    reason?: string;
    room: string;
}
export interface MUCDestroyedEvent {
    newRoom?: string;
    password?: string;
    reason?: string;
    room: string;
}
export default function (client: Agent): void;
