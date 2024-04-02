"use strict";
// ====================================================================
// XEP-0055: Jabber Search
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0055.html
// Version: 1.3 (2009-09-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', ['iq.search.form']),
    jxt_1.addAlias(Namespaces_1.NS_RSM, 'set', ['iq.search.paging']),
    {
        element: 'query',
        fields: {
            email: jxt_1.childText(null, 'email'),
            familyName: jxt_1.childText(null, 'last'),
            givenName: jxt_1.childText(null, 'first'),
            instructions: jxt_1.childText(null, 'instructions'),
            nick: jxt_1.childText(null, 'nick')
        },
        namespace: Namespaces_1.NS_SEARCH,
        path: 'iq.search'
    },
    {
        aliases: [{ path: 'iq.search.items', multiple: true }],
        element: 'item',
        fields: {
            email: jxt_1.childText(null, 'email'),
            familyName: jxt_1.childText(null, 'last'),
            givenName: jxt_1.childText(null, 'first'),
            jid: jxt_1.JIDAttribute('jid'),
            nick: jxt_1.childText(null, 'nick')
        },
        namespace: Namespaces_1.NS_SEARCH
    }
];
exports.default = Protocol;
