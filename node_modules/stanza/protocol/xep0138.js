"use strict";
// ====================================================================
// XEP-0138: Stream Compression
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0138.html
// Version: 2.0 (2009-05-27)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'compression',
        fields: {
            methods: jxt_1.multipleChildText(null, 'method')
        },
        namespace: Namespaces_1.NS_COMPRESSION_FEATURE,
        path: 'features.compression'
    },
    {
        element: 'compress',
        fields: {
            method: jxt_1.childText(null, 'method')
        },
        namespace: Namespaces_1.NS_COMPRESSION,
        path: 'compression',
        type: 'start',
        typeField: 'type'
    },
    {
        aliases: ['error.compressionError'],
        element: 'failure',
        fields: {
            condition: jxt_1.childEnum(null, ['unsupported-method', 'setup-failed', 'processing-failed'])
        },
        namespace: Namespaces_1.NS_COMPRESSION,
        path: 'compression',
        type: 'failure',
        typeField: 'type'
    },
    {
        element: 'compressed',
        namespace: Namespaces_1.NS_COMPRESSION,
        path: 'compression',
        type: 'success',
        typeField: 'type'
    }
];
exports.default = Protocol;
