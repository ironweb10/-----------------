"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsubItemContentAliases = exports.extendStanzaError = exports.extendStreamFeatures = exports.extendIQ = exports.extendPresence = exports.extendMessage = exports.addAlias = exports.childJID = exports.childJIDAttribute = exports.JIDAttribute = void 0;
const Namespaces_1 = require("../Namespaces");
const Types_1 = require("./Types");
// ====================================================================
// Useful XMPP Aliases
// ====================================================================
exports.JIDAttribute = Types_1.attribute;
exports.childJIDAttribute = Types_1.childAttribute;
exports.childJID = Types_1.childText;
// ====================================================================
// XMPP Definition Shortcuts
// ====================================================================
function addAlias(namespace, element, aliases) {
    return {
        aliases: Array.isArray(aliases) ? aliases : [aliases],
        element,
        fields: {},
        namespace
    };
}
exports.addAlias = addAlias;
function extendMessage(fields) {
    return { element: 'message', fields, namespace: Namespaces_1.NS_CLIENT };
}
exports.extendMessage = extendMessage;
function extendPresence(fields) {
    return { element: 'presence', fields, namespace: Namespaces_1.NS_CLIENT };
}
exports.extendPresence = extendPresence;
function extendIQ(fields) {
    return { element: 'iq', fields, namespace: Namespaces_1.NS_CLIENT };
}
exports.extendIQ = extendIQ;
function extendStreamFeatures(fields) {
    return {
        element: 'features',
        fields,
        namespace: Namespaces_1.NS_STREAM
    };
}
exports.extendStreamFeatures = extendStreamFeatures;
function extendStanzaError(fields) {
    return {
        element: 'error',
        fields,
        namespace: Namespaces_1.NS_STANZAS,
        path: 'stanzaError'
    };
}
exports.extendStanzaError = extendStanzaError;
function pubsubItemContentAliases() {
    return [
        { path: 'pubsubcontent', contextField: 'itemType' },
        { path: 'pubsubitem.content', contextField: 'itemType' },
        { path: 'pubsubeventitem.content', contextField: 'itemType' },
        { path: 'iq.pubsub.publish.items', contextField: 'itemType' }
    ];
}
exports.pubsubItemContentAliases = pubsubItemContentAliases;
