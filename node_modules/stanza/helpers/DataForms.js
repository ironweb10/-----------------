"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeFields = void 0;
function mergeFields(original, updated) {
    const merged = [];
    const mappedUpdates = new Map();
    for (const field of updated) {
        if (field.name) {
            mappedUpdates.set(field.name, field);
        }
    }
    const usedUpdates = new Set();
    // Update any existing fields with new values.
    for (const field of original) {
        if (field.name && mappedUpdates.has(field.name)) {
            merged.push({
                ...field,
                ...mappedUpdates.get(field.name)
            });
            usedUpdates.add(field.name);
        }
        else {
            merged.push({ ...field });
        }
    }
    // Append any brand new fields to the list
    for (const field of updated) {
        if (!field.name || (field.name && !usedUpdates.has(field.name))) {
            merged.push({ ...field });
        }
    }
    return merged;
}
exports.mergeFields = mergeFields;
