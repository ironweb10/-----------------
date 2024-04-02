"use strict";
// ====================================================================
// XEP-0334: Message Processing Hints
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0334.html
// Version: 0.3.0 (2018-01-25)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
function processingHints() {
    return {
        importer(xml) {
            const results = {};
            let found = false;
            for (const child of xml.children) {
                /* istanbul ignore next */
                if (typeof child === 'string') {
                    continue;
                }
                if (child.getNamespace() !== Namespaces_1.NS_HINTS) {
                    continue;
                }
                switch (child.getName()) {
                    case 'no-copy':
                        results.noCopy = true;
                        found = true;
                        break;
                    case 'no-permanent-store':
                        results.noPermanentStore = true;
                        found = true;
                        break;
                    case 'no-store':
                        results.noStore = true;
                        found = true;
                        break;
                    case 'store':
                        results.store = true;
                        found = true;
                        break;
                }
            }
            return found ? results : undefined;
        },
        exporter(xml, value, context) {
            if (value.noCopy) {
                xml.appendChild(jxt_1.createElement(Namespaces_1.NS_HINTS, 'no-copy', context.namespace, xml));
            }
            if (value.noPermanentStore) {
                xml.appendChild(jxt_1.createElement(Namespaces_1.NS_HINTS, 'no-permanent-store', context.namespace, xml));
            }
            if (value.noStore) {
                xml.appendChild(jxt_1.createElement(Namespaces_1.NS_HINTS, 'no-store', context.namespace, xml));
            }
            if (value.store) {
                xml.appendChild(jxt_1.createElement(Namespaces_1.NS_HINTS, 'store', context.namespace, xml));
            }
        }
    };
}
exports.default = jxt_1.extendMessage({
    processingHints: processingHints()
});
