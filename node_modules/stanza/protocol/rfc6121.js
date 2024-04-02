"use strict";
// ====================================================================
// RFC 6121: Extensible Messaging and Presence Protocol (XMPP):
//      Instant Messaging and Presence
// --------------------------------------------------------------------
// Source: https://tools.ietf.org/html/rfc6121
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendStreamFeatures({
        rosterPreApproval: jxt_1.childBoolean(Namespaces_1.NS_SUBSCRIPTION_PREAPPROVAL, 'sub'),
        rosterVersioning: jxt_1.childBoolean(Namespaces_1.NS_ROSTER_VERSIONING, 'ver')
    }),
    jxt_1.extendMessage({
        alternateLanguageBodies: jxt_1.childAlternateLanguageText(null, 'body'),
        alternateLanguageSubjects: jxt_1.childAlternateLanguageText(null, 'subject'),
        body: jxt_1.childText(null, 'body'),
        hasSubject: jxt_1.childBoolean(null, 'subject'),
        parentThread: jxt_1.childAttribute(null, 'thread', 'parent'),
        subject: jxt_1.childText(null, 'subject'),
        thread: jxt_1.childText(null, 'thread'),
        type: jxt_1.attribute('type')
    }),
    jxt_1.extendPresence({
        alternateLanguageStatuses: jxt_1.childAlternateLanguageText(null, 'status'),
        priority: jxt_1.childInteger(null, 'priority', 0),
        show: jxt_1.childText(null, 'show'),
        status: jxt_1.childText(null, 'status'),
        type: jxt_1.attribute('type')
    }),
    {
        element: 'query',
        fields: {
            version: jxt_1.attribute('ver', undefined, { emitEmpty: true })
        },
        namespace: Namespaces_1.NS_ROSTER,
        path: 'iq.roster'
    },
    {
        aliases: [{ path: 'iq.roster.items', multiple: true }],
        element: 'item',
        fields: {
            groups: jxt_1.multipleChildText(null, 'group'),
            jid: jxt_1.JIDAttribute('jid'),
            name: jxt_1.attribute('name'),
            pending: jxt_1.attribute('ask'),
            preApproved: jxt_1.booleanAttribute('approved'),
            subscription: jxt_1.attribute('subscription')
        },
        namespace: Namespaces_1.NS_ROSTER
    }
];
exports.default = Protocol;
