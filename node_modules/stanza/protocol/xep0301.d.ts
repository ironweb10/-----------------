import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        rtt?: RTT;
    }
}
export interface RTT {
    id?: string;
    event?: 'new' | 'reset' | 'edit' | 'init' | 'cancel';
    seq?: number;
    actions?: RTTAction[];
}
export interface RTTInsert {
    type: 'insert';
    position?: number;
    text?: string;
    baseTime?: number;
}
export interface RTTErase {
    type: 'erase';
    position?: number;
    length?: number;
    baseTime?: number;
}
export interface RTTWait {
    type: 'wait';
    duration: number;
    baseTime?: number;
}
export declare type RTTAction = RTTInsert | RTTErase | RTTWait;
declare const Protocol: DefinitionOptions[];
export default Protocol;
