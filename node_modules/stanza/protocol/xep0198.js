"use strict";
// ====================================================================
// XEP-0198: Stream Management
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0198.html
// Version: 1.5.2 (2016-12-08)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendStreamFeatures({
        streamManagement: jxt_1.childBoolean(Namespaces_1.NS_SMACKS_3, 'sm')
    }),
    {
        element: 'a',
        fields: {
            handled: jxt_1.integerAttribute('h')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'ack',
        typeField: 'type'
    },
    {
        element: 'r',
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'request',
        typeField: 'type'
    },
    {
        element: 'enable',
        fields: {
            allowResumption: jxt_1.booleanAttribute('resume')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'enable',
        typeField: 'type'
    },
    {
        element: 'enabled',
        fields: {
            id: jxt_1.attribute('id'),
            resume: jxt_1.booleanAttribute('resume')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'enabled',
        typeField: 'type'
    },
    {
        element: 'resume',
        fields: {
            handled: jxt_1.integerAttribute('h'),
            previousSession: jxt_1.attribute('previd')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'resume',
        typeField: 'type'
    },
    {
        element: 'resumed',
        fields: {
            handled: jxt_1.integerAttribute('h'),
            previousSession: jxt_1.attribute('previd')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'resumed',
        typeField: 'type'
    },
    {
        element: 'failed',
        fields: {
            handled: jxt_1.integerAttribute('h')
        },
        namespace: Namespaces_1.NS_SMACKS_3,
        path: 'sm',
        type: 'failed',
        typeField: 'type'
    }
];
exports.default = Protocol;
