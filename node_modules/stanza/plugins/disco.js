"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DiscoManager_1 = tslib_1.__importDefault(require("../helpers/DiscoManager"));
const JID = tslib_1.__importStar(require("../JID"));
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.disco = new DiscoManager_1.default();
    client.disco.addFeature(Namespaces_1.NS_DISCO_INFO);
    client.disco.addFeature(Namespaces_1.NS_DISCO_ITEMS);
    client.disco.addIdentity({
        category: 'client',
        type: 'web'
    });
    client.registerFeature('caps', 100, (features, done) => {
        const domain = JID.getDomain(client.jid) || client.config.server;
        client.emit('disco:caps', {
            caps: features.legacyCapabilities || [],
            jid: domain
        });
        client.features.negotiated.caps = true;
        done();
    });
    client.getDiscoInfo = async (jid, node) => {
        const resp = await client.sendIQ({
            disco: {
                node,
                type: 'info'
            },
            to: jid,
            type: 'get'
        });
        return {
            extensions: [],
            features: [],
            identities: [],
            ...resp.disco
        };
    };
    client.getDiscoItems = async (jid, node) => {
        const resp = await client.sendIQ({
            disco: {
                node,
                type: 'items'
            },
            to: jid,
            type: 'get'
        });
        return {
            items: [],
            ...resp.disco
        };
    };
    client.updateCaps = () => {
        const node = client.config.capsNode || 'https://stanzajs.org';
        return client.disco.updateCaps(node);
    };
    client.getCurrentCaps = () => {
        const caps = client.disco.getCaps();
        if (!caps) {
            return;
        }
        const node = `${caps[0].node}#${caps[0].value}`;
        return {
            info: client.disco.getNodeInfo(node),
            legacyCapabilities: caps
        };
    };
    client.on('presence', pres => {
        if (pres.legacyCapabilities) {
            client.emit('disco:caps', {
                caps: pres.legacyCapabilities,
                jid: pres.from
            });
        }
    });
    client.on('iq:get:disco', iq => {
        const { type, node } = iq.disco;
        if (type === 'info') {
            client.sendIQResult(iq, {
                disco: {
                    ...client.disco.getNodeInfo(node || ''),
                    node,
                    type: 'info'
                }
            });
        }
        if (type === 'items') {
            client.sendIQResult(iq, {
                disco: {
                    items: client.disco.items.get(node || '') || [],
                    type: 'items'
                }
            });
        }
    });
}
exports.default = default_1;
