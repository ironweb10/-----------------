import { DataFormFieldType, DataFormType } from '../Constants';
import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        forms?: DataForm[];
    }
}
export interface DataForm {
    type?: DataFormType;
    title?: string;
    instructions?: string | string[];
    reported?: DataFormField[];
    items?: DataFormItem[];
    fields?: DataFormField[];
}
export interface DataFormItem {
    fields: DataFormField[];
}
declare type DataFormFieldValueType = boolean | string | string[] | JID | JID[];
export interface DataFormFieldBase {
    type?: DataFormFieldType;
    name?: string;
    label?: string;
    description?: string;
    required?: boolean;
    rawValues?: string[];
    validation?: DataFormValidation;
}
export interface DataFormFieldBoolean extends DataFormFieldBase {
    type: 'boolean';
    value?: boolean;
}
export interface DataFormFieldText extends DataFormFieldBase {
    type: typeof DataFormFieldType.Fixed | typeof DataFormFieldType.Hidden | typeof DataFormFieldType.TextPrivate | typeof DataFormFieldType.Text;
    value?: string;
}
export interface DataFormFieldTextMulti extends DataFormFieldBase {
    type: typeof DataFormFieldType.TextMultiple;
    value?: string[];
}
export interface DataFormFieldList extends DataFormFieldBase {
    type: typeof DataFormFieldType.List;
    value?: string;
    options?: Array<DataFormFieldOption<string>>;
}
export interface DataFormFieldListMulti extends DataFormFieldBase {
    type: typeof DataFormFieldType.ListMultiple;
    value?: string[];
    options?: Array<DataFormFieldOption<string>>;
}
export interface DataFormFieldJID extends DataFormFieldBase {
    type: typeof DataFormFieldType.JID;
    value?: JID;
    options?: Array<DataFormFieldOption<JID>>;
}
export interface DataFormFieldJIDMulti extends DataFormFieldBase {
    type: typeof DataFormFieldType.JIDMultiple;
    value?: JID[];
    options?: Array<DataFormFieldOption<JID>>;
}
export interface DataFormFieldAny extends DataFormFieldBase {
    type?: undefined;
    value?: DataFormFieldValueType;
}
export interface DataFormFieldOption<T> {
    label?: string;
    value: T;
}
export declare type DataFormField = DataFormFieldBoolean | DataFormFieldText | DataFormFieldTextMulti | DataFormFieldList | DataFormFieldListMulti | DataFormFieldJID | DataFormFieldJIDMulti | DataFormFieldAny;
export interface DataFormValidation {
    type: string;
    method: 'basic' | 'open' | 'range' | 'regex';
    rangeMin?: string;
    rangeMax?: string;
    listMin?: number;
    listMax?: number;
    regex?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
