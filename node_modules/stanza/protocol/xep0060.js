"use strict";
// ====================================================================
// XEP-0060: Publish-Subscribe
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0060.html
// Version: 1.15.1 (2018-02-02)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const dateOrPresenceAttribute = (name) => ({
    importer(xml) {
        const data = xml.getAttribute(name);
        if (data === 'presence') {
            return data;
        }
        if (data) {
            return new Date(data);
        }
    },
    exporter(xml, value) {
        let data;
        if (typeof value === 'string') {
            data = value;
        }
        else {
            data = value.toISOString();
        }
        xml.setAttribute(name, data);
    }
});
const SubscriptionFields = {
    configurable: jxt_1.childBoolean(null, 'subscribe-options'),
    configurationRequired: jxt_1.deepChildBoolean([
        { namespace: null, element: 'subscribe-options' },
        { namespace: null, element: 'required' }
    ]),
    jid: jxt_1.JIDAttribute('jid'),
    node: jxt_1.attribute('node'),
    state: jxt_1.attribute('subscription'),
    subid: jxt_1.attribute('subid')
};
const NodeOnlyField = {
    node: jxt_1.attribute('node')
};
const Protocol = [
    {
        aliases: ['pubsub', 'iq.pubsub', 'message.pubsub'],
        childrenExportOrder: {
            configure: 0,
            create: 100,
            publish: 100,
            subscribe: 100,
            subscriptionOptions: 0
        },
        defaultType: 'user',
        element: 'pubsub',
        fields: {
            publishOptions: jxt_1.splicePath(null, 'publish-options', 'dataform')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user',
        typeField: 'context'
    },
    {
        aliases: ['pubsub', 'iq.pubsub', 'message.pubsub'],
        defaultType: 'user',
        element: 'pubsub',
        fields: {
            purge: jxt_1.childAttribute(null, 'purge', 'node')
        },
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner',
        typeField: 'context'
    },
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', [
        'iq.pubsub.configure.form',
        'iq.pubsub.defaultConfiguration.form',
        'iq.pubsub.defaultSubscriptionOptions.form',
        'iq.pubsub.subscriptionOptions.form',
        'message.pubsub.configuration.form'
    ]),
    jxt_1.addAlias(Namespaces_1.NS_RSM, 'set', ['iq.pubsub.fetch.paging']),
    jxt_1.extendStanzaError({
        pubsubError: jxt_1.childEnum(Namespaces_1.NS_PUBSUB_ERRORS, Object.values(Constants_1.PubsubErrorCondition)),
        pubsubUnsupportedFeature: jxt_1.childAttribute(Namespaces_1.NS_PUBSUB_ERRORS, 'unsupported', 'feature')
    }),
    {
        element: 'subscribe',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.subscribe'
    },
    {
        element: 'unsubscribe',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node'),
            subid: jxt_1.attribute('subid')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.unsubscribe'
    },
    {
        element: 'options',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node'),
            subid: jxt_1.attribute('subid')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.subscriptionOptions'
    },
    {
        aliases: [{ path: 'iq.pubsub.subscriptions', selector: 'user', impliedType: true }],
        element: 'subscriptions',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user'
    },
    {
        aliases: [{ path: 'iq.pubsub.subscriptions', selector: 'owner', impliedType: true }],
        element: 'subscriptions',
        fields: {
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner'
    },
    {
        aliases: [
            { path: 'iq.pubsub.subscription', selector: 'owner' },
            {
                impliedType: true,
                multiple: true,
                path: 'iq.pubsub.subscriptions.items',
                selector: 'owner'
            }
        ],
        element: 'subscription',
        fields: SubscriptionFields,
        namespace: Namespaces_1.NS_PUBSUB
    },
    {
        aliases: [
            { path: 'iq.pubsub.subscription', selector: 'user' },
            {
                impliedType: true,
                multiple: true,
                path: 'iq.pubsub.subscriptions.items',
                selector: 'user'
            }
        ],
        element: 'subscription',
        fields: SubscriptionFields,
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.pubsub.subscriptions.items',
                selector: 'owner'
            }
        ],
        element: 'subscription',
        fields: SubscriptionFields,
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner'
    },
    {
        aliases: [
            { path: 'iq.pubsub.affiliations', selector: 'user', impliedType: true },
            { path: 'message.pubsub.affiliations', selector: 'user', impliedType: true }
        ],
        element: 'affiliations',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user'
    },
    {
        aliases: [{ path: 'iq.pubsub.affiliations', selector: 'owner', impliedType: true }],
        element: 'affiliations',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.pubsub.affiliations.items',
                selector: 'user'
            },
            {
                impliedType: true,
                multiple: true,
                path: 'message.pubsub.affiliations.items',
                selector: 'user'
            }
        ],
        element: 'affiliation',
        fields: {
            affiliation: jxt_1.attribute('affiliation'),
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user'
    },
    {
        aliases: [
            {
                impliedType: true,
                multiple: true,
                path: 'iq.pubsub.affiliations.items',
                selector: 'owner'
            }
        ],
        element: 'affiliation',
        fields: {
            affiliation: jxt_1.attribute('affiliation'),
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner'
    },
    {
        element: 'create',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.create'
    },
    {
        aliases: [{ path: 'iq.pubsub.destroy', selector: 'owner' }],
        element: 'delete',
        fields: {
            node: jxt_1.attribute('node'),
            redirect: jxt_1.childAttribute(null, 'redirect', 'uri')
        },
        namespace: Namespaces_1.NS_PUBSUB_OWNER
    },
    {
        aliases: [{ path: 'iq.pubsub.configure', selector: 'owner', impliedType: true }],
        element: 'configure',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        type: 'owner'
    },
    {
        aliases: [{ path: 'iq.pubsub.configure', selector: 'user', impliedType: true }],
        element: 'configure',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB,
        type: 'user'
    },
    {
        element: 'default',
        fields: {
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.defaultSubscriptionOptions'
    },
    {
        element: 'default',
        fields: {},
        namespace: Namespaces_1.NS_PUBSUB_OWNER,
        path: 'iq.pubsub.defaultConfiguration'
    },
    {
        element: 'publish',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.publish'
    },
    {
        element: 'retract',
        fields: {
            id: jxt_1.childAttribute(null, 'item', 'id'),
            node: jxt_1.attribute('node'),
            notify: jxt_1.booleanAttribute('notify')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.retract'
    },
    {
        element: 'items',
        fields: {
            max: jxt_1.integerAttribute('max_items'),
            node: jxt_1.attribute('node')
        },
        namespace: Namespaces_1.NS_PUBSUB,
        path: 'iq.pubsub.fetch'
    },
    {
        aliases: [
            'pubsubitem',
            'iq.pubsub.publish.item',
            { multiple: true, path: 'iq.pubsub.fetch.items' }
        ],
        element: 'item',
        fields: {
            id: jxt_1.attribute('id'),
            publisher: jxt_1.JIDAttribute('publisher')
        },
        namespace: Namespaces_1.NS_PUBSUB
    },
    {
        element: 'event',
        fields: {
            eventType: jxt_1.childEnum(null, [
                'purge',
                'delete',
                'subscription',
                'configuration',
                'items'
            ])
        },
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'message.pubsub',
        type: 'event',
        typeField: 'context'
    },
    {
        aliases: [{ path: 'message.pubsub.items.published', multiple: true }],
        element: 'item',
        fields: {
            id: jxt_1.attribute('id'),
            publisher: jxt_1.JIDAttribute('publisher')
        },
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'pubsubeventitem'
    },
    {
        element: 'purge',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'message.pubsub.purge'
    },
    {
        element: 'delete',
        fields: {
            node: jxt_1.attribute('node'),
            redirect: jxt_1.childAttribute(null, 'redirect', 'uri')
        },
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'message.pubsub.delete'
    },
    {
        aliases: [{ path: 'message.pubsub.subscription', selector: 'event', impliedType: true }],
        element: 'subscription',
        fields: {
            expires: dateOrPresenceAttribute('expiry'),
            jid: jxt_1.JIDAttribute('jid'),
            node: jxt_1.attribute('node'),
            subid: jxt_1.attribute('subid'),
            type: jxt_1.attribute('subscription')
        },
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        type: 'event'
    },
    {
        element: 'configuration',
        fields: NodeOnlyField,
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'message.pubsub.configuration'
    },
    {
        element: 'items',
        fields: {
            node: jxt_1.attribute('node'),
            retracted: jxt_1.multipleChildAttribute(null, 'retract', 'id')
        },
        namespace: Namespaces_1.NS_PUBSUB_EVENT,
        path: 'message.pubsub.items'
    }
];
exports.default = Protocol;
