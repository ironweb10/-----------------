"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Definitions_1 = require("./Definitions");
const XHTMLIM_1 = tslib_1.__importDefault(require("./sanitizers/XHTMLIM"));
const Translator_1 = tslib_1.__importDefault(require("./Translator"));
class Registry {
    constructor() {
        this.translators = new Map();
        this.root = new Translator_1.default();
        this.setLanguageResolver(Definitions_1.basicLanguageResolver);
    }
    setLanguageResolver(resolver) {
        this.languageResolver = resolver;
    }
    import(xml, context = { registry: this }) {
        if (!this.hasTranslator(xml.getNamespace(), xml.getName())) {
            return;
        }
        if (!context.acceptLanguages) {
            context.acceptLanguages = [];
        }
        context.acceptLanguages = context.acceptLanguages.map(lang => lang.toLowerCase());
        if (context.lang) {
            context.lang = context.lang.toLowerCase();
        }
        if (!context.resolveLanguage) {
            context.resolveLanguage = this.languageResolver;
        }
        context.path = this.getImportKey(xml);
        if (!context.sanitizers) {
            context.sanitizers = {
                xhtmlim: XHTMLIM_1.default
            };
        }
        const translator = this.getOrCreateTranslator(xml.getNamespace(), xml.getName());
        return translator.import(xml, {
            ...context,
            registry: this
        });
    }
    export(path, data, context = { registry: this }) {
        if (!context.acceptLanguages) {
            context.acceptLanguages = [];
        }
        context.acceptLanguages = context.acceptLanguages.map(lang => lang.toLowerCase());
        if (context.lang) {
            context.lang = context.lang.toLowerCase();
        }
        if (!context.sanitizers) {
            context.sanitizers = {
                xhtmlim: XHTMLIM_1.default
            };
        }
        context.path = path;
        const fields = path.split('.').filter(item => {
            return item !== '';
        });
        let translator = this.root;
        for (const field of fields) {
            const nextTranslator = translator.getChild(field);
            if (!nextTranslator) {
                return;
            }
            translator = nextTranslator;
        }
        return translator.export(data, {
            ...context,
            registry: this
        });
    }
    getImportKey(xml, path = '') {
        const root = !path ? this.root : this.walkToTranslator(path.split('.'));
        if (!root) {
            return undefined;
        }
        return root.getImportKey(xml);
    }
    define(defs) {
        if (Array.isArray(defs)) {
            for (const def of defs) {
                if (typeof def === 'object') {
                    this.define(def);
                }
                else {
                    def(this);
                }
            }
            return;
        }
        else if (typeof defs !== 'object') {
            defs(this);
            return;
        }
        const definition = defs;
        definition.aliases = definition.aliases || [];
        if (definition.path && !definition.aliases.includes(definition.path)) {
            definition.aliases.push(definition.path);
        }
        const aliases = definition.aliases
            .map(alias => (typeof alias === 'string' ? { path: alias } : alias))
            .sort((a, b) => {
            const aLen = a.path.split('.').length;
            const bLen = b.path.split('.').length;
            return bLen - aLen;
        });
        let translator;
        if (this.hasTranslator(definition.namespace, definition.element)) {
            // Get existing translator
            translator = this.getOrCreateTranslator(definition.namespace, definition.element);
        }
        if (!translator) {
            let placeholder;
            for (const alias of aliases) {
                const t = this.walkToTranslator(alias.path.split('.'));
                if (t && !t.placeholder) {
                    translator = t;
                    break;
                }
                else if (t) {
                    placeholder = t;
                }
            }
            if (placeholder && !translator) {
                translator = placeholder;
                translator.placeholder = false;
            }
        }
        if (!translator) {
            // Create a new translator
            translator = this.getOrCreateTranslator(definition.namespace, definition.element);
        }
        this.indexTranslator(definition.namespace, definition.element, translator);
        const fields = definition.fields || {};
        const importers = new Map();
        const exporters = new Map();
        const importerOrdering = new Map();
        const exporterOrdering = new Map();
        if (definition.typeField) {
            translator.typeField = definition.typeField;
        }
        if (definition.defaultType) {
            translator.defaultType = definition.defaultType;
        }
        if (definition.versionField) {
            translator.versionField = definition.versionField;
        }
        if (definition.defaultVersion) {
            translator.defaultVersion = definition.defaultVersion;
        }
        if (definition.languageField) {
            translator.languageField = definition.languageField;
        }
        for (const [key, field] of Object.entries(fields)) {
            importers.set(key, field.importer);
            importerOrdering.set(key, field.importOrder || field.order || 0);
            exporters.set(key, field.exporter);
            exporterOrdering.set(key, field.exportOrder || field.order || 0);
        }
        if (definition.childrenExportOrder) {
            for (const [key, order] of Object.entries(definition.childrenExportOrder)) {
                exporterOrdering.set(key, order || 0);
            }
        }
        const optionalNamespaces = new Map();
        for (const [prefix, namespace] of Object.entries(definition.optionalNamespaces || {})) {
            optionalNamespaces.set(prefix, namespace);
        }
        translator.updateDefinition({
            contexts: new Map(),
            element: definition.element,
            exporterOrdering,
            exporters,
            importerOrdering,
            importers,
            namespace: definition.namespace,
            optionalNamespaces,
            type: definition.type,
            version: definition.version,
            typeOrder: definition.typeOrder
        });
        for (const link of aliases) {
            this.alias(definition.namespace, definition.element, link.path, link.multiple, link.selector, link.contextField, definition.type, link.impliedType);
        }
        for (const alias of aliases) {
            const existing = this.walkToTranslator(alias.path.split('.'));
            if (existing && existing !== translator) {
                existing.replaceWith(translator);
            }
        }
    }
    alias(namespace, element, path, multiple = false, selector, contextField, contextType, contextImpliedType = false) {
        const linkedTranslator = this.getOrCreateTranslator(namespace, element);
        linkedTranslator.placeholder = false;
        const keys = path.split('.').filter(key => {
            return key !== '';
        });
        const finalKey = keys.pop();
        const translator = this.walkToTranslator(keys, true);
        const xid = `{${namespace}}${element}`;
        if (contextType && (contextField || contextImpliedType)) {
            linkedTranslator.addContext(path, selector, contextField, xid, contextType, contextImpliedType);
        }
        translator.addChild(finalKey, linkedTranslator, multiple, selector, xid);
    }
    walkToTranslator(path, vivify = false) {
        let translator = this.root;
        for (const key of path) {
            let next = translator.getChild(key);
            if (!next) {
                if (vivify) {
                    next = new Translator_1.default();
                    next.placeholder = true;
                    translator.addChild(key, next);
                }
                else {
                    return;
                }
            }
            translator = next;
        }
        return translator;
    }
    hasTranslator(namespace, element) {
        return this.translators.has(`{${namespace}}${element}`);
    }
    getOrCreateTranslator(namespace, element) {
        let translator = this.translators.get(`{${namespace}}${element}`);
        if (!translator) {
            translator = new Translator_1.default();
            this.indexTranslator(namespace, element, translator);
        }
        return translator;
    }
    indexTranslator(namespace, element, translator) {
        this.translators.set(`{${namespace}}${element}`, translator);
    }
}
exports.default = Registry;
