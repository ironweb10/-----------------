"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.getAccountInfo = async (jid) => {
        const resp = await client.sendIQ({
            account: {},
            to: jid,
            type: 'get'
        });
        return resp.account;
    };
    client.updateAccount = (jid, data) => {
        return client.sendIQ({
            account: data,
            to: jid,
            type: 'set'
        });
    };
    client.deleteAccount = (jid) => {
        return client.sendIQ({
            account: {
                remove: true
            },
            to: jid,
            type: 'set'
        });
    };
    client.getPrivateData = async (key) => {
        const res = await client.sendIQ({
            privateStorage: {
                [key]: {}
            },
            type: 'get'
        });
        return res.privateStorage[key];
    };
    client.setPrivateData = async (key, value) => {
        return client.sendIQ({
            privateStorage: {
                [key]: value
            },
            type: 'set'
        });
    };
    client.getVCard = async (jid) => {
        const resp = await client.sendIQ({
            to: jid,
            type: 'get',
            vcard: {
                format: Namespaces_1.NS_VCARD_TEMP
            }
        });
        return resp.vcard;
    };
    client.publishVCard = async (vcard) => {
        await client.sendIQ({
            type: 'set',
            vcard
        });
    };
    client.enableNotifications = (jid, node, fieldList = []) => {
        return client.sendIQ({
            push: {
                action: 'enable',
                form: {
                    fields: [
                        {
                            name: 'FORM_TYPE',
                            type: 'hidden',
                            value: 'http://jabber.org/protocol/pubsub#publish-options'
                        },
                        ...fieldList
                    ],
                    type: 'submit'
                },
                jid,
                node
            },
            type: 'set'
        });
    };
    client.disableNotifications = (jid, node) => {
        return client.sendIQ({
            push: {
                action: 'disable',
                jid,
                node
            },
            type: 'set'
        });
    };
}
exports.default = default_1;
