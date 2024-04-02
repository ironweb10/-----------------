"use strict";
// ====================================================================
// XEP-0191: Blocking Command
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0191.html
// Version: 1.3 (2015-03-12)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendStanzaError({
        blocked: jxt_1.childBoolean(Namespaces_1.NS_BLOCKING_ERRORS, 'blocked')
    }),
    {
        element: 'blocklist',
        fields: {
            jids: jxt_1.multipleChildAttribute(null, 'item', 'jid')
        },
        namespace: Namespaces_1.NS_BLOCKING,
        path: 'iq.blockList',
        type: 'list',
        typeField: 'action'
    },
    {
        element: 'block',
        fields: {
            jids: jxt_1.multipleChildAttribute(null, 'item', 'jid')
        },
        namespace: Namespaces_1.NS_BLOCKING,
        path: 'iq.blockList',
        type: 'block',
        typeField: 'action'
    },
    {
        element: 'unblock',
        fields: {
            jids: jxt_1.multipleChildAttribute(null, 'item', 'jid')
        },
        namespace: Namespaces_1.NS_BLOCKING,
        path: 'iq.blockList',
        type: 'unblock',
        typeField: 'action'
    }
];
exports.default = Protocol;
