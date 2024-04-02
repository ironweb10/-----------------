"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("./Types");
class Translator {
    constructor() {
        this.parents = new Set();
        this.placeholder = false;
        this.typeField = '';
        this.versionField = '';
        this.defaultType = '';
        this.defaultVersion = '';
        this.languageField = 'lang';
        this.typeValues = new Map();
        this.typeOrders = new Map();
        this.importers = new Map();
        this.exporters = new Map();
        this.children = new Map();
        this.childrenIndex = new Map();
        this.implicitChildren = new Set();
        this.contexts = new Map();
    }
    addChild(name, translator, multiple = false, selector, implicit) {
        const child = {
            multiple: multiple || false,
            name,
            selector,
            translator
        };
        const existingChild = this.children.get(name);
        if (!existingChild) {
            child.translator.parents.add(this);
            this.children.set(name, child);
            for (const [xid] of translator.importers) {
                if (!this.implicitChildren.has(xid)) {
                    this.childrenIndex.set(xid, name);
                }
            }
            if (implicit) {
                this.implicitChildren.add(implicit);
            }
            return;
        }
        const existing = existingChild.translator;
        existingChild.multiple = multiple;
        if (selector && existingChild.selector && selector !== existingChild.selector) {
            existingChild.selector = undefined;
        }
        for (const [xid, importer] of translator.importers) {
            const [type, version] = (existing.typeValues.get(xid) || '').split('__v__');
            existing.updateDefinition({
                contexts: translator.contexts,
                element: importer.element,
                exporterOrdering: new Map(),
                exporters: new Map(),
                importerOrdering: importer.fieldOrders,
                importers: importer.fields,
                namespace: importer.namespace,
                optionalNamespaces: new Map(),
                type,
                version
            });
            if (!this.implicitChildren.has(xid)) {
                this.childrenIndex.set(xid, name);
            }
        }
        for (const [exportType, exporter] of translator.exporters) {
            const [type, version] = exportType.split('__v__');
            existing.updateDefinition({
                contexts: translator.contexts,
                element: exporter.element,
                exporterOrdering: exporter.fieldOrders,
                exporters: exporter.fields,
                importerOrdering: new Map(),
                importers: new Map(),
                namespace: exporter.namespace,
                optionalNamespaces: exporter.optionalNamespaces,
                type,
                version
            });
        }
    }
    addContext(path, selector, field, xid, value, implied) {
        if (selector) {
            path = `${path}[${selector}]`;
        }
        let context = this.contexts.get(path);
        if (!context) {
            context = {
                typeField: '',
                versionField: '',
                typeValues: new Map()
            };
        }
        if (implied) {
            context.impliedType = value;
        }
        context.typeField = field || '';
        context.typeValues.set(xid, value);
        this.contexts.set(path, context);
    }
    getChild(name) {
        const child = this.children.get(name);
        if (!child) {
            return;
        }
        return child.translator;
    }
    getImportKey(xml) {
        return this.childrenIndex.get(`{${xml.getNamespace()}}${xml.getName()}`);
    }
    updateDefinition(opts) {
        const xid = `{${opts.namespace}}${opts.element}`;
        const type = opts.type || this.defaultType;
        const version = opts.version || this.defaultVersion;
        const versionType = version ? `${type}__v__${version}` : type;
        const importer = this.importers.get(xid) ||
            {
                element: opts.element,
                fieldOrders: new Map(),
                fields: new Map(),
                namespace: opts.namespace
            };
        for (const [fieldName, fieldImporter] of opts.importers) {
            importer.fields.set(fieldName, fieldImporter);
        }
        for (const [fieldName, order] of opts.importerOrdering) {
            importer.fieldOrders.set(fieldName, order);
        }
        this.importers.set(xid, importer);
        const exporter = this.exporters.get(versionType) ||
            {
                element: opts.element,
                fieldOrders: new Map(),
                fields: new Map(),
                namespace: opts.namespace,
                optionalNamespaces: opts.optionalNamespaces
            };
        for (const [fieldName, fieldExporter] of opts.exporters) {
            exporter.fields.set(fieldName, fieldExporter);
        }
        for (const [name, order] of opts.exporterOrdering) {
            exporter.fieldOrders.set(name, order);
        }
        for (const [prefix, namespace] of opts.optionalNamespaces) {
            exporter.optionalNamespaces.set(prefix, namespace);
        }
        this.exporters.set(versionType, exporter);
        for (const [path, newContext] of opts.contexts) {
            const context = this.contexts.get(path) || {
                impliedType: undefined,
                typeField: newContext.typeField,
                versionField: newContext.versionField,
                typeValues: new Map()
            };
            if (!context.typeField) {
                context.typeField = newContext.typeField;
            }
            if (!context.versionField) {
                context.versionField = newContext.versionField;
            }
            if (!context.impliedType) {
                context.impliedType = newContext.impliedType;
            }
            for (const [xid2, type] of newContext.typeValues) {
                context.typeValues.set(xid2, type);
            }
            this.contexts.set(path, context);
        }
        if (opts.type) {
            this.typeValues.set(xid, versionType);
            if (opts.typeOrder && opts.type) {
                this.typeOrders.set(opts.type, opts.typeOrder);
            }
        }
        else if (this.typeField && !opts.type) {
            for (const [, imp] of this.importers) {
                for (const [fieldName, fieldImporter] of opts.importers) {
                    imp.fields.set(fieldName, fieldImporter);
                }
                for (const [fieldName, order] of opts.importerOrdering) {
                    imp.fieldOrders.set(fieldName, order);
                }
            }
            for (const [, exp] of this.exporters) {
                for (const [fieldName, fieldExporter] of opts.exporters) {
                    exp.fields.set(fieldName, fieldExporter);
                }
                for (const [fieldName, order] of opts.exporterOrdering) {
                    exp.fieldOrders.set(fieldName, order);
                }
            }
        }
    }
    replaceWith(replacement) {
        for (const [a, b] of this.children) {
            replacement.children.set(a, b);
        }
        for (const [a, b] of this.childrenIndex) {
            replacement.childrenIndex.set(a, b);
        }
        for (const [a, b] of this.contexts) {
            replacement.contexts.set(a, b);
        }
        for (const a of this.implicitChildren) {
            replacement.implicitChildren.add(a);
        }
        for (const parent of this.parents) {
            for (const child of parent.children.values()) {
                if (child.translator === this) {
                    child.translator = replacement;
                }
            }
        }
        this.parents = new Set();
    }
    import(xml, parentContext) {
        const xid = `{${xml.getNamespace()}}${xml.getName()}`;
        const output = {};
        const importer = this.importers.get(xid);
        if (!importer) {
            return;
        }
        const versionTypeValue = this.typeValues.get(xid) || '';
        const [typeValue, versionValue] = versionTypeValue.split('__v__');
        const path = parentContext.path || '';
        let implied;
        if (parentContext.pathSelector) {
            implied = this.contexts.get(`${path}[${parentContext.pathSelector}]`);
        }
        if (!implied) {
            implied = this.contexts.get(path);
        }
        if (implied) {
            if (!implied.impliedType) {
                const impliedTypeValue = implied.typeValues.get(xid) || '';
                if (impliedTypeValue) {
                    output[implied.typeField] = impliedTypeValue;
                }
            }
        }
        else if (this.typeField && typeValue && typeValue !== this.defaultType) {
            output[this.typeField] = typeValue;
        }
        if (this.versionField && versionValue && versionValue !== this.defaultVersion) {
            output[this.versionField] = versionValue;
        }
        const context = {
            ...parentContext,
            data: output,
            importer,
            lang: (xml.getAttribute('xml:lang') || parentContext.lang || '').toLowerCase(),
            pathSelector: typeValue,
            translator: this
        };
        const importFields = [...importer.fieldOrders.entries()].sort((a, b) => a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0);
        const preChildren = importFields.filter(field => field[1] >= 0);
        const postChildren = importFields.filter(field => field[1] < 0);
        for (const [fieldName] of preChildren) {
            const importField = importer.fields.get(fieldName);
            context.path = `${parentContext.path}.${fieldName}`;
            const value = importField(xml, context);
            if (value !== null && value !== undefined) {
                output[fieldName] = value;
            }
        }
        for (const child of xml.children) {
            if (typeof child === 'string') {
                continue;
            }
            const childName = `{${child.getNamespace()}}${child.getName()}`;
            const fieldName = this.childrenIndex.get(childName);
            if (!fieldName) {
                continue;
            }
            context.path = `${parentContext.path}.${fieldName}`;
            const { translator, multiple, selector } = this.children.get(fieldName);
            if (!selector || selector === typeValue) {
                const childOutput = translator.import(child, context);
                if (childOutput !== undefined) {
                    if (multiple) {
                        if (!output[fieldName]) {
                            output[fieldName] = [];
                        }
                        output[fieldName].push(childOutput);
                    }
                    else if (!output[fieldName]) {
                        output[fieldName] = childOutput;
                    }
                    else {
                        output[fieldName] = translator.resolveCollision(output[fieldName], childOutput);
                    }
                }
            }
        }
        for (const [fieldName] of postChildren) {
            const importField = importer.fields.get(fieldName);
            context.path = `${parentContext.path}.${fieldName}`;
            const value = importField(xml, context);
            if (value !== null && value !== undefined) {
                output[fieldName] = value;
            }
        }
        return output;
    }
    export(data, parentContext) {
        if (!data) {
            return;
        }
        let exportType = this.defaultType;
        let exportVersion = this.defaultVersion;
        const path = parentContext.path || '';
        let implied;
        if (parentContext.pathSelector) {
            implied = this.contexts.get(`${path}[${parentContext.pathSelector}]`);
        }
        if (!implied) {
            implied = this.contexts.get(path);
        }
        if (implied) {
            exportType = implied.impliedType || data[implied.typeField] || this.defaultType;
        }
        else if (this.typeField) {
            exportType = data[this.typeField] || this.defaultType;
        }
        if (this.versionField) {
            exportVersion = data[this.versionField] || this.defaultVersion;
        }
        const exportVersionType = exportVersion ? `${exportType}__v__${exportVersion}` : exportType;
        const exporter = this.exporters.get(exportVersionType);
        if (!exporter) {
            return;
        }
        const output = Types_1.createElement(exporter.namespace, exporter.element, parentContext.namespace, parentContext.element);
        if (parentContext.element) {
            output.parent = parentContext.element;
        }
        for (const [prefix, namespace] of exporter.optionalNamespaces) {
            output.addOptionalNamespace(prefix, namespace);
        }
        const context = {
            ...parentContext,
            data,
            element: output,
            exporter,
            lang: (data[this.languageField] || parentContext.lang || '').toLowerCase(),
            namespace: output.getDefaultNamespace(),
            pathSelector: exportType,
            translator: this
        };
        const langExporter = exporter.fields.get(this.languageField);
        if (langExporter) {
            langExporter(output, data[this.languageField], parentContext);
        }
        const keys = Object.keys(data);
        keys.sort((key1, key2) => {
            const a = exporter.fieldOrders.get(key1) || 100000;
            const b = exporter.fieldOrders.get(key2) || 100000;
            return a - b;
        });
        for (const key of keys) {
            if (key === this.languageField) {
                // We've already processed this field
                continue;
            }
            const value = data[key];
            const fieldExporter = exporter.fields.get(key);
            if (fieldExporter) {
                fieldExporter(output, value, context);
                continue;
            }
            const childTranslator = this.children.get(key);
            if (!childTranslator) {
                continue;
            }
            context.path = `${parentContext.path ? parentContext.path + '.' : ''}${key}`;
            const { translator, multiple, selector } = childTranslator;
            if (!selector || selector === exportType) {
                let items;
                if (multiple) {
                    items = value !== null && value !== void 0 ? value : [];
                }
                else {
                    items = [value];
                }
                for (const item of items) {
                    const childOutput = translator.export(item, context);
                    if (childOutput) {
                        output.appendChild(childOutput);
                    }
                }
            }
        }
        return output;
    }
    resolveCollision(existingData, newData) {
        const existingOrder = this.typeOrders.get(existingData[this.typeField] || this.defaultType) || 0;
        const newOrder = this.typeOrders.get(newData[this.typeField] || this.defaultType) || 0;
        return existingOrder <= newOrder ? existingData : newData;
    }
}
exports.default = Translator;
