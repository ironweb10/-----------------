import { DefinitionOptions } from '../jxt';
export interface XRD {
    subject?: string;
    links?: XRDLink[];
}
export interface XRDLink {
    href?: string;
    rel?: string;
    type?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
