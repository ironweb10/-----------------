"use strict";
// ====================================================================
// RFC 3921: Extensible Messaging and Presence Protocol (XMPP): Core
// --------------------------------------------------------------------
// Source: https://tools.ietf.org/html/rfc3921
//
// Additional:
// --------------------------------------------------------------------
// draft-cridland-xmpp-session-01: Here Lies Extensible Messaging and
//      Presence Protocol (XMPP) Session Establishment
// -------------------------------------------------------------------
// Source: https://tools.ietf.org/html/draft-cridland-xmpp-session-01
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: ['features.legacySession', 'iq.legacySession'],
    element: 'session',
    fields: {
        // draft-cridland-xmpp-session-01
        //
        // The <optional /> child is not yet standardized, but is
        // still widely deployed to reduce client start times.
        optional: jxt_1.childBoolean(null, 'optional')
    },
    namespace: Namespaces_1.NS_SESSION
};
exports.default = Protocol;
