"use strict";
// ====================================================================
// XEP-0124: Bidirectional-streams Over Synchronous HTTP (BOSH)
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0124.html
// Version: 1.11.1 (2016-11-16)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0206: XMPP over BOSH
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0206.html
// Version: 1.4 (2014-04-09)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'body',
    fields: {
        acceptMediaTypes: jxt_1.attribute('accept'),
        ack: jxt_1.integerAttribute('ack'),
        authId: jxt_1.attribute('authid'),
        characterSets: jxt_1.attribute('charsets'),
        condition: jxt_1.attribute('condition'),
        from: jxt_1.JIDAttribute('from'),
        key: jxt_1.attribute('key'),
        lang: jxt_1.languageAttribute(),
        maxClientRequests: jxt_1.integerAttribute('requests'),
        maxHoldOpen: jxt_1.integerAttribute('hold'),
        maxInactivityTime: jxt_1.integerAttribute('inactivity'),
        maxSessionPause: jxt_1.integerAttribute('maxpause'),
        maxWaitTime: jxt_1.integerAttribute('wait'),
        mediaType: jxt_1.attribute('content'),
        minPollingInterval: jxt_1.integerAttribute('polling'),
        newKey: jxt_1.attribute('newkey'),
        pauseSession: jxt_1.integerAttribute('pause'),
        report: jxt_1.integerAttribute('report'),
        rid: jxt_1.integerAttribute('rid'),
        route: jxt_1.attribute('string'),
        seeOtherURI: jxt_1.childText(null, 'uri'),
        sid: jxt_1.attribute('sid'),
        stream: jxt_1.attribute('stream'),
        time: jxt_1.integerAttribute('time'),
        to: jxt_1.JIDAttribute('to'),
        type: jxt_1.attribute('type'),
        version: jxt_1.attribute('ver'),
        // XEP-0206
        xmppRestart: jxt_1.namespacedBooleanAttribute('xmpp', Namespaces_1.NS_BOSH_XMPP, 'restart', undefined, {
            writeValue: (value) => {
                return value ? 'true' : 'false';
            }
        }),
        xmppRestartLogic: jxt_1.namespacedBooleanAttribute('xmpp', Namespaces_1.NS_BOSH_XMPP, 'restartlogic', undefined, {
            writeValue: (value) => {
                return value ? 'true' : 'false';
            }
        }),
        xmppVersion: jxt_1.namespacedAttribute('xmpp', Namespaces_1.NS_BOSH_XMPP, 'version')
    },
    namespace: Namespaces_1.NS_BOSH,
    path: 'bosh'
};
exports.default = Protocol;
