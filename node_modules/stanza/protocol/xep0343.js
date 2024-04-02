"use strict";
// ====================================================================
// XEP-0343: Signaling WebRTC datachannels in Jingle
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0343.html
// Version: 0.3 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [
        {
            path: 'iq.jingle.contents.transport.sctp',
            selector: Namespaces_1.NS_JINGLE_ICE_UDP_1
        },
        {
            path: 'iq.jingle.contents.transport.sctp',
            selector: Namespaces_1.NS_JINGLE_ICE_0
        }
    ],
    element: 'sctpmap',
    fields: {
        port: jxt_1.integerAttribute('number'),
        protocol: jxt_1.attribute('protocol'),
        streams: jxt_1.attribute('streams')
    },
    namespace: Namespaces_1.NS_JINGLE_DTLS_SCTP_1
};
exports.default = Protocol;
