import { DefinitionOptions } from '../jxt';
import { Delay, IQ, Message, Presence } from './';
declare module './' {
    interface Message {
        forward?: Forward;
    }
}
export interface Forward {
    delay?: Delay;
    message?: Message;
    presence?: Presence;
    iq?: IQ;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
