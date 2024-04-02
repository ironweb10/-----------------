import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
export interface ExternalService {
    action?: 'add' | 'remove' | 'modify';
    expires?: Date;
    host?: string;
    name?: string;
    password?: string;
    port?: number;
    restricted?: boolean;
    transport?: string;
    type?: string;
    username?: string;
    form?: DataForm;
}
export interface ExternalServiceList {
    version?: '1' | '2';
    type?: string;
    services?: ExternalService[];
}
export interface ExternalServiceCredentials extends ExternalService {
    version?: '1' | '2';
}
declare module './' {
    interface IQPayload {
        externalServices?: ExternalServiceList;
        externalServiceCredentials?: ExternalServiceCredentials;
    }
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
