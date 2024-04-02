"use strict";
// ====================================================================
// XEP-0080: User Location
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0080.html
// Version: 1.9 (2015-12-01)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0350: Data Forms Geolocation Element
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0350.html
// Version: 0.2 (2017-09-11)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    aliases: [
        { path: 'message.geoloc', impliedType: true },
        { path: 'dataform.fields.geoloc', impliedType: true },
        ...jxt_1.pubsubItemContentAliases()
    ],
    element: 'geoloc',
    fields: {
        accuracy: jxt_1.childFloat(null, 'accuracy'),
        altitude: jxt_1.childFloat(null, 'alt'),
        altitudeAccuracy: jxt_1.childFloat(null, 'altaccuracy'),
        area: jxt_1.childText(null, 'area'),
        building: jxt_1.childText(null, 'building'),
        country: jxt_1.childText(null, 'country'),
        countryCode: jxt_1.childText(null, 'countrycode'),
        datum: jxt_1.childText(null, 'datum'),
        description: jxt_1.childText(null, 'description'),
        error: jxt_1.childFloat(null, 'error'),
        floor: jxt_1.childText(null, 'floor'),
        heading: jxt_1.childFloat(null, 'bearing'),
        lang: jxt_1.languageAttribute(),
        latitude: jxt_1.childFloat(null, 'lat'),
        locality: jxt_1.childText(null, 'locality'),
        longitude: jxt_1.childFloat(null, 'lon'),
        postalCode: jxt_1.childText(null, 'postalcode'),
        region: jxt_1.childText(null, 'region'),
        room: jxt_1.childText(null, 'room'),
        speed: jxt_1.childFloat(null, 'speed'),
        street: jxt_1.childText(null, 'street'),
        text: jxt_1.childText(null, 'text'),
        timestamp: jxt_1.childDate(null, 'timestamp'),
        tzo: jxt_1.childTimezoneOffset(null, 'tzo'),
        uri: jxt_1.childText(null, 'uri')
    },
    namespace: Namespaces_1.NS_GEOLOC,
    type: Namespaces_1.NS_GEOLOC
};
exports.default = Protocol;
