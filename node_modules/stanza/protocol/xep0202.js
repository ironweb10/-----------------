"use strict";
// ====================================================================
// XEP-0202: Entity Time
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0202.html
// Version: 2.0 (2009-09-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'time',
    fields: {
        tzo: jxt_1.childTimezoneOffset(null, 'tzo'),
        utc: jxt_1.childDate(null, 'utc')
    },
    namespace: Namespaces_1.NS_TIME,
    path: 'iq.time'
};
exports.default = Protocol;
