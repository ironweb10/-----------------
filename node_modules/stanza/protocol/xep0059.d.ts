import { DefinitionOptions } from '../jxt';
export interface Paging {
    max?: number;
    before?: string;
    after?: string;
    first?: string;
    last?: string;
    count?: number;
    index?: number;
    firstIndex?: number;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
