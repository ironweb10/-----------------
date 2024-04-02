"use strict";
// ====================================================================
// XEP-0380: Explicit Message Encryption
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0380.html
// Version: 0.2.0 (2018-01-25)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'encryption',
    fields: {
        id: jxt_1.attribute('namespace'),
        name: jxt_1.attribute('name')
    },
    namespace: Namespaces_1.NS_EME_0,
    path: 'message.encryptionMethod'
};
exports.default = Protocol;
