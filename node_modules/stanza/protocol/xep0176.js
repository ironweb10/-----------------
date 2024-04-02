"use strict";
// ====================================================================
// XEP-0176: Jingle ICE-UDP Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0176.html
// Version: 1.0 (2009-06-10)
//
// Additional:
// - tcpType candidate attribute (matching XEP-0371)
// - gatheringComplete flag (matching XEP-0371)
//
// --------------------------------------------------------------------
// XEP-0371: Jingle ICE-UDP Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0371.html
// Version: 0.2 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const ice = (transportType) => [
    {
        element: 'transport',
        fields: {
            gatheringComplete: jxt_1.childBoolean(null, 'gathering-complete'),
            password: jxt_1.attribute('pwd'),
            usernameFragment: jxt_1.attribute('ufrag')
        },
        namespace: transportType,
        path: 'iq.jingle.contents.transport',
        type: transportType,
        typeField: 'transportType'
    },
    {
        aliases: [
            {
                impliedType: true,
                path: 'iq.jingle.contents.transport.remoteCandidate',
                selector: transportType
            }
        ],
        element: 'remote-candidate',
        fields: {
            component: jxt_1.integerAttribute('component'),
            ip: jxt_1.attribute('ip'),
            port: jxt_1.integerAttribute('port')
        },
        namespace: transportType,
        type: transportType,
        typeField: 'transportType'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.jingle.contents.transport.candidates',
                selector: transportType
            }
        ],
        element: 'candidate',
        fields: {
            component: jxt_1.integerAttribute('component'),
            foundation: jxt_1.attribute('foundation'),
            generation: jxt_1.integerAttribute('generation'),
            id: jxt_1.attribute('id'),
            ip: jxt_1.attribute('ip'),
            network: jxt_1.integerAttribute('network'),
            port: jxt_1.integerAttribute('port'),
            priority: jxt_1.integerAttribute('priority'),
            protocol: jxt_1.attribute('protocol'),
            relatedAddress: jxt_1.attribute('rel-addr'),
            relatedPort: jxt_1.attribute('rel-port'),
            tcpType: jxt_1.attribute('tcptype'),
            type: jxt_1.attribute('type')
        },
        namespace: transportType,
        type: transportType,
        typeField: 'transportType'
    }
];
const Protocol = [...ice(Namespaces_1.NS_JINGLE_ICE_0), ...ice(Namespaces_1.NS_JINGLE_ICE_UDP_1)];
exports.default = Protocol;
