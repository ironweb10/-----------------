import { DefinitionOptions, FieldDefinition, LinkPath } from './Definitions';
export declare const JIDAttribute: (name: string, defaultValue?: string | undefined, opts?: Partial<import("./Types").CreateAttributeOptions<string, string>>) => FieldDefinition<string, string>;
export declare const childJIDAttribute: (namespace: string | null, element: string, name: string, defaultValue?: string | undefined, opts?: Partial<import("./Types").CreateChildAttributeOptions<string, string>>) => FieldDefinition<string, string>;
export declare const childJID: (namespace: string | null, element: string, defaultValue?: string | undefined, emitEmpty?: boolean) => FieldDefinition<string, string>;
export declare function addAlias(namespace: string, element: string, aliases: string | Array<string | LinkPath>): DefinitionOptions;
export declare function extendMessage(fields: {
    [key: string]: FieldDefinition;
}): DefinitionOptions;
export declare function extendPresence(fields: {
    [key: string]: FieldDefinition;
}): DefinitionOptions;
export declare function extendIQ(fields: {
    [key: string]: FieldDefinition;
}): DefinitionOptions;
export declare function extendStreamFeatures(fields: {
    [key: string]: FieldDefinition;
}): DefinitionOptions;
export declare function extendStanzaError(fields: {
    [key: string]: FieldDefinition;
}): DefinitionOptions;
export declare function pubsubItemContentAliases(): LinkPath[];
