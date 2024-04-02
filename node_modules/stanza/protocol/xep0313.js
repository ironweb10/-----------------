"use strict";
// ====================================================================
// XEP-0313: Message Archive Management
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0313.html
// Version: 0.6.1 (2017-02-22)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const versions = {
    '2': Namespaces_1.NS_MAM_2,
    '1': Namespaces_1.NS_MAM_1
};
const Protocol = [
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', ['iq.archive.form']),
    jxt_1.addAlias(Namespaces_1.NS_FORWARD_0, 'forwarded', ['message.archive.item']),
    jxt_1.addAlias(Namespaces_1.NS_RSM, 'set', ['iq.archive.paging'])
];
for (const [version, namespace] of Object.entries(versions)) {
    Protocol.push({
        defaultType: 'query',
        defaultVersion: '2',
        element: 'query',
        fields: {
            node: jxt_1.attribute('node'),
            queryId: jxt_1.attribute('queryid')
        },
        namespace,
        path: 'iq.archive',
        type: 'query',
        typeField: 'type',
        version,
        versionField: 'version'
    }, {
        element: 'fin',
        fields: {
            complete: jxt_1.booleanAttribute('complete'),
            stable: jxt_1.booleanAttribute('stable')
        },
        namespace,
        path: 'iq.archive',
        type: 'result',
        version
    }, {
        element: 'prefs',
        fields: {
            default: jxt_1.attribute('default'),
            always: jxt_1.deepMultipleChildText([
                { namespace: null, element: 'always' },
                { namespace: null, element: 'jid' }
            ]),
            never: jxt_1.deepMultipleChildText([
                { namespace: null, element: 'never' },
                { namespace: null, element: 'jid' }
            ])
        },
        namespace,
        path: 'iq.archive',
        type: 'preferences',
        version
    }, {
        element: 'result',
        defaultType: '2',
        fields: {
            id: jxt_1.attribute('id'),
            queryId: jxt_1.attribute('queryid')
        },
        namespace,
        path: 'message.archive',
        type: version,
        typeField: 'version'
    });
}
exports.default = Protocol;
