import { DefinitionOptions } from '../jxt';
import { NS_ATOM } from '../Namespaces';
import { PubsubItemContent } from './';
declare module './' {
    interface AtomEntry extends PubsubItemContent {
        itemType?: typeof NS_ATOM;
        authors?: AtomPerson[];
        categories?: AtomCategory[];
        content?: AtomText;
        contributors?: AtomPerson[];
        id?: string;
        links?: AtomLink[];
        published?: Date;
        rights?: AtomText;
        summary?: AtomText;
        title?: AtomText;
        updated?: Date;
    }
}
export interface AtomText {
    text?: string;
    type?: 'text' | 'html';
}
export interface AtomLink {
    href?: string;
    mediaType?: string;
    rel?: string;
}
export interface AtomPerson {
    name?: string;
    uri?: string;
    email?: string;
}
export interface AtomCategory {
    term?: string;
    scheme?: string;
    label?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
