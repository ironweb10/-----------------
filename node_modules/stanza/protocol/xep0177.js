"use strict";
// ====================================================================
// XEP-0177: Jingle Raw UDP Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0177.html
// Version: 1.1 (2009-12-23)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'transport',
        fields: {
            gatheringComplete: jxt_1.childBoolean(null, 'gathering-complete'),
            password: jxt_1.attribute('pwd'),
            usernameFragment: jxt_1.attribute('ufrag')
        },
        namespace: Namespaces_1.NS_JINGLE_RAW_UDP_1,
        path: 'iq.jingle.contents.transport',
        type: Namespaces_1.NS_JINGLE_RAW_UDP_1,
        typeField: 'transportType'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.jingle.contents.transport.candidates',
                selector: Namespaces_1.NS_JINGLE_RAW_UDP_1
            }
        ],
        element: 'candidate',
        fields: {
            component: jxt_1.integerAttribute('component'),
            foundation: jxt_1.attribute('foundation'),
            generation: jxt_1.integerAttribute('generation'),
            id: jxt_1.attribute('id'),
            ip: jxt_1.attribute('ip'),
            port: jxt_1.integerAttribute('port'),
            type: jxt_1.attribute('type')
        },
        namespace: Namespaces_1.NS_JINGLE_RAW_UDP_1,
        type: Namespaces_1.NS_JINGLE_RAW_UDP_1,
        typeField: 'transportType'
    }
];
exports.default = Protocol;
