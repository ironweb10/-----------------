"use strict";
// ====================================================================
// XEP-0077: In-Band Registration
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0077.html
// Version: 2.4 (2012-01-253)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendStreamFeatures({
        inbandRegistration: jxt_1.childBoolean(Namespaces_1.NS_INBAND_REGISTRATION, 'register')
    }),
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', ['iq.account.form']),
    jxt_1.addAlias(Namespaces_1.NS_OOB, 'x', ['iq.account.registrationLink']),
    {
        element: 'query',
        fields: {
            address: jxt_1.childText(null, 'address'),
            date: jxt_1.childDate(null, 'date'),
            email: jxt_1.childText(null, 'email'),
            familyName: jxt_1.childText(null, 'last'),
            fullName: jxt_1.childText(null, 'name'),
            givenName: jxt_1.childText(null, 'first'),
            instructions: jxt_1.childText(null, 'instructions'),
            key: jxt_1.childText(null, 'key'),
            locality: jxt_1.childText(null, 'city'),
            misc: jxt_1.childText(null, 'misc'),
            nick: jxt_1.childText(null, 'nick'),
            password: jxt_1.childText(null, 'password'),
            phone: jxt_1.childText(null, 'phone'),
            postalCode: jxt_1.childText(null, 'zip'),
            region: jxt_1.childText(null, 'state'),
            registered: jxt_1.childBoolean(null, 'registered'),
            remove: jxt_1.childBoolean(null, 'remove'),
            text: jxt_1.childText(null, 'text'),
            uri: jxt_1.childText(null, 'uri'),
            username: jxt_1.childText(null, 'username')
        },
        namespace: Namespaces_1.NS_REGISTER,
        path: 'iq.account'
    }
];
exports.default = Protocol;
