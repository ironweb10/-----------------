import { DefinitionOptions } from '../jxt';
declare module './xep0004' {
    interface DataFormFieldBase {
        media?: DataFormMedia;
    }
}
export interface DataFormMedia {
    height: number;
    width: number;
    sources: Array<{
        uri: string;
        mediaType: string;
    }>;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
