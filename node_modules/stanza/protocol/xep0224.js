"use strict";
// ====================================================================
// XEP-0224: Attention
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0224.html
// Version: Version 1.0 (2008-11-13)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendMessage({
    requestingAttention: jxt_1.childBoolean(Namespaces_1.NS_ATTENTION_0, 'attention')
});
