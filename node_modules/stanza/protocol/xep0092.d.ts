import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        softwareVersion?: SoftwareVersion;
    }
}
export interface SoftwareVersion {
    name?: string;
    version?: string;
    os?: string;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
