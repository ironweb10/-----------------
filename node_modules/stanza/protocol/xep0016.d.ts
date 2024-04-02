import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        privacy?: PrivacyList;
    }
}
export interface PrivacyList {
    activeList?: string;
    defaultList?: string;
    lists?: Array<{
        name: string;
        items: Array<{
            type?: 'jid' | 'group' | 'subscription';
            value?: string;
            action: 'allow' | 'deny';
            order: number;
            messages?: boolean;
            incomingPresence?: boolean;
            outgoingPresence?: boolean;
            iq?: boolean;
        }>;
    }>;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
