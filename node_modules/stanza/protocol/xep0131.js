"use strict";
// ====================================================================
// XEP-0131: Stanza Headers and Internet Metadata
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0131.html
// Version: 1.2 (2006-07-12)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        headers: jxt_1.splicePath(Namespaces_1.NS_SHIM, 'headers', 'header', true)
    }),
    jxt_1.extendPresence({
        headers: jxt_1.splicePath(Namespaces_1.NS_SHIM, 'headers', 'header', true)
    }),
    {
        element: 'header',
        fields: {
            name: jxt_1.attribute('name'),
            value: jxt_1.text()
        },
        namespace: Namespaces_1.NS_SHIM,
        path: 'header'
    }
];
exports.default = Protocol;
