import { DefinitionOptions, JSONData, LanguageResolver, Plugin, TranslationContext, XName } from './Definitions';
import XMLElement from './Element';
import Translator from './Translator';
export default class Registry {
    root: Translator;
    translators: Map<XName, Translator>;
    private languageResolver;
    constructor();
    setLanguageResolver(resolver: LanguageResolver): void;
    import(xml: XMLElement, context?: TranslationContext): JSONData | undefined;
    export<T extends JSONData = JSONData>(path: string, data: T, context?: TranslationContext): XMLElement | undefined;
    getImportKey(xml: XMLElement, path?: string): string | undefined;
    define(defs: DefinitionOptions | DefinitionOptions[] | Plugin | Array<Plugin | DefinitionOptions | DefinitionOptions[]>): void;
    alias(namespace: string, element: string, path: string, multiple?: boolean, selector?: string, contextField?: string, contextType?: string, contextImpliedType?: boolean): void;
    private walkToTranslator;
    private hasTranslator;
    private getOrCreateTranslator;
    private indexTranslator;
}
