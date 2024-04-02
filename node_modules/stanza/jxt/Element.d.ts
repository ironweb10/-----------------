export interface Attributes {
    [key: string]: string | undefined;
    xmlns?: string;
}
export interface JSONElement {
    name: string;
    children: Array<JSONElement | string>;
    attributes: Attributes;
}
declare type NullableString = string | null | undefined;
export default class XMLElement {
    name: string;
    parent?: XMLElement;
    children: Array<XMLElement | string>;
    attributes: Attributes;
    optionalNamespaces: {
        [ns: string]: string;
    };
    constructor(name: string, attrs?: Attributes, children?: Array<XMLElement | JSONElement | string>);
    getName(): string;
    getNamespace(): string;
    getNamespaceContext(): {
        [key: string]: string;
    };
    getDefaultNamespace(): string;
    getNamespaceRoot(namespace: string): XMLElement | undefined;
    getAttribute(name: string, xmlns?: NullableString): string | undefined;
    getChild(name: string, xmlns?: NullableString): XMLElement | undefined;
    getChildren(name: string, xmlns?: NullableString): XMLElement[];
    getText(): string;
    appendChild(child: XMLElement | string): XMLElement | string;
    setAttribute(attr: string, val: NullableString, force?: boolean): void;
    addOptionalNamespace(prefix: string, namespace: string): void;
    useNamespace(prefix: string, namespace: string): string;
    toJSON(): JSONElement;
    toString(): string;
    openTag(allowSelfClose?: boolean): string;
    closeTag(): string;
    private findNamespaceForPrefix;
}
export {};
