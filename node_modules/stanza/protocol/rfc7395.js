"use strict";
// ====================================================================
// RFC 7395: An Extensible Messaging and Presence Protocol (XMPP)
//      Subprotocol for WebSocket
// --------------------------------------------------------------------
// Source: https://tools.ietf.org/html/rfc7395
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'open',
        fields: {
            from: jxt_1.attribute('from'),
            id: jxt_1.attribute('id'),
            lang: jxt_1.languageAttribute(),
            to: jxt_1.attribute('to'),
            version: jxt_1.attribute('version')
        },
        namespace: Namespaces_1.NS_FRAMING,
        path: 'stream',
        type: 'open'
    },
    {
        element: 'close',
        fields: {
            seeOtherURI: jxt_1.attribute('see-other-uri')
        },
        namespace: Namespaces_1.NS_FRAMING,
        path: 'stream',
        type: 'close'
    }
];
exports.default = Protocol;
