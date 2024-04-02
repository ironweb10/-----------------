"use strict";
// ====================================================================
// XEP-0234: Jingle File Transfer
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0234.html
// Version: Version 0.18.3 (2017-08-24)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
let Protocol = [
    jxt_1.addAlias(Namespaces_1.NS_HASHES_2, 'hash', [
        { path: 'file.hashes', multiple: true },
        { path: 'file.range.hashes', multiple: true }
    ]),
    jxt_1.addAlias(Namespaces_1.NS_HASHES_1, 'hash', [
        { path: 'file.hashes', multiple: true },
        { path: 'file.range.hashes', multiple: true }
    ]),
    jxt_1.addAlias(Namespaces_1.NS_HASHES_2, 'hash-used', [{ path: 'file.hashesUsed', multiple: true }]),
    jxt_1.addAlias(Namespaces_1.NS_THUMBS_1, 'thumbnail', [{ path: 'file.thumbnails', multiple: true }])
];
for (const ftVersion of [Namespaces_1.NS_JINGLE_FILE_TRANSFER_4, Namespaces_1.NS_JINGLE_FILE_TRANSFER_5]) {
    Protocol = Protocol.concat([
        {
            aliases: [
                'file',
                {
                    impliedType: true,
                    path: 'iq.jingle.contents.application.file',
                    selector: ftVersion
                },
                {
                    impliedType: true,
                    path: 'iq.jingle.info.file',
                    selector: `{${ftVersion}}checksum`
                }
            ],
            defaultType: Namespaces_1.NS_JINGLE_FILE_TRANSFER_5,
            element: 'file',
            fields: {
                date: jxt_1.childDate(null, 'date'),
                description: jxt_1.childText(null, 'desc'),
                mediaType: jxt_1.childText(null, 'media-type'),
                name: jxt_1.childText(null, 'name'),
                size: jxt_1.childInteger(null, 'size')
            },
            namespace: ftVersion,
            type: ftVersion,
            typeField: 'version'
        },
        {
            aliases: [{ impliedType: true, path: 'file.range', selector: ftVersion }],
            defaultType: Namespaces_1.NS_JINGLE_FILE_TRANSFER_5,
            element: 'range',
            fields: {
                length: jxt_1.integerAttribute('length'),
                offset: jxt_1.integerAttribute('offset', 0)
            },
            namespace: ftVersion,
            type: ftVersion,
            typeField: 'version'
        },
        {
            element: 'description',
            namespace: ftVersion,
            path: 'iq.jingle.contents.application',
            type: ftVersion,
            typeField: 'applicationType'
        },
        {
            element: 'received',
            fields: {
                creator: jxt_1.attribute('creator'),
                name: jxt_1.attribute('name')
            },
            namespace: ftVersion,
            path: 'iq.jingle.info',
            type: `{${ftVersion}}received`,
            typeField: 'infoType'
        },
        {
            element: 'checksum',
            fields: {
                creator: jxt_1.attribute('creator'),
                name: jxt_1.attribute('name')
            },
            namespace: ftVersion,
            path: 'iq.jingle.info',
            type: `{${ftVersion}}checksum`,
            typeField: 'infoType'
        }
    ]);
}
exports.default = Protocol;
