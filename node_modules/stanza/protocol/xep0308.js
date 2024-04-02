"use strict";
// ====================================================================
// XEP-0308: Last Message Correction
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0308.html
// Version: 1.0 (2013-04-08)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendMessage({
    replace: jxt_1.childAttribute(Namespaces_1.NS_CORRECTION_0, 'replace', 'id')
});
