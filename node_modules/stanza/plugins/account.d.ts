import { Agent } from '../';
import { AccountManagement, DataFormField, IQ, PrivateStorage, VCardTemp } from '../protocol';
declare module '../' {
    interface Agent {
        getAccountInfo(jid?: string): Promise<AccountManagement>;
        updateAccount(jid: string, data: AccountManagement): Promise<IQ>;
        deleteAccount(jid: string): Promise<IQ>;
        getPrivateData<T extends keyof PrivateStorage>(key: T): Promise<PrivateStorage[T]>;
        setPrivateData<T extends keyof PrivateStorage>(key: T, data: PrivateStorage[T]): Promise<IQ>;
        getVCard(jid: string): Promise<VCardTemp>;
        publishVCard(vcard: VCardTemp): Promise<void>;
        enableNotifications(jid: string, node: string, fieldList?: DataFormField[]): Promise<IQ>;
        disableNotifications(jid: string, node?: string): Promise<IQ>;
    }
}
export default function (client: Agent): void;
