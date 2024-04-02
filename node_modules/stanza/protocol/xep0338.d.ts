import { DefinitionOptions } from '../jxt';
declare module './xep0166' {
    interface Jingle {
        groups?: JingleContentGroup[];
    }
}
export interface JingleContentGroup {
    semantics: string;
    contents: string[];
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
