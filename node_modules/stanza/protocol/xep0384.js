"use strict";
// ====================================================================
// XEP-0384: OMEMO Encryption
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0384.html
// Version: 0.3.0 (2018-07-31)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: ['message.omemo'],
        element: 'encrypted',
        fields: {
            payload: jxt_1.childTextBuffer(null, 'payload', 'base64')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        path: 'omemo'
    },
    {
        element: 'header',
        fields: {
            iv: jxt_1.childTextBuffer(null, 'iv', 'base64'),
            sid: jxt_1.integerAttribute('sid')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        path: 'omemo.header'
    },
    {
        aliases: [{ path: 'omemo.header.keys', multiple: true }],
        element: 'key',
        fields: {
            preKey: jxt_1.booleanAttribute('prekey'),
            rid: jxt_1.integerAttribute('rid'),
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL
    },
    {
        aliases: jxt_1.pubsubItemContentAliases(),
        element: 'list',
        fields: {
            devices: jxt_1.multipleChildIntegerAttribute(null, 'device', 'id')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        type: Namespaces_1.NS_OMEMO_AXOLOTL_DEVICELIST,
        typeField: 'itemType'
    },
    {
        element: 'preKeyPublic',
        fields: {
            id: jxt_1.integerAttribute('preKeyId'),
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        path: 'omemoPreKey'
    },
    {
        element: 'signedPreKeyPublic',
        fields: {
            id: jxt_1.integerAttribute('signedPreKeyId'),
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        path: 'omemoDevice.signedPreKeyPublic'
    },
    {
        aliases: jxt_1.pubsubItemContentAliases(),
        element: 'bundle',
        fields: {
            identityKey: jxt_1.childTextBuffer(null, 'identityKey', 'base64'),
            preKeys: jxt_1.splicePath(null, 'prekeys', 'omemoPreKey', true),
            signedPreKeySignature: jxt_1.childTextBuffer(null, 'signedPreKeySignature', 'base64')
        },
        namespace: Namespaces_1.NS_OMEMO_AXOLOTL,
        path: 'omemoDevice',
        type: Namespaces_1.NS_OMEMO_AXOLOTL_BUNDLES,
        typeField: 'itemType'
    }
];
exports.default = Protocol;
