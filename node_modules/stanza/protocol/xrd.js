"use strict";
// ====================================================================
// Extensible Resource Descriptor (XRD)
// --------------------------------------------------------------------
// Source: http://docs.oasis-open.org/xri/xrd/v1.0/xrd-1.0.html
// Version: 1.0
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        element: 'XRD',
        fields: {
            subject: jxt_1.childText(null, 'Subject')
        },
        namespace: Namespaces_1.NS_XRD,
        path: 'xrd'
    },
    {
        aliases: [{ path: 'xrd.links', multiple: true }],
        element: 'Link',
        fields: {
            href: jxt_1.attribute('href'),
            rel: jxt_1.attribute('rel'),
            type: jxt_1.attribute('type')
        },
        namespace: Namespaces_1.NS_XRD
    }
];
exports.default = Protocol;
