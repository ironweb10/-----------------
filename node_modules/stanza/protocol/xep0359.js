"use strict";
// ====================================================================
// XEP-0359: Unique and Stable Stanza IDs
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0359.html
// Version: 0.5.0 (2017-08-23)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        originId: jxt_1.childAttribute(Namespaces_1.NS_SID_0, 'origin-id', 'id')
    }),
    {
        aliases: [{ path: 'message.stanzaIds', multiple: true }],
        element: 'stanza-id',
        fields: {
            by: jxt_1.JIDAttribute('by'),
            id: jxt_1.attribute('id')
        },
        namespace: Namespaces_1.NS_SID_0
    }
];
exports.default = Protocol;
