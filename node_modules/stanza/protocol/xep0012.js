"use strict";
// ====================================================================
// XEP-0012: Last Activity
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0012.html
// Version: 2.0 (2008-11-26)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0256: Last Activity in Presence
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0256.html
// Version: 1.1 (2009-09-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: ['presence.legacyLastActivity', 'iq.lastActivity'],
        element: 'query',
        fields: {
            seconds: jxt_1.integerAttribute('seconds'),
            status: jxt_1.text()
        },
        namespace: Namespaces_1.NS_LAST_ACTIVITY
    }
];
exports.default = Protocol;
