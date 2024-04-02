import { Agent } from '../';
import { Blocking, BlockingList, IQ, ReceivedIQSet, Roster, RosterItem, RosterResult } from '../protocol';
declare module '../' {
    interface Agent {
        getRoster(): Promise<RosterResult>;
        updateRosterItem(item: RosterItem): Promise<void>;
        removeRosterItem(jid: string): Promise<void>;
        subscribe(jid: string): void;
        unsubscribe(jid: string): void;
        acceptSubscription(jid: string): void;
        denySubscription(jid: string): void;
        block(jid: string): Promise<void>;
        unblock(jid: string): Promise<void>;
        getBlocked(): Promise<BlockingList>;
        goInvisible(probe?: boolean): Promise<void>;
        goVisible(): Promise<void>;
    }
    interface AgentConfig {
        /**
         * Roster Version
         *
         * The latest known version of the user's roster.
         *
         * If the version matches the version on the server, roster data does not need to be sent to the client.
         *
         * @default undefined
         */
        rosterVer?: string;
    }
    interface AgentEvents {
        'iq:set:roster': IQ & {
            roster: Roster;
        };
        'roster:update': IQ & {
            roster: Roster;
        };
        'roster:ver': string;
        block: {
            jids: string[];
        };
        unblock: {
            jids: string[];
        };
        'iq:set:blockList': ReceivedIQSet & {
            blockList: Blocking & {
                action: 'block' | 'unblock';
            };
        };
    }
}
export default function (client: Agent): void;
