"use strict";
// ====================================================================
// XEP-0317: Hats
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0317.html
// Version: 0.1 (2013-01-03)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendPresence({
        hats: jxt_1.splicePath(Namespaces_1.NS_HATS_0, 'hats', 'hat', true)
    }),
    {
        element: 'hat',
        fields: {
            id: jxt_1.attribute('name'),
            name: jxt_1.attribute('displayName')
        },
        namespace: Namespaces_1.NS_HATS_0,
        path: 'hat'
    }
];
exports.default = Protocol;
