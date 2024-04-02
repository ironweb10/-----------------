"use strict";
// ====================================================================
// XEP-0144: Roster Item Exchange
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0144.html
// Version: 1.1.1 (2017-11-28)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        rosterExchange: jxt_1.splicePath(Namespaces_1.NS_ROSTER_EXCHANGE, 'x', 'rosterExchange', true)
    }),
    jxt_1.extendIQ({
        rosterExchange: jxt_1.splicePath(Namespaces_1.NS_ROSTER_EXCHANGE, 'x', 'rosterExchange', true)
    }),
    {
        element: 'item',
        fields: {
            action: jxt_1.attribute('action'),
            groups: jxt_1.multipleChildText(null, 'group'),
            jid: jxt_1.JIDAttribute('jid'),
            name: jxt_1.attribute('name')
        },
        namespace: Namespaces_1.NS_ROSTER_EXCHANGE,
        path: 'rosterExchange'
    }
];
exports.default = Protocol;
