"use strict";
// ====================================================================
// XEP-0261: Jingle In-Band Bytestreams Transport Method
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0047.html
// Version: 1.0 (2011-09-23)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'transport',
    fields: {
        ack: {
            importer(xml, context) {
                const stanza = jxt_1.attribute('stanza', 'iq').importer(xml, context);
                return stanza !== 'message';
            },
            exporter(xml, data, context) {
                if (data === false) {
                    jxt_1.attribute('stanza').exporter(xml, 'message', context);
                }
            }
        },
        blockSize: jxt_1.integerAttribute('block-size'),
        sid: jxt_1.attribute('sid')
    },
    namespace: Namespaces_1.NS_JINGLE_IBB_1,
    path: 'iq.jingle.contents.transport',
    type: Namespaces_1.NS_JINGLE_IBB_1,
    typeField: 'transportType'
};
exports.default = Protocol;
