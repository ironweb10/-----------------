"use strict";
// ====================================================================
// XEP-0203: Delayed Delivery
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0203.html
// Version: 2.0 (2009-09-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: ['message.delay', 'presence.delay'],
    element: 'delay',
    fields: {
        from: jxt_1.JIDAttribute('from'),
        reason: jxt_1.text(),
        timestamp: jxt_1.dateAttribute('stamp')
    },
    namespace: Namespaces_1.NS_DELAY
};
exports.default = Protocol;
