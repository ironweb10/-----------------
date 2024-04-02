"use strict";
// ====================================================================
// XEP-0059: Result Set Management
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0059.html
// Version: 1.0.0 (2006-09-20)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: ['iq.pubsub.paging'],
    element: 'set',
    fields: {
        after: jxt_1.childText(null, 'after'),
        before: jxt_1.childText(null, 'before'),
        count: jxt_1.childInteger(null, 'count'),
        first: jxt_1.childText(null, 'first'),
        firstIndex: jxt_1.childIntegerAttribute(null, 'first', 'index'),
        index: jxt_1.childInteger(null, 'index'),
        last: jxt_1.childText(null, 'last'),
        max: jxt_1.childInteger(null, 'max')
    },
    namespace: Namespaces_1.NS_RSM,
    path: 'paging'
};
exports.default = Protocol;
