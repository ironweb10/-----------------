"use strict";
// ====================================================================
// XEP-0115: Entity Capabilities
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0115.html
// Version: 1.5.1 (2016-10-06)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [
        { path: 'presence.legacyCapabilities', multiple: true },
        { path: 'features.legacyCapabilities', multiple: true }
    ],
    element: 'c',
    fields: {
        algorithm: jxt_1.attribute('hash'),
        legacy: jxt_1.staticValue(true),
        node: jxt_1.attribute('node'),
        value: jxt_1.attribute('ver')
    },
    namespace: Namespaces_1.NS_DISCO_LEGACY_CAPS
};
exports.default = Protocol;
