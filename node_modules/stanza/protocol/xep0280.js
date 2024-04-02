"use strict";
// ====================================================================
// XEP-0280: Message Carbons
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0280.html
// Version: 0.12.0 (2017-02-16)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.addAlias(Namespaces_1.NS_FORWARD_0, 'forwarded', ['message.carbon.forward']),
    {
        element: 'enable',
        namespace: Namespaces_1.NS_CARBONS_2,
        path: 'iq.carbons',
        type: 'enable',
        typeField: 'action'
    },
    {
        element: 'disable',
        namespace: Namespaces_1.NS_CARBONS_2,
        path: 'iq.carbons',
        type: 'disable',
        typeField: 'action'
    },
    {
        element: 'sent',
        namespace: Namespaces_1.NS_CARBONS_2,
        path: 'message.carbon',
        type: 'sent',
        typeField: 'type'
    },
    {
        element: 'received',
        namespace: Namespaces_1.NS_CARBONS_2,
        path: 'message.carbon',
        type: 'received',
        typeField: 'type'
    }
];
exports.default = Protocol;
