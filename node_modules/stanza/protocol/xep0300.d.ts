/// <reference types="node" />
import { DefinitionOptions } from '../jxt';
export interface Hash {
    version?: '2' | '1';
    algorithm?: string;
    value?: Buffer;
}
export interface HashUsed {
    version?: '2';
    algorithm: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
