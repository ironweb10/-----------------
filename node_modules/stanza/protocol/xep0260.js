"use strict";
// ====================================================================
// XEP-0260: Jingle SOCKS5 Bytestreams Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0260.html
// Version: 1.0.1 (2016-05-17)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'transport',
        fields: {
            activated: jxt_1.childAttribute(null, 'activated', 'cid'),
            address: jxt_1.attribute('dstaddr'),
            candidateError: jxt_1.childBoolean(null, 'candidate-error'),
            candidateUsed: jxt_1.childAttribute(null, 'candidate-used', 'cid'),
            mode: jxt_1.attribute('mode', 'tcp'),
            proxyError: jxt_1.childBoolean(null, 'proxy-error'),
            sid: jxt_1.attribute('sid')
        },
        namespace: Namespaces_1.NS_JINGLE_SOCKS5_1,
        path: 'iq.jingle.contents.transport',
        type: Namespaces_1.NS_JINGLE_SOCKS5_1,
        typeField: 'transportType'
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.transport.candidates',
                selector: Namespaces_1.NS_JINGLE_SOCKS5_1
            }
        ],
        element: 'candidate',
        fields: {
            cid: jxt_1.attribute('cid'),
            host: jxt_1.attribute('host'),
            jid: jxt_1.JIDAttribute('jid'),
            port: jxt_1.integerAttribute('port'),
            priority: jxt_1.integerAttribute('priority'),
            type: jxt_1.attribute('type'),
            uri: jxt_1.attribute('uri')
        },
        namespace: Namespaces_1.NS_JINGLE_SOCKS5_1
    }
];
exports.default = Protocol;
