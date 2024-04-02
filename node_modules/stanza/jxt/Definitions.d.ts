import XMLElement, { JSONElement } from './Element';
import Registry from './Registry';
import Translator from './Translator';
export declare type Plugin = (registry: Registry) => void;
export interface JSONData {
    [key: string]: any;
}
export declare type FieldName = string;
export declare type XName = string;
export declare type Type = string;
export declare type Version = string;
export declare type VersionType = string;
export declare type FieldImporter<T = any> = (xml: XMLElement, context: TranslationContext) => T | undefined;
export declare type FieldExporter<T = any> = (xml: XMLElement, data: T, context: TranslationContext) => void;
export declare type LanguageResolver = (availableLanguages: string[], acceptLanguages: string[], currentLanguage?: string) => string;
export interface FieldDefinition<T = any, E = T> {
    order?: number;
    importOrder?: number;
    exportOrder?: number;
    importer: FieldImporter<T>;
    exporter: FieldExporter<T | E>;
}
export interface Importer {
    namespace: string;
    element: string;
    fields: Map<FieldName, FieldImporter>;
    fieldOrders: Map<FieldName, number>;
}
export interface Exporter {
    namespace: string;
    element: string;
    fields: Map<FieldName, FieldExporter>;
    fieldOrders: Map<FieldName, number>;
    optionalNamespaces: Map<string, string>;
}
export interface ChildTranslator {
    name: FieldName;
    translator: Translator;
    multiple: boolean;
    selector?: string;
}
export interface DefinitionUpdateOptions {
    namespace: string;
    element: string;
    type?: string;
    version?: string;
    importerOrdering: Map<FieldName, number>;
    importers: Map<FieldName, FieldImporter>;
    exporterOrdering: Map<FieldName, number>;
    exporters: Map<FieldName, FieldExporter>;
    contexts: Map<string, PathContext>;
    optionalNamespaces: Map<string, string>;
    typeOrder?: number;
}
export interface DefinitionOptions<DT extends object = any> {
    namespace: string;
    element: string;
    typeField?: string;
    languageField?: string;
    type?: string;
    defaultType?: string;
    version?: string;
    defaultVersion?: string;
    versionField?: string;
    fields?: {
        [K in keyof DT]: FieldDefinition<Exclude<DT[K], undefined>>;
    };
    path?: string;
    aliases?: Array<string | LinkPath>;
    childrenExportOrder?: {
        [key: string]: number;
    };
    optionalNamespaces?: {
        [prefix: string]: string;
    };
    typeOrder?: number;
}
export interface LinkPath {
    path: string;
    multiple?: boolean;
    selector?: string;
    contextField?: FieldName;
    impliedType?: boolean;
}
export interface LinkOptions {
    namespace: string;
    element: string;
    path: string | string[];
    multiple?: boolean;
    selector?: string;
}
export interface PathContext {
    impliedType?: Type;
    typeField: FieldName;
    typeValues: Map<XName, VersionType>;
    versionField: FieldName;
}
export interface TranslationContext {
    acceptLanguages?: string[];
    resolveLanguage?: LanguageResolver;
    lang?: string;
    namespace?: string;
    data?: JSONData;
    element?: XMLElement;
    translator?: Translator;
    importer?: Importer;
    exporter?: Exporter;
    registry?: Registry;
    path?: string;
    pathSelector?: string;
    sanitizers?: {
        [key: string]: (input: JSONElement | string) => JSONElement | string | undefined;
    };
}
export interface LanguageValue<T> {
    lang: string;
    value: T;
}
export declare type LanguageSet<T> = Array<LanguageValue<T>>;
export declare function escapeXML(text: string): string;
export declare function unescapeXML(text: string): string;
export declare function escapeXMLText(text: string): string;
export declare function basicLanguageResolver(available: string[], accept?: string[], current?: string): string;
