"use strict";
// ====================================================================
// RFC 6120: Extensible Messaging and Presence Protocol (XMPP): Core
// --------------------------------------------------------------------
// Source: https://tools.ietf.org/html/rfc6120
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const _Stream = {
    defaultType: 'stream',
    element: 'stream',
    fields: {
        from: jxt_1.attribute('from'),
        id: jxt_1.attribute('id'),
        lang: jxt_1.languageAttribute(),
        to: jxt_1.attribute('to'),
        version: jxt_1.attribute('version')
    },
    namespace: Namespaces_1.NS_STREAM,
    path: 'stream',
    type: 'stream',
    typeField: 'action'
};
const _StreamFeatures = {
    element: 'features',
    namespace: Namespaces_1.NS_STREAM,
    path: 'features'
};
const _StreamError = {
    element: 'error',
    fields: {
        alternateLanguageText: jxt_1.childAlternateLanguageText(Namespaces_1.NS_STREAMS, 'text'),
        condition: jxt_1.childEnum(Namespaces_1.NS_STREAMS, Object.values(Constants_1.StreamErrorCondition), Constants_1.StreamErrorCondition.UndefinedCondition),
        seeOtherHost: jxt_1.childText(Namespaces_1.NS_STREAMS, Constants_1.StreamErrorCondition.SeeOtherHost),
        text: jxt_1.childText(Namespaces_1.NS_STREAMS, 'text')
    },
    namespace: Namespaces_1.NS_STREAM,
    path: 'streamError'
};
// --------------------------------------------------------------------
const _StanzaError = Object.values(Constants_1.StreamType).map(streamNS => ({
    aliases: ['stanzaError', 'message.error', 'presence.error', 'iq.error'],
    defaultType: Namespaces_1.NS_CLIENT,
    element: 'error',
    fields: {
        alternateLanguageText: jxt_1.childAlternateLanguageText(Namespaces_1.NS_STANZAS, 'text'),
        by: jxt_1.JIDAttribute('by'),
        condition: jxt_1.childEnum(Namespaces_1.NS_STANZAS, Object.values(Constants_1.StanzaErrorCondition), Constants_1.StanzaErrorCondition.UndefinedCondition),
        gone: jxt_1.childText(Namespaces_1.NS_STANZAS, Constants_1.StanzaErrorCondition.Gone),
        redirect: jxt_1.childText(Namespaces_1.NS_STANZAS, Constants_1.StanzaErrorCondition.Redirect),
        text: jxt_1.childText(Namespaces_1.NS_STANZAS, 'text'),
        type: jxt_1.attribute('type')
    },
    namespace: streamNS,
    type: streamNS,
    typeField: 'streamType'
}));
// --------------------------------------------------------------------
const baseIQFields = new Set([
    'from',
    'id',
    'lang',
    'to',
    'type',
    'payloadType',
    'error',
    'streamType'
]);
const _IQ = Object.values(Constants_1.StreamType).map((streamNS) => ({
    childrenExportOrder: {
        error: 200000
    },
    defaultType: Namespaces_1.NS_CLIENT,
    element: 'iq',
    fields: {
        from: jxt_1.JIDAttribute('from'),
        id: jxt_1.attribute('id'),
        lang: jxt_1.languageAttribute(),
        payloadType: {
            order: -10000,
            importer(xml, context) {
                if (context.data.type !== 'get' &&
                    context.data.type !== 'set') {
                    return;
                }
                const childCount = xml.children.filter(child => typeof child !== 'string')
                    .length;
                if (childCount !== 1) {
                    return 'invalid-payload-count';
                }
                const extensions = Object.keys(context.data).filter(key => !baseIQFields.has(key));
                if (extensions.length !== 1) {
                    return 'unknown-payload';
                }
                return extensions[0];
            }
        },
        to: jxt_1.JIDAttribute('to'),
        type: jxt_1.attribute('type')
    },
    namespace: streamNS,
    path: 'iq',
    type: streamNS,
    typeField: 'streamType'
}));
// --------------------------------------------------------------------
const _Message = Object.values(Constants_1.StreamType).map(streamNS => ({
    childrenExportOrder: {
        error: 200000
    },
    defaultType: Namespaces_1.NS_CLIENT,
    element: 'message',
    fields: {
        from: jxt_1.JIDAttribute('from'),
        id: jxt_1.attribute('id'),
        lang: jxt_1.languageAttribute(),
        to: jxt_1.JIDAttribute('to')
    },
    namespace: streamNS,
    path: 'message',
    type: streamNS,
    typeField: 'streamType'
}));
// --------------------------------------------------------------------
const _Presence = Object.values(Constants_1.StreamType).map(streamNS => ({
    childrenExportOrder: {
        error: 200000
    },
    defaultType: Namespaces_1.NS_CLIENT,
    element: 'presence',
    fields: {
        from: jxt_1.JIDAttribute('from'),
        id: jxt_1.attribute('id'),
        lang: jxt_1.languageAttribute(),
        to: jxt_1.JIDAttribute('to')
    },
    namespace: streamNS,
    path: 'presence',
    type: streamNS,
    typeField: 'streamType'
}));
// --------------------------------------------------------------------
const _SASL = [
    {
        element: 'mechanisms',
        fields: {
            mechanisms: jxt_1.multipleChildText(null, 'mechanism')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'features.sasl'
    },
    {
        element: 'abort',
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'abort',
        typeField: 'type'
    },
    {
        element: 'auth',
        fields: {
            mechanism: jxt_1.attribute('mechanism'),
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'auth',
        typeField: 'type'
    },
    {
        element: 'challenge',
        fields: {
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'challenge',
        typeField: 'type'
    },
    {
        element: 'response',
        fields: {
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'response',
        typeField: 'type'
    },
    {
        element: 'success',
        fields: {
            value: jxt_1.textBuffer('base64')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'success',
        typeField: 'type'
    },
    {
        element: 'failure',
        fields: {
            alternateLanguageText: jxt_1.childAlternateLanguageText(Namespaces_1.NS_SASL, 'text'),
            condition: jxt_1.childEnum(Namespaces_1.NS_SASL, Object.values(Constants_1.SASLFailureCondition)),
            text: jxt_1.childText(Namespaces_1.NS_SASL, 'text')
        },
        namespace: Namespaces_1.NS_SASL,
        path: 'sasl',
        type: 'failure',
        typeField: 'type'
    }
];
// --------------------------------------------------------------------
const _STARTTLS = [
    {
        aliases: ['features.tls'],
        defaultType: 'start',
        element: 'starttls',
        fields: {
            required: jxt_1.childBoolean(null, 'required')
        },
        namespace: Namespaces_1.NS_STARTTLS,
        path: 'tls',
        type: 'start',
        typeField: 'type'
    },
    {
        element: 'proceed',
        namespace: Namespaces_1.NS_STARTTLS,
        path: 'tls',
        type: 'proceed',
        typeField: 'type'
    },
    {
        element: 'failure',
        namespace: Namespaces_1.NS_STARTTLS,
        path: 'tls',
        type: 'failure',
        typeField: 'type'
    }
];
// --------------------------------------------------------------------
const _Bind = {
    aliases: ['features.bind', 'iq.bind'],
    element: 'bind',
    fields: {
        jid: jxt_1.childText(null, 'jid'),
        resource: jxt_1.childText(null, 'resource')
    },
    namespace: Namespaces_1.NS_BIND
};
// --------------------------------------------------------------------
const Protocol = [
    _Stream,
    _StreamFeatures,
    _StreamError,
    ..._StanzaError,
    ..._SASL,
    ..._STARTTLS,
    ..._IQ,
    ..._Message,
    ..._Presence,
    _Bind
];
exports.default = Protocol;
