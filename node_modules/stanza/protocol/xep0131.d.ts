import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        headers?: StanzaHeader[];
    }
    interface Presence {
        headers?: StanzaHeader[];
    }
}
export interface StanzaHeader {
    name: string;
    value?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
