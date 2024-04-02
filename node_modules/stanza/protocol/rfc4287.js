"use strict";
// ====================================================================
// RFC 4287: The Atom Syndication Format
// --------------------------------------------------------------------
// Source: https://tools.ietf.org/html/rfc4287
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: ['atomentry', ...jxt_1.pubsubItemContentAliases()],
        element: 'entry',
        fields: {
            id: jxt_1.childText(null, 'id'),
            published: jxt_1.childDate(null, 'published'),
            updated: jxt_1.childDate(null, 'updated')
        },
        namespace: Namespaces_1.NS_ATOM,
        type: Namespaces_1.NS_ATOM,
        typeField: 'itemType'
    },
    {
        element: 'summary',
        fields: {
            text: jxt_1.text(),
            type: jxt_1.attribute('type', 'text')
        },
        namespace: Namespaces_1.NS_ATOM,
        path: 'atomentry.summary'
    },
    {
        element: 'title',
        fields: {
            text: jxt_1.text(),
            type: jxt_1.attribute('type', 'text')
        },
        namespace: Namespaces_1.NS_ATOM,
        path: 'atomentry.title'
    },
    {
        aliases: [{ path: 'atomentry.links', multiple: true }],
        element: 'link',
        fields: {
            href: jxt_1.attribute('href'),
            mediaType: jxt_1.attribute('type'),
            rel: jxt_1.attribute('rel')
        },
        namespace: Namespaces_1.NS_ATOM
    },
    {
        aliases: [{ path: 'atomentry.authors', multiple: true }],
        element: 'author',
        fields: {
            name: jxt_1.childText(null, 'name'),
            uri: jxt_1.childText(null, 'uri'),
            email: jxt_1.childText(null, 'email')
        },
        namespace: Namespaces_1.NS_ATOM
    },
    {
        aliases: [{ path: 'atomentry.contributors', multiple: true }],
        element: 'contributor',
        fields: {
            name: jxt_1.childText(null, 'name'),
            uri: jxt_1.childText(null, 'uri'),
            email: jxt_1.childText(null, 'email')
        },
        namespace: Namespaces_1.NS_ATOM
    },
    {
        aliases: [{ path: 'atomentry.categories', multiple: true }],
        element: 'category',
        fields: {
            term: jxt_1.attribute('term'),
            scheme: jxt_1.attribute('scheme'),
            label: jxt_1.attribute('label')
        },
        namespace: Namespaces_1.NS_ATOM
    },
    {
        element: 'content',
        fields: {
            text: jxt_1.text(),
            type: jxt_1.attribute('type', 'text')
        },
        namespace: Namespaces_1.NS_ATOM,
        path: 'atomentry.content'
    },
    {
        element: 'rights',
        fields: {
            text: jxt_1.text(),
            type: jxt_1.attribute('type', 'text')
        },
        namespace: Namespaces_1.NS_ATOM,
        path: 'atomentry.rights'
    }
];
exports.default = Protocol;
