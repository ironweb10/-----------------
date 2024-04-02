"use strict";
// ====================================================================
// XEP-0158: CAPTCHA Forms
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0158.html
// Version: 1.0 (2008-09-03)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        captcha: jxt_1.splicePath(Namespaces_1.NS_CAPTCHA, 'captcha', 'dataform')
    }),
    jxt_1.extendIQ({
        captcha: jxt_1.splicePath(Namespaces_1.NS_CAPTCHA, 'captcha', 'dataform')
    })
];
exports.default = Protocol;
