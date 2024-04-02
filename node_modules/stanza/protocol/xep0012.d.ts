import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        lastActivity?: LastActivity;
    }
    interface Presence {
        legacyLastActivity?: LastActivity;
    }
}
export interface LastActivity {
    seconds?: number;
    status?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
