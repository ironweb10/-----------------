"use strict";
// ====================================================================
// XEP-0186: Invisible Command
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0186.html
// Version: 0.13 (2017-11-29)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'invisible',
        fields: {
            probe: jxt_1.booleanAttribute('probe')
        },
        namespace: Namespaces_1.NS_INVISIBLE_0,
        path: 'iq.visibility',
        type: 'invisible',
        typeField: 'type'
    },
    {
        element: 'visible',
        namespace: Namespaces_1.NS_INVISIBLE_0,
        path: 'iq.visibility',
        type: 'visible'
    }
];
exports.default = Protocol;
