import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        encryptionMethod?: EncryptionMethod;
    }
}
export interface EncryptionMethod {
    name?: string;
    id: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
