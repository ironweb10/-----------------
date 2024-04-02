"use strict";
// ====================================================================
// XEP-0231: Bits of Binary
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0231.html
// Version: Version 1.0 (2008-09-03)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [
        'iq.bits',
        { path: 'message.bits', multiple: true },
        { path: 'presence.bits', multiple: true },
        { path: 'iq.jingle.bits', multiple: true }
    ],
    element: 'data',
    fields: {
        cid: jxt_1.attribute('cid'),
        data: jxt_1.textBuffer('base64'),
        maxAge: jxt_1.integerAttribute('max-age'),
        mediaType: jxt_1.attribute('type')
    },
    namespace: Namespaces_1.NS_BOB
};
exports.default = Protocol;
