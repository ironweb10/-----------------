"use strict";
// ====================================================================
// XEP-0199: XMPP Ping
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0199.html
// Version: 2.0 (2009-06-03)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendIQ({
    ping: jxt_1.childBoolean(Namespaces_1.NS_PING, 'ping')
});
