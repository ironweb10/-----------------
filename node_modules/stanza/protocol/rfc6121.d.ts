import { MessageType, PresenceShow, PresenceType, RosterSubscription } from '../Constants';
import { DefinitionOptions, LanguageSet } from '../jxt';
declare module './' {
    interface StreamFeatures {
        rosterVersioning?: boolean;
        rosterPreApproval?: boolean;
    }
    interface Message {
        type?: MessageType;
        body?: string;
        alternateLanguageBodies?: LanguageSet<string>;
        alternateLanguageSubjects?: LanguageSet<string>;
        hasSubject?: boolean;
        subject?: string;
        thread?: string;
        parentThread?: string;
    }
    interface Presence {
        type?: PresenceType;
        show?: PresenceShow;
        status?: string;
        alternateLanguageStatuses?: LanguageSet<string>;
        priority?: number;
    }
    interface IQPayload {
        roster?: Roster;
    }
}
export interface Roster {
    version?: string;
    items?: RosterItem[];
}
export interface RosterResult extends Roster {
    items: RosterItem[];
}
export interface RosterItem {
    jid: string;
    name?: string;
    subscription: RosterSubscription;
    approved?: boolean;
    ask?: boolean;
    groups?: string[];
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
