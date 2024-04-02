"use strict";
// ====================================================================
// XEP-0084: User Avatar
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0084.html
// Version: 1.1.1 (2016-07-09)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: jxt_1.pubsubItemContentAliases(),
        element: 'data',
        fields: {
            data: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_AVATAR_DATA,
        path: 'avatar',
        type: Namespaces_1.NS_AVATAR_DATA,
        typeField: 'itemType'
    },
    {
        aliases: [{ path: 'avatar', impliedType: true }, ...jxt_1.pubsubItemContentAliases()],
        element: 'metadata',
        namespace: Namespaces_1.NS_AVATAR_METADATA,
        type: Namespaces_1.NS_AVATAR_METADATA,
        typeField: 'itemType',
        childrenExportOrder: {
            versions: 1,
            pointers: 2
        }
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'avatar.versions',
                selector: Namespaces_1.NS_AVATAR_METADATA
            }
        ],
        element: 'info',
        fields: {
            bytes: jxt_1.integerAttribute('bytes'),
            height: jxt_1.integerAttribute('height'),
            id: jxt_1.attribute('id'),
            mediaType: jxt_1.attribute('type'),
            uri: jxt_1.attribute('url'),
            width: jxt_1.integerAttribute('width')
        },
        namespace: Namespaces_1.NS_AVATAR_METADATA
    },
    {
        aliases: [
            {
                multiple: true,
                path: 'avatar.pointers',
                selector: Namespaces_1.NS_AVATAR_METADATA
            }
        ],
        element: 'pointer',
        fields: {
            bytes: jxt_1.integerAttribute('bytes'),
            height: jxt_1.integerAttribute('height'),
            id: jxt_1.attribute('id'),
            mediaType: jxt_1.attribute('type'),
            width: jxt_1.integerAttribute('width')
        },
        namespace: Namespaces_1.NS_AVATAR_METADATA
    }
];
exports.default = Protocol;
