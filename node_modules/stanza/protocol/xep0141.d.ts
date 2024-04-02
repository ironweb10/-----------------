import { DefinitionOptions } from '../jxt';
declare module './xep0004' {
    interface DataForm {
        layout?: DataFormLayout[];
    }
}
export interface DataFormLayoutPageSection {
    type: 'page' | 'section';
    label?: string;
    contents?: DataFormLayout[];
}
export interface DataFormLayoutText {
    type: 'text';
    value: string;
}
export interface DataFormLayoutFieldRef {
    type: 'fieldref';
    field: string;
}
export interface DataFormLayoutReportedRef {
    type: 'reportedref';
}
export declare type DataFormLayout = DataFormLayoutPageSection | DataFormLayoutText | DataFormLayoutFieldRef | DataFormLayoutReportedRef;
declare const Protocol: DefinitionOptions[];
export default Protocol;
