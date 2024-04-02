"use strict";
// ====================================================================
// XEP-0054: vcard-temp
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0054.html
// Version: 1.2 (2008-07-16)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const path = 'vcardTemp.records';
function vcardField(element, type) {
    return {
        aliases: [{ multiple: true, path }],
        element,
        fields: {
            value: jxt_1.text()
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type,
        typeField: 'type'
    };
}
const Protocol = [
    {
        aliases: [{ path: 'iq.vcard' }],
        defaultType: Namespaces_1.NS_VCARD_TEMP,
        element: 'vCard',
        fields: {
            fullName: jxt_1.childText(null, 'FN')
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        path: 'vcardTemp',
        type: Namespaces_1.NS_VCARD_TEMP,
        typeField: 'format'
    },
    {
        element: 'N',
        fields: {
            additional: { ...jxt_1.childText(null, 'MIDDLE'), order: 3 },
            family: { ...jxt_1.childText(null, 'FAMILY'), order: 1 },
            given: { ...jxt_1.childText(null, 'GIVEN'), order: 2 },
            prefix: { ...jxt_1.childText(null, 'PREFIX'), order: 4 },
            suffix: { ...jxt_1.childText(null, 'SUFFIX'), order: 5 }
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        path: 'vcardTemp.name'
    },
    vcardField('NICKNAME', 'nickname'),
    vcardField('BDAY', 'birthday'),
    vcardField('JABBERID', 'jid'),
    vcardField('TZ', 'timezone'),
    vcardField('TITLE', 'title'),
    vcardField('ROLE', 'role'),
    vcardField('URL', 'url'),
    vcardField('NOTE', 'note'),
    vcardField('SORT-STRING', 'sort'),
    vcardField('UID', 'uid'),
    vcardField('REV', 'revision'),
    vcardField('PRODID', 'productId'),
    vcardField('DESC', 'description'),
    {
        aliases: [{ multiple: true, path }],
        element: 'EMAIL',
        fields: {
            preferred: jxt_1.childBoolean(null, 'PREF'),
            types: jxt_1.multipleChildEnum(null, [
                ['home', 'HOME'],
                ['work', 'WORK'],
                ['internet', 'INTERNET']
            ]),
            value: jxt_1.childText(null, 'USERID')
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'email'
    },
    {
        aliases: [{ path, multiple: true }],
        element: 'ORG',
        fields: {
            units: { ...jxt_1.multipleChildText(null, 'ORGUNIT'), order: 2 },
            value: { ...jxt_1.childText(null, 'ORGNAME'), order: 1 }
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'organization',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'ADR',
        fields: {
            city: jxt_1.childText(null, 'LOCALITY'),
            code: jxt_1.childText(null, 'PCODE'),
            country: jxt_1.childText(null, 'CTRY'),
            pobox: jxt_1.childText(null, 'POBOX'),
            preferred: jxt_1.childBoolean(null, 'PREF'),
            region: jxt_1.childText(null, 'REGION'),
            street: jxt_1.childText(null, 'STREET'),
            street2: jxt_1.childText(null, 'EXTADD'),
            types: jxt_1.multipleChildEnum(null, [
                ['home', 'HOME'],
                ['work', 'WORK'],
                ['domestic', 'DOM'],
                ['international', 'INTL'],
                ['postal', 'POSTAL'],
                ['parcel', 'PARCEL']
            ])
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'address',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'LABEL',
        fields: {
            lines: jxt_1.multipleChildText(null, 'LINE'),
            preferred: jxt_1.childBoolean(null, 'PREF'),
            types: jxt_1.multipleChildEnum(null, [
                ['home', 'HOME'],
                ['work', 'WORK']
            ])
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'addressLabel',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'TEL',
        fields: {
            preferred: jxt_1.childBoolean(null, 'PREF'),
            types: jxt_1.multipleChildEnum(null, [
                ['home', 'HOME'],
                ['work', 'WORK'],
                ['cell', 'CELL'],
                ['fax', 'FAX'],
                ['voice', 'VOICE'],
                ['msg', 'MSG']
            ]),
            value: jxt_1.childText(null, 'NUMBER', '', true)
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'tel',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'PHOTO',
        fields: {
            data: jxt_1.childText(null, 'BINVAL'),
            mediaType: jxt_1.childText(null, 'TYPE'),
            url: jxt_1.childText(null, 'EXTVAL')
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'photo',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'LOGO',
        fields: {
            data: jxt_1.childText(null, 'BINVAL'),
            mediaType: jxt_1.childText(null, 'TYPE'),
            url: jxt_1.childText(null, 'EXTVAL')
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'logo',
        typeField: 'type'
    },
    {
        aliases: [{ multiple: true, path }],
        element: 'CATEGORIES',
        fields: {
            value: jxt_1.multipleChildText(null, 'KEYWORD')
        },
        namespace: Namespaces_1.NS_VCARD_TEMP,
        type: 'categories',
        typeField: 'type'
    }
];
exports.default = Protocol;
