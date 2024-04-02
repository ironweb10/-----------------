"use strict";
// ====================================================================
// XEP-0141: Data Forms Layout
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0141.html
// Version: 1.0 (2005-05-12)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const aliases = [
    'dataformLayout',
    {
        multiple: true,
        path: 'dataformLayout.contents'
    },
    {
        multiple: true,
        path: 'dataform.layout.contents'
    }
];
const Protocol = [
    {
        aliases: [
            {
                multiple: true,
                path: 'dataform.layout'
            }
        ],
        element: 'page',
        fields: {
            label: jxt_1.attribute('label')
        },
        namespace: Namespaces_1.NS_DATAFORM_LAYOUT
    },
    {
        aliases,
        element: 'section',
        fields: {
            label: jxt_1.attribute('label')
        },
        namespace: Namespaces_1.NS_DATAFORM_LAYOUT,
        type: 'section',
        typeField: 'type'
    },
    {
        aliases,
        element: 'text',
        fields: {
            value: jxt_1.text()
        },
        namespace: Namespaces_1.NS_DATAFORM_LAYOUT,
        type: 'text',
        typeField: 'type'
    },
    {
        aliases,
        element: 'fieldref',
        fields: {
            field: jxt_1.attribute('var')
        },
        namespace: Namespaces_1.NS_DATAFORM_LAYOUT,
        type: 'fieldref',
        typeField: 'type'
    },
    {
        aliases,
        element: 'reportedref',
        namespace: Namespaces_1.NS_DATAFORM_LAYOUT,
        type: 'reportedref',
        typeField: 'type'
    }
];
exports.default = Protocol;
