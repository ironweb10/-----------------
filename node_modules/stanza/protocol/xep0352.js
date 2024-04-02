"use strict";
// ====================================================================
// XEP-0352: Client State Indication
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0352.html
// Version: 0.2.1 (2017-02-18)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'active',
        namespace: Namespaces_1.NS_CSI_0,
        path: 'csi',
        type: 'active',
        typeField: 'state'
    },
    {
        element: 'inactive',
        namespace: Namespaces_1.NS_CSI_0,
        path: 'csi',
        type: 'inactive',
        typeField: 'state'
    }
];
exports.default = Protocol;
