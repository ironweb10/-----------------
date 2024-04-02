"use strict";
// ====================================================================
// XEP-0184: Message Delivery Receipts
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0184.html
// Version: 1.2 (2011-03-01)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'request',
        namespace: Namespaces_1.NS_RECEIPTS,
        path: 'message.receipt',
        type: 'request',
        typeField: 'type'
    },
    {
        element: 'received',
        fields: {
            id: jxt_1.attribute('id')
        },
        namespace: Namespaces_1.NS_RECEIPTS,
        path: 'message.receipt',
        type: 'received',
        typeField: 'type'
    }
];
exports.default = Protocol;
