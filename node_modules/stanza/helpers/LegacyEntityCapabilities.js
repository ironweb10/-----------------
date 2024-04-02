"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generate = void 0;
const tslib_1 = require("tslib");
const Hashes = tslib_1.__importStar(require("stanza-shims"));
const Utils_1 = require("../Utils");
function escape(value) {
    return Buffer.from(value.replace(/</g, '&lt;'), 'utf-8');
}
function encodeIdentities(identities = []) {
    const result = [];
    const existing = new Set();
    for (const { category, type, lang, name } of identities) {
        const encoded = `${category}/${type}/${lang || ''}/${name || ''}`;
        if (existing.has(encoded)) {
            return null;
        }
        existing.add(encoded);
        result.push(escape(encoded));
    }
    result.sort(Utils_1.octetCompare);
    return result;
}
function encodeFeatures(features = []) {
    const result = [];
    const existing = new Set();
    for (const feature of features) {
        if (existing.has(feature)) {
            return null;
        }
        existing.add(feature);
        result.push(escape(feature));
    }
    result.sort(Utils_1.octetCompare);
    return result;
}
function encodeFields(fields = []) {
    const sortedFields = [];
    for (const field of fields) {
        if (field.name === 'FORM_TYPE') {
            continue;
        }
        if (field.rawValues) {
            sortedFields.push({
                name: escape(field.name),
                values: field.rawValues.map(val => escape(val)).sort(Utils_1.octetCompare)
            });
        }
        else if (Array.isArray(field.value)) {
            sortedFields.push({
                name: escape(field.name),
                values: field.value.map(val => escape(val)).sort(Utils_1.octetCompare)
            });
        }
        else if (field.value === true || field.value === false) {
            sortedFields.push({
                name: escape(field.name),
                values: [escape(field.value ? '1' : '0')]
            });
        }
        else {
            sortedFields.push({
                name: escape(field.name),
                values: [escape(field.value || '')]
            });
        }
    }
    sortedFields.sort((a, b) => Utils_1.octetCompare(a.name, b.name));
    const result = [];
    for (const field of sortedFields) {
        result.push(field.name);
        for (const value of field.values) {
            result.push(value);
        }
    }
    return result;
}
function encodeForms(extensions = []) {
    const forms = [];
    const types = new Set();
    for (const form of extensions) {
        let type;
        for (const field of form.fields || []) {
            if (!(field.name === 'FORM_TYPE' && field.type === 'hidden')) {
                continue;
            }
            if (field.rawValues && field.rawValues.length === 1) {
                type = escape(field.rawValues[0]);
                break;
            }
            if (field.value && typeof field.value === 'string') {
                type = escape(field.value);
                break;
            }
        }
        if (!type) {
            continue;
        }
        if (types.has(type.toString())) {
            return null;
        }
        types.add(type.toString());
        forms.push({ type, form });
    }
    forms.sort((a, b) => Utils_1.octetCompare(a.type, b.type));
    const results = [];
    for (const form of forms) {
        results.push(form.type);
        const fields = encodeFields(form.form.fields);
        for (const field of fields) {
            results.push(field);
        }
    }
    return results;
}
function generate(info, hashName) {
    const S = [];
    const separator = Buffer.from('<', 'utf8');
    const append = (b1) => {
        S.push(b1);
        S.push(separator);
    };
    const identities = encodeIdentities(info.identities);
    const features = encodeFeatures(info.features);
    const extensions = encodeForms(info.extensions);
    if (!identities || !features || !extensions) {
        return null;
    }
    for (const id of identities) {
        append(id);
    }
    for (const feature of features) {
        append(feature);
    }
    for (const form of extensions) {
        append(form);
    }
    return Hashes.createHash(hashName).update(Buffer.concat(S)).digest('base64');
}
exports.generate = generate;
function verify(info, hashName, check) {
    const computed = generate(info, hashName);
    return !!computed && computed === check;
}
exports.verify = verify;
