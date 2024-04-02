import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        receipt?: MessageReceipt;
    }
}
export interface MessageReceipt {
    type: 'request' | 'received';
    id?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
