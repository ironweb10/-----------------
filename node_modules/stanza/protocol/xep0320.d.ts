import { DefinitionOptions } from '../jxt';
export interface JingleDtlsFingerprint {
    algorithm?: string;
    setup?: string;
    value?: string;
}
declare module './xep0176' {
    interface JingleIce {
        fingerprints?: JingleDtlsFingerprint[];
    }
}
declare const Protocol: DefinitionOptions;
export default Protocol;
