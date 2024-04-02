import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Presence {
        hats?: Hat[];
    }
}
export interface Hat {
    id: string;
    name?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
