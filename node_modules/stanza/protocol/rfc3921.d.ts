import { DefinitionOptions } from '../jxt';
declare module './' {
    interface StreamFeatures {
        legacySession?: SessionFeature;
    }
    interface IQPayload {
        legacySession?: boolean;
    }
}
export interface SessionFeature {
    optional?: boolean;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
