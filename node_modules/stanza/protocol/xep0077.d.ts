import { DefinitionOptions } from '../jxt';
import { DataForm, Link } from './';
declare module './' {
    interface StreamFeatures {
        inbandRegistration?: boolean;
    }
    interface IQPayload {
        account?: AccountManagement;
    }
}
export interface AccountManagement {
    registered?: boolean;
    instructions?: string;
    username?: string;
    nick?: string;
    password?: string;
    fullName?: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    address?: string;
    locality?: string;
    region?: string;
    postalCode?: string;
    phone?: string;
    uri?: string;
    date?: Date;
    misc?: string;
    text?: string;
    key?: string;
    remove?: boolean;
    form?: DataForm;
    registrationLink?: Link;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
