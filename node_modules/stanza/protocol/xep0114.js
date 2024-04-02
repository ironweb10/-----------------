"use strict";
// ====================================================================
// XEP-0114: Jabber Component Protocol
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0114.html
// Version: 1.6 (2012-01-25)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'handshake',
    fields: {
        value: jxt_1.textBuffer('hex')
    },
    namespace: Namespaces_1.NS_COMPONENT,
    path: 'handshake'
};
exports.default = Protocol;
