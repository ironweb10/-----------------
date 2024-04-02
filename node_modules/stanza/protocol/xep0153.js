"use strict";
// ====================================================================
// XEP-0153: vCard-Based Avatars
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0153.html
// Version: 1.1 (2018-02-26)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
exports.default = jxt_1.extendPresence({
    vcardAvatar: {
        importer(xml) {
            const update = jxt_1.findAll(xml, Namespaces_1.NS_VCARD_TEMP_UPDATE, 'x');
            if (!update.length) {
                return;
            }
            const photo = jxt_1.findAll(update[0], Namespaces_1.NS_VCARD_TEMP_UPDATE, 'photo');
            if (photo.length) {
                return photo[0].getText();
            }
            else {
                return true;
            }
        },
        exporter(xml, value) {
            const update = jxt_1.findOrCreate(xml, Namespaces_1.NS_VCARD_TEMP_UPDATE, 'x');
            if (value === '') {
                jxt_1.findOrCreate(update, Namespaces_1.NS_VCARD_TEMP_UPDATE, 'photo');
            }
            else if (value === true) {
                return;
            }
            else if (value) {
                const photo = jxt_1.findOrCreate(update, Namespaces_1.NS_VCARD_TEMP_UPDATE, 'photo');
                photo.children.push(value);
            }
        }
    }
});
