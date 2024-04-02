import { DefinitionOptions } from '../jxt';
declare module './' {
    interface StreamFeatures {
        legacyCapabilities?: LegacyEntityCaps[];
    }
    interface Presence {
        legacyCapabilities?: LegacyEntityCaps[];
    }
}
export interface LegacyEntityCaps {
    node: string;
    value: string;
    algorithm: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
