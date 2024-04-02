import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
declare module './' {
    interface IQPayload {
        push?: PushNotificationControl;
    }
}
export interface PushNotificationControl {
    action: 'enable' | 'disable';
    node?: string;
    jid?: JID;
    form?: DataForm;
}
export interface PushNotification {
    form?: DataForm;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
