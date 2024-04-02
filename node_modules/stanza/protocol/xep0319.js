"use strict";
// ====================================================================
// XEP-0319: Last User Interaction in Presence
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0313.html
// Version: 1.0.2 (2017-07-17)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendPresence({
    idleSince: jxt_1.childDate(Namespaces_1.NS_IDLE_1, 'since')
});
