"use strict";
// ====================================================================
// XEP-0049: Private XML Storage
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0049.html
// Version: 1.2 (2004-03-01)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
// tslint:enable
const Protocol = {
    element: 'query',
    namespace: Namespaces_1.NS_PRIVATE,
    path: 'iq.privateStorage'
};
exports.default = Protocol;
