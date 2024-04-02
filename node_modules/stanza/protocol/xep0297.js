"use strict";
// ====================================================================
// XEP-0297: Stanza Forwarding
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0297.html
// Version: 1.0 (2013-10-02)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Constants_1 = require("../Constants");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    ...Object.values(Constants_1.StreamType).map(streamNS => jxt_1.addAlias(streamNS, 'message', ['forward.message'])),
    ...Object.values(Constants_1.StreamType).map(streamNS => jxt_1.addAlias(streamNS, 'presence', ['forward.presence'])),
    ...Object.values(Constants_1.StreamType).map(streamNS => jxt_1.addAlias(streamNS, 'iq', ['forward.iq'])),
    jxt_1.addAlias(Namespaces_1.NS_DELAY, 'delay', ['forward.delay']),
    {
        aliases: ['message.forward'],
        element: 'forwarded',
        namespace: Namespaces_1.NS_FORWARD_0,
        path: 'forward'
    }
];
exports.default = Protocol;
