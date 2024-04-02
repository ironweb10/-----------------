"use strict";
// ====================================================================
// XEP-0338: Jingle Grouping Framework
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0338.html
// Version: 0.2 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: [{ path: 'iq.jingle.groups', multiple: true }],
        element: 'group',
        fields: {
            contents: jxt_1.multipleChildAttribute(null, 'content', 'name'),
            semantics: jxt_1.attribute('semantics')
        },
        namespace: Namespaces_1.NS_JINGLE_GROUPING_0
    }
];
exports.default = Protocol;
