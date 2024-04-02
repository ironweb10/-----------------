"use strict";
// ====================================================================
// XEP-0085: Chat State Notifications
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0085.html
// Version: 2.1 (2009-09-23)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendMessage({
    chatState: jxt_1.childEnum(Namespaces_1.NS_CHAT_STATES, Object.values(Constants_1.ChatState))
});
