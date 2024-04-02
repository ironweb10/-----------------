import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
declare module './' {
    interface IQPayload {
        command?: AdHocCommand;
    }
    interface StanzaError {
        commandError?: AdhocCommandError;
    }
}
export declare type AdhocCommandError = 'bad-action' | 'bad-locale' | 'bad-payload' | 'bad-sessionid' | 'malformed-action' | 'session-expired';
export interface AdHocCommand {
    sid?: string;
    node?: string;
    status?: 'canceled' | 'executing' | 'completed';
    action?: 'execute' | 'cancel' | 'complete' | 'next' | 'prev';
    availableActions?: {
        execute: string;
        next?: boolean;
        prev?: boolean;
        complete?: boolean;
    };
    notes?: Array<{
        type?: 'info' | 'warn' | 'error';
        value?: string;
    }>;
    form?: DataForm;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
