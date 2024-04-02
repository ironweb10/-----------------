"use strict";
// ====================================================================
// XEP-0048: Bookmarks
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0048.html
// Version: 1.1 (2007-11-07)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: [
            { path: 'bookmarkStorage', impliedType: true },
            { path: 'iq.privateStorage.bookmarks', impliedType: true },
            ...jxt_1.pubsubItemContentAliases()
        ],
        element: 'storage',
        namespace: Namespaces_1.NS_BOOKMARKS,
        type: Namespaces_1.NS_BOOKMARKS,
        typeField: 'itemType'
    },
    {
        aliases: [{ path: 'bookmarkStorage.rooms', multiple: true }],
        element: 'conference',
        fields: {
            autoJoin: jxt_1.booleanAttribute('autojoin'),
            jid: jxt_1.JIDAttribute('jid'),
            name: jxt_1.attribute('name'),
            nick: jxt_1.childText(null, 'nick'),
            password: jxt_1.childText(null, 'password')
        },
        namespace: Namespaces_1.NS_BOOKMARKS
    }
];
exports.default = Protocol;
