"use strict";
// ====================================================================
// XEP-0092: Software Version
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0092.html
// Version: 1.1 (2007-02-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = {
    element: 'query',
    fields: {
        name: jxt_1.childText(null, 'name'),
        os: jxt_1.childText(null, 'os'),
        version: jxt_1.childText(null, 'version')
    },
    namespace: Namespaces_1.NS_VERSION,
    path: 'iq.softwareVersion'
};
exports.default = Protocol;
