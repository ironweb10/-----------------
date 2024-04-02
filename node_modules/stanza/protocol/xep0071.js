"use strict";
// ====================================================================
// XEP-0071: XHTML-IM
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0071.html
// Version: 1.5.4 (2018-03-08)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'html',
    fields: {
        alternateLanguageBodies: jxt_1.childAlternateLanguageRawElement(Namespaces_1.NS_XHTML, 'body', 'xhtmlim'),
        body: jxt_1.childLanguageRawElement(Namespaces_1.NS_XHTML, 'body', 'xhtmlim')
    },
    namespace: Namespaces_1.NS_XHTML_IM,
    path: 'message.html'
};
exports.default = Protocol;
