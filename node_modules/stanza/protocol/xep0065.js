"use strict";
// ====================================================================
// XEP-0065: SOCKS5 Bytestreams
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0065.html
// Version: 1.8.1 (2015-09-17)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'query',
        fields: {
            activate: jxt_1.childText(null, 'activate'),
            address: jxt_1.attribute('dstaddr'),
            candidateUsed: jxt_1.childJIDAttribute(null, 'streamhost-used', 'jid'),
            mode: jxt_1.attribute('mode', 'tcp'),
            sid: jxt_1.attribute('sid'),
            udpSuccess: jxt_1.childAttribute(null, 'udpsuccess', 'dstaddr')
        },
        namespace: Namespaces_1.NS_SOCKS5,
        path: 'iq.socks5'
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.socks5.candidates'
            }
        ],
        element: 'streamhost',
        fields: {
            host: jxt_1.attribute('host'),
            jid: jxt_1.JIDAttribute('jid'),
            port: jxt_1.integerAttribute('port'),
            uri: jxt_1.attribute('uri')
        },
        namespace: Namespaces_1.NS_SOCKS5
    }
];
exports.default = Protocol;
