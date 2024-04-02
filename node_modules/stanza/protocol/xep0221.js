"use strict";
// ====================================================================
// XEP-0221: Data Forms Media Element
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0221.html
// Version: 1.0 (2008-09-03)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'media',
        fields: {
            height: jxt_1.integerAttribute('height'),
            width: jxt_1.integerAttribute('width')
        },
        namespace: Namespaces_1.NS_DATAFORM_MEDIA,
        path: 'dataform.fields.media'
    },
    {
        aliases: [{ multiple: true, path: 'dataform.fields.media.sources' }],
        element: 'uri',
        fields: {
            mediaType: jxt_1.attribute('type'),
            uri: jxt_1.text()
        },
        namespace: Namespaces_1.NS_DATAFORM_MEDIA
    }
];
exports.default = Protocol;
