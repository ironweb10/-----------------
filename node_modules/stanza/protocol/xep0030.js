"use strict";
// ====================================================================
// XEP-0030: Service Discovery
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0030.html
// Version: 2.5rc3 (2017-10-03)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0128: Service Discovery Extensions
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0128.html
// Version: 1.0 (2004-10-20)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: ['iq.disco', 'message.disco', 'features.disco'],
        childrenExportOrder: {
            identities: 1,
            features: 2,
            extensions: 3
        },
        element: 'query',
        fields: {
            features: jxt_1.multipleChildAttribute(null, 'feature', 'var'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_DISCO_INFO,
        path: 'disco',
        type: 'info',
        typeField: 'type'
    },
    {
        aliases: [{ path: 'disco.identities', selector: 'info', multiple: true }],
        element: 'identity',
        fields: {
            category: jxt_1.attribute('category'),
            lang: jxt_1.languageAttribute(),
            name: jxt_1.attribute('name'),
            type: jxt_1.attribute('type')
        },
        namespace: Namespaces_1.NS_DISCO_INFO
    },
    {
        aliases: [{ path: 'disco.items', multiple: true, selector: 'items' }],
        element: 'item',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            name: jxt_1.attribute('name'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_DISCO_ITEMS
    },
    {
        aliases: [{ path: 'disco.items', multiple: true, selector: 'info' }],
        element: 'item',
        fields: {
            category: jxt_1.JIDAttribute('category'),
            lang: jxt_1.languageAttribute(),
            name: jxt_1.attribute('name'),
            type: jxt_1.attribute('type')
        },
        namespace: Namespaces_1.NS_DISCO_INFO
    },
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', [
        // XEP-0128
        { path: 'disco.extensions', multiple: true, selector: 'info' }
    ]),
    jxt_1.addAlias(Namespaces_1.NS_RSM, 'set', [{ path: 'disco.paging', selector: 'items' }]),
    {
        aliases: ['iq.disco', 'message.disco', 'features.disco'],
        element: 'query',
        fields: {
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_DISCO_ITEMS,
        path: 'disco',
        type: 'items',
        typeField: 'type'
    }
];
exports.default = Protocol;
