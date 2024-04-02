import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        links?: Link[];
    }
    interface IQPayload {
        transferLink?: Link;
    }
}
export interface Link {
    url?: string;
    description?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
