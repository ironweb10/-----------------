/// <reference types="node" />
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        bits?: Bits[];
    }
    interface Presence {
        bits?: Bits[];
    }
    interface IQPayload {
        bits?: Bits;
    }
}
export interface Bits {
    data?: Buffer;
    cid: string;
    maxAge?: number;
    mediaType?: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
