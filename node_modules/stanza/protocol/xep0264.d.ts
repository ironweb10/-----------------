import { DefinitionOptions } from '../jxt';
import { Bits } from './';
declare module './xep0166' {
    interface Jingle {
        bits?: Bits[];
    }
}
export interface Thumbnail {
    mediaType: string;
    width?: number;
    height?: number;
    uri: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
