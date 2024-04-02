"use strict";
// ====================================================================
// XEP-0172: User Nickname
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0172.html
// Version: 1.1 (2012-03-21)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        nick: jxt_1.childText(Namespaces_1.NS_NICK, 'nick')
    }),
    jxt_1.extendPresence({
        nick: jxt_1.childText(Namespaces_1.NS_NICK, 'nick')
    }),
    {
        aliases: jxt_1.pubsubItemContentAliases(),
        element: 'nick',
        fields: {
            nick: jxt_1.text()
        },
        namespace: Namespaces_1.NS_NICK,
        type: Namespaces_1.NS_NICK
    }
];
exports.default = Protocol;
