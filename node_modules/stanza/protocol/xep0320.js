"use strict";
// ====================================================================
// XEP-0320: Use of DTLS-SRTP in Jingle Sessions
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0320.html
// Version: 0.3.1 (2015-10-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [
        {
            multiple: true,
            path: 'iq.jingle.contents.transport.fingerprints',
            selector: Namespaces_1.NS_JINGLE_ICE_UDP_1
        },
        {
            multiple: true,
            path: 'iq.jingle.contents.transport.fingerprints',
            selector: Namespaces_1.NS_JINGLE_ICE_0
        },
        {
            multiple: true,
            path: 'iq.jingle.contents.application.encryption.dtls',
            selector: Namespaces_1.NS_JINGLE_RTP_1
        }
    ],
    element: 'fingerprint',
    fields: {
        algorithm: jxt_1.attribute('hash'),
        setup: jxt_1.attribute('setup'),
        value: jxt_1.text()
    },
    namespace: Namespaces_1.NS_JINGLE_DTLS_0
};
exports.default = Protocol;
