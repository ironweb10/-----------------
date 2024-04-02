"use strict";
// ====================================================================
// XEP-0066: Out of Band Data
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0066.html
// Version: 1.5 (2006-08-16)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: [{ multiple: true, path: 'message.links' }],
        element: 'x',
        fields: {
            description: jxt_1.childText(null, 'desc'),
            url: jxt_1.childText(null, 'url')
        },
        namespace: Namespaces_1.NS_OOB
    },
    {
        element: 'query',
        fields: {
            description: jxt_1.childText(null, 'desc'),
            url: jxt_1.childText(null, 'url')
        },
        namespace: Namespaces_1.NS_OOB_TRANSFER,
        path: 'iq.transferLink'
    }
];
exports.default = Protocol;
