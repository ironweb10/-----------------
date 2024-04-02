"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Definitions_1 = require("./Definitions");
class XMLElement {
    constructor(name, attrs = {}, children = []) {
        this.name = name;
        this.attributes = attrs;
        this.children = [];
        this.optionalNamespaces = {};
        for (const child of children) {
            if (typeof child !== 'string') {
                const xmlChild = new XMLElement(child.name, child.attributes, child.children);
                xmlChild.parent = this;
                this.children.push(xmlChild);
            }
            else {
                this.children.push(child);
            }
        }
    }
    getName() {
        if (this.name.indexOf(':') >= 0) {
            return this.name.substr(this.name.indexOf(':') + 1);
        }
        else {
            return this.name;
        }
    }
    getNamespace() {
        if (this.name.indexOf(':') >= 0) {
            const prefix = this.name.substr(0, this.name.indexOf(':'));
            return this.findNamespaceForPrefix(prefix);
        }
        return this.findNamespaceForPrefix();
    }
    getNamespaceContext() {
        let namespaces = {};
        if (this.parent) {
            namespaces = this.parent.getNamespaceContext();
        }
        for (const [attr, value] of Object.entries(this.attributes)) {
            if (attr.startsWith('xmlns:')) {
                const prefix = attr.substr(6);
                namespaces[value] = prefix;
            }
        }
        return namespaces;
    }
    getDefaultNamespace() {
        if (this.attributes.xmlns) {
            return this.attributes.xmlns;
        }
        if (this.parent) {
            return this.parent.getDefaultNamespace();
        }
        return '';
    }
    getNamespaceRoot(namespace) {
        if (this.parent) {
            const parentRoot = this.parent.getNamespaceRoot(namespace);
            if (parentRoot) {
                return parentRoot;
            }
        }
        for (const [attr, value] of Object.entries(this.attributes)) {
            if (attr.startsWith('xmlns:') && value === namespace) {
                return this;
            }
        }
        if (this.optionalNamespaces[namespace]) {
            return this;
        }
        return undefined;
    }
    getAttribute(name, xmlns) {
        if (!xmlns) {
            return this.attributes[name];
        }
        const namespaces = this.getNamespaceContext();
        if (!namespaces[xmlns]) {
            return undefined;
        }
        return this.attributes[[namespaces[xmlns], name].join(':')];
    }
    getChild(name, xmlns) {
        return this.getChildren(name, xmlns)[0];
    }
    getChildren(name, xmlns) {
        const result = [];
        for (const child of this.children) {
            if (typeof child !== 'string' &&
                child.getName() === name &&
                (!xmlns || child.getNamespace() === xmlns)) {
                result.push(child);
            }
        }
        return result;
    }
    getText() {
        let text = '';
        for (const child of this.children) {
            if (typeof child === 'string') {
                text += child;
            }
        }
        return text;
    }
    appendChild(child) {
        this.children.push(child);
        if (typeof child !== 'string') {
            child.parent = this;
        }
        return child;
    }
    setAttribute(attr, val, force = false) {
        this.attributes[attr] = val || undefined;
        if (val === '' && force) {
            this.attributes[attr] = val;
        }
    }
    addOptionalNamespace(prefix, namespace) {
        this.optionalNamespaces[namespace] = prefix;
    }
    useNamespace(prefix, namespace) {
        if (this.optionalNamespaces[namespace]) {
            prefix = this.optionalNamespaces[namespace];
        }
        this.setAttribute(`xmlns:${prefix}`, namespace);
        return prefix;
    }
    toJSON() {
        const children = this.children
            .map(child => {
            if (typeof child === 'string') {
                return child;
            }
            if (child) {
                return child.toJSON();
            }
        })
            .filter(child => !!child);
        // Strip any undefined/null attributes
        const attrs = {};
        for (const [key, val] of Object.entries(this.attributes)) {
            if (val !== undefined && val !== null) {
                attrs[key] = val;
            }
        }
        return {
            attributes: attrs,
            children,
            name: this.name
        };
    }
    toString() {
        let output = this.openTag(true);
        if (this.children.length) {
            for (const child of this.children) {
                if (typeof child === 'string') {
                    output += Definitions_1.escapeXMLText(child);
                }
                else if (child) {
                    output += child.toString();
                }
            }
            output += this.closeTag();
        }
        return output;
    }
    openTag(allowSelfClose = false) {
        let output = '';
        output += `<${this.name}`;
        for (const [key, value] of Object.entries(this.attributes)) {
            if (value !== undefined) {
                output += ` ${key}="${Definitions_1.escapeXML(value.toString())}"`;
            }
        }
        if (allowSelfClose && this.children.length === 0) {
            output += '/>';
        }
        else {
            output += '>';
        }
        return output;
    }
    closeTag() {
        return `</${this.name}>`;
    }
    findNamespaceForPrefix(prefix) {
        if (!prefix) {
            if (this.attributes.xmlns) {
                return this.attributes.xmlns;
            }
            else if (this.parent) {
                return this.parent.findNamespaceForPrefix();
            }
        }
        else {
            const attr = 'xmlns:' + prefix;
            if (this.attributes[attr]) {
                return this.attributes[attr];
            }
            else if (this.parent) {
                return this.parent.findNamespaceForPrefix(prefix);
            }
        }
        return '';
    }
}
exports.default = XMLElement;
