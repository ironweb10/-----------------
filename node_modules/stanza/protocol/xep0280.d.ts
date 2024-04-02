import { DefinitionOptions } from '../jxt';
import { Forward } from './';
declare module './' {
    interface Message {
        carbon?: CarbonMessage;
    }
    interface IQPayload {
        carbons?: CarbonControl;
    }
}
export interface CarbonControl {
    action: 'enable' | 'disable';
}
export interface CarbonMessage {
    type: 'sent' | 'received';
    forward: Forward;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
