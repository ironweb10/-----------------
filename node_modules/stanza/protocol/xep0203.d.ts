import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        delay?: Delay;
    }
    interface Presence {
        delay?: Delay;
    }
}
export interface Delay {
    from?: string;
    timestamp: Date;
    reason?: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
