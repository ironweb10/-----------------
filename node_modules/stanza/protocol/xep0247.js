"use strict";
// ====================================================================
// XEP-0247: Jingle XML Streams
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0247.html
// Version: 0.2 (2009-02-20)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'description',
    namespace: Namespaces_1.NS_JINGLE_XML_0,
    path: 'iq.jingle.contents.application',
    type: Namespaces_1.NS_JINGLE_XML_0,
    typeField: 'applicationType'
};
exports.default = Protocol;
