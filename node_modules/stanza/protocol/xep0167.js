"use strict";
// ====================================================================
// XEP-0167: Jingle RTP Sessions
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0167.html
// Version: 1.1.1 (2016-07-08)
//
// Additional:
// - rtcpMux flag
// - rtcpReducedSize flag
// - media streams list
//
// --------------------------------------------------------------------
// XEP-0262: Use of ZRTP in Jingle RTP Sessions
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0262.html
// Version: 1.0 (2011-06-15)
//
// --------------------------------------------------------------------
// XEP-0293: Jingle RTP Feedback Negotiation
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0293.html
// Version: 1.0 (2015-08-11)
//
// --------------------------------------------------------------------
// XEP-0294: Jingle RTP Header Extensions Negotiation
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0294.html
// Version: 1.0 (2015-08-11)
//
// --------------------------------------------------------------------
// XEP-0339: Source-Specific Media Attributes in Jingle
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0339.html
// Version: 0.3 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
function rtcpFeedback() {
    return {
        importer(xml, context) {
            let existing = jxt_1.findAll(xml, Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0, 'rtcp-fb');
            const typeImporter = jxt_1.attribute('type').importer;
            const subtypeImporter = jxt_1.attribute('subtype').importer;
            const valueImporter = jxt_1.attribute('value').importer;
            const result = [];
            for (const child of existing) {
                const type = typeImporter(child, context);
                const parameter = subtypeImporter(child, context);
                result.push(parameter ? { type, parameter } : { type });
            }
            existing = jxt_1.findAll(xml, Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0, 'rtcp-fb-trr-int');
            for (const child of existing) {
                const parameter = valueImporter(child, context);
                result.push(parameter ? { type: 'trr-int', parameter } : { type: 'trr-int' });
            }
            return result;
        },
        exporter(xml, values, context) {
            const typeExporter = jxt_1.attribute('type').exporter;
            const subtypeExporter = jxt_1.attribute('subtype').exporter;
            const valueExporter = jxt_1.attribute('value').exporter;
            for (const fb of values) {
                let child;
                if (fb.type === 'trr-int') {
                    child = jxt_1.createElement(Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0, 'rtcp-fb-trr-int', context.namespace, xml);
                    if (fb.parameter) {
                        valueExporter(child, fb.parameter, context);
                    }
                }
                else {
                    child = jxt_1.createElement(Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0, 'rtcp-fb', context.namespace, xml);
                    typeExporter(child, fb.type, context);
                    if (fb.parameter) {
                        subtypeExporter(child, fb.parameter, context);
                    }
                }
                xml.appendChild(child);
            }
        }
    };
}
const info = 'iq.jingle.info';
const Protocol = [
    {
        aliases: ['iq.jingle.contents.application'],
        childrenExportOrder: {
            codecs: 4,
            encryption: 5,
            headerExtensions: 6,
            sourceGroups: 8,
            sources: 7,
            streams: 9
        },
        element: 'description',
        fields: {
            media: jxt_1.attribute('media'),
            rtcpFeedback: {
                ...rtcpFeedback(),
                exportOrder: 3
            },
            rtcpMux: {
                ...jxt_1.childBoolean(null, 'rtcp-mux'),
                exportOrder: 1
            },
            rtcpReducedSize: {
                ...jxt_1.childBoolean(null, 'rtcp-reduced-size'),
                exportOrder: 2
            },
            ssrc: jxt_1.attribute('ssrc')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_1,
        optionalNamespaces: {
            rtcpf: Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0,
            rtph: Namespaces_1.NS_JINGLE_RTP_HDREXT_0
        },
        type: Namespaces_1.NS_JINGLE_RTP_1
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.headerExtensions',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'rtp-hdrext',
        fields: {
            id: jxt_1.integerAttribute('id'),
            senders: jxt_1.attribute('senders'),
            uri: jxt_1.attribute('uri')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_HDREXT_0
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.codecs',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            },
            'rtpcodec'
        ],
        element: 'payload-type',
        fields: {
            channels: jxt_1.integerAttribute('channels'),
            clockRate: jxt_1.integerAttribute('clockrate'),
            id: jxt_1.attribute('id'),
            maxptime: jxt_1.integerAttribute('maxptime'),
            name: jxt_1.attribute('name'),
            parameters: jxt_1.parameterMap(Namespaces_1.NS_JINGLE_RTP_1, 'parameter', 'name', 'value'),
            ptime: jxt_1.integerAttribute('ptime'),
            rtcpFeedback: rtcpFeedback()
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_1
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.sources',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'source',
        fields: {
            parameters: jxt_1.parameterMap(Namespaces_1.NS_JINGLE_RTP_SSMA_0, 'parameter', 'name', 'value'),
            ssrc: jxt_1.attribute('ssrc')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_SSMA_0
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.sourceGroups',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'ssrc-group',
        fields: {
            semantics: jxt_1.attribute('semantics'),
            sources: jxt_1.multipleChildAttribute(null, 'source', 'ssrc')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_SSMA_0
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.streams',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'stream',
        fields: {
            id: jxt_1.attribute('id'),
            track: jxt_1.attribute('track')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_MSID_0
    },
    {
        aliases: [{ path: 'iq.jingle.contents.application.encryption', selector: Namespaces_1.NS_JINGLE_RTP_1 }],
        element: 'encryption',
        fields: {
            required: jxt_1.booleanAttribute('required')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_1
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'iq.jingle.contents.application.encryption.sdes',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'crypto',
        fields: {
            cryptoSuite: jxt_1.attribute('crypto-suite'),
            keyParameters: jxt_1.attribute('key-params'),
            sessionParameters: jxt_1.attribute('session-params'),
            tag: jxt_1.integerAttribute('tag')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_1
    },
    {
        aliases: [
            {
                path: 'iq.jingle.contents.application.encryption.zrtp',
                selector: Namespaces_1.NS_JINGLE_RTP_1
            }
        ],
        element: 'zrtp-hash',
        fields: {
            value: jxt_1.textBuffer('hex'),
            version: jxt_1.attribute('version')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_1
    },
    {
        element: 'mute',
        fields: {
            creator: jxt_1.attribute('creator'),
            name: jxt_1.attribute('name')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_MUTE
    },
    {
        element: 'unmute',
        fields: {
            creator: jxt_1.attribute('creator'),
            name: jxt_1.attribute('name')
        },
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_UNMUTE
    },
    {
        element: 'hold',
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_HOLD
    },
    {
        element: 'unhold',
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_UNHOLD
    },
    {
        element: 'active',
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_ACTIVE
    },
    {
        element: 'ringing',
        namespace: Namespaces_1.NS_JINGLE_RTP_INFO_1,
        path: info,
        type: Constants_1.JINGLE_INFO_RINGING
    }
];
exports.default = Protocol;
