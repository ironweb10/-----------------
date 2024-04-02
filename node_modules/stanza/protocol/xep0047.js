"use strict";
// ====================================================================
// XEP-0047: In-band Bytestreams
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0047.html
// Version: 2.0 (2012-06-22)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: ['iq.ibb', 'message.ibb'],
        element: 'open',
        fields: {
            ack: {
                importer(xml, context) {
                    const stanza = jxt_1.attribute('stanza', 'iq').importer(xml, context);
                    return stanza !== 'message';
                },
                exporter(xml, data, context) {
                    jxt_1.attribute('stanza').exporter(xml, data ? 'iq' : 'message', context);
                }
            },
            blockSize: jxt_1.integerAttribute('block-size'),
            sid: jxt_1.attribute('sid')
        },
        namespace: Namespaces_1.NS_IBB,
        type: 'open',
        typeField: 'action'
    },
    {
        aliases: ['iq.ibb', 'message.ibb'],
        element: 'close',
        fields: {
            sid: jxt_1.attribute('sid')
        },
        namespace: Namespaces_1.NS_IBB,
        type: 'close',
        typeField: 'action'
    },
    {
        aliases: ['iq.ibb', 'message.ibb'],
        element: 'data',
        fields: {
            data: jxt_1.textBuffer('base64'),
            seq: jxt_1.integerAttribute('seq'),
            sid: jxt_1.attribute('sid')
        },
        namespace: Namespaces_1.NS_IBB,
        type: 'data',
        typeField: 'action'
    }
];
exports.default = Protocol;
