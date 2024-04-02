"use strict";
// ====================================================================
// XEP-0333: Chat Markers
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0333.html
// Version: 0.3.0 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const path = 'message.marker';
const Protocol = [
    {
        element: 'markable',
        namespace: Namespaces_1.NS_CHAT_MARKERS_0,
        path,
        type: 'markable',
        typeField: 'type'
    },
    {
        element: 'received',
        fields: {
            id: jxt_1.attribute('id')
        },
        namespace: Namespaces_1.NS_CHAT_MARKERS_0,
        path,
        type: 'received'
    },
    {
        element: 'displayed',
        fields: {
            id: jxt_1.attribute('id')
        },
        namespace: Namespaces_1.NS_CHAT_MARKERS_0,
        path,
        type: 'displayed'
    },
    {
        element: 'acknowledged',
        fields: {
            id: jxt_1.attribute('id')
        },
        namespace: Namespaces_1.NS_CHAT_MARKERS_0,
        path,
        type: 'acknowledged'
    }
];
exports.default = Protocol;
