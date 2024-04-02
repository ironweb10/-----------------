import { DefinitionOptions } from '../jxt';
export interface JingleSctpMap {
    port: number;
    protocol: string;
    streams?: string;
}
declare module './xep0176' {
    interface JingleIce {
        sctp?: JingleSctpMap;
    }
}
declare const Protocol: DefinitionOptions;
export default Protocol;
