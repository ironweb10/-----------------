"use strict";
// ====================================================================
// XEP-0107: User Mood
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0107.html
// Version: 1.2.1 (2018-03-13)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [{ path: 'message.mood', impliedType: true }, ...jxt_1.pubsubItemContentAliases()],
    element: 'mood',
    fields: {
        alternateLanguageText: jxt_1.childAlternateLanguageText(null, 'text'),
        text: jxt_1.childText(null, 'text'),
        value: jxt_1.childEnum(null, Constants_1.USER_MOODS)
    },
    namespace: Namespaces_1.NS_MOOD,
    type: Namespaces_1.NS_MOOD
};
exports.default = Protocol;
