"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hashes = tslib_1.__importStar(require("stanza-shims"));
const Constants_1 = require("../Constants");
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.disco.addFeature('jid\\20escaping');
    client.disco.addFeature(Namespaces_1.NS_DELAY);
    client.disco.addFeature(Namespaces_1.NS_EME_0);
    client.disco.addFeature(Namespaces_1.NS_FORWARD_0);
    client.disco.addFeature(Namespaces_1.NS_HASHES_2);
    client.disco.addFeature(Namespaces_1.NS_HASHES_1);
    client.disco.addFeature(Namespaces_1.NS_IDLE_1);
    client.disco.addFeature(Namespaces_1.NS_JSON_0);
    client.disco.addFeature(Namespaces_1.NS_OOB);
    client.disco.addFeature(Namespaces_1.NS_PSA);
    client.disco.addFeature(Namespaces_1.NS_REFERENCE_0);
    client.disco.addFeature(Namespaces_1.NS_SHIM);
    client.disco.addFeature(Namespaces_1.NS_DATAFORM);
    client.disco.addFeature(Namespaces_1.NS_DATAFORM_MEDIA);
    client.disco.addFeature(Namespaces_1.NS_DATAFORM_VALIDATION);
    client.disco.addFeature(Namespaces_1.NS_DATAFORM_LAYOUT);
    const names = hashes.getHashes();
    for (const name of names) {
        client.disco.addFeature(Namespaces_1.NS_HASH_NAME(name));
    }
    client.disco.addFeature(Namespaces_1.NS_TIME);
    client.disco.addFeature(Namespaces_1.NS_VERSION);
    client.on('iq:get:softwareVersion', iq => {
        return client.sendIQResult(iq, {
            softwareVersion: client.config.softwareVersion || {
                name: 'stanzajs.org',
                version: Constants_1.VERSION
            }
        });
    });
    client.on('iq:get:time', (iq) => {
        const time = new Date();
        client.sendIQResult(iq, {
            time: {
                tzo: time.getTimezoneOffset(),
                utc: time
            }
        });
    });
    client.getSoftwareVersion = async (jid) => {
        const resp = await client.sendIQ({
            softwareVersion: {},
            to: jid,
            type: 'get'
        });
        return resp.softwareVersion;
    };
    client.getTime = async (jid) => {
        const resp = await client.sendIQ({
            time: {},
            to: jid,
            type: 'get'
        });
        return resp.time;
    };
    client.getLastActivity = async (jid) => {
        const resp = await client.sendIQ({
            lastActivity: {},
            to: jid,
            type: 'get'
        });
        return resp.lastActivity;
    };
}
exports.default = default_1;
