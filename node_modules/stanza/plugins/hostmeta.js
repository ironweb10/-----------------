"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostMeta = void 0;
const tslib_1 = require("tslib");
const stanza_shims_1 = require("stanza-shims");
const JXT = tslib_1.__importStar(require("../jxt"));
const Namespaces_1 = require("../Namespaces");
async function promiseAny(promises) {
    try {
        const errors = await Promise.all(promises.map(p => {
            return p.then(val => Promise.reject(val), err => Promise.resolve(err));
        }));
        return Promise.reject(errors);
    }
    catch (val) {
        return Promise.resolve(val);
    }
}
async function getHostMeta(registry, opts) {
    if (typeof opts === 'string') {
        opts = { host: opts };
    }
    const config = {
        json: true,
        ssl: true,
        xrd: true,
        ...opts
    };
    const scheme = config.ssl ? 'https://' : 'http://';
    return promiseAny([
        stanza_shims_1.fetch(`${scheme}${config.host}/.well-known/host-meta.json`).then(async (res) => {
            if (!res.ok) {
                throw new Error('could-not-fetch-json');
            }
            return res.json();
        }),
        stanza_shims_1.fetch(`${scheme}${config.host}/.well-known/host-meta`).then(async (res) => {
            if (!res.ok) {
                throw new Error('could-not-fetch-xml');
            }
            const data = await res.text();
            const xml = JXT.parse(data);
            if (xml) {
                return registry.import(xml);
            }
        })
    ]);
}
exports.getHostMeta = getHostMeta;
function default_1(client, stanzas) {
    client.discoverBindings = async (server) => {
        try {
            const data = await getHostMeta(stanzas, server);
            const results = {
                bosh: [],
                websocket: []
            };
            const links = data.links || [];
            for (const link of links) {
                if (link.href && link.rel === Namespaces_1.NS_ALT_CONNECTIONS_WEBSOCKET) {
                    results.websocket.push(link.href);
                }
                if (link.href && link.rel === Namespaces_1.NS_ALT_CONNECTIONS_XBOSH) {
                    results.bosh.push(link.href);
                }
            }
            return results;
        }
        catch (err) {
            return {};
        }
    };
}
exports.default = default_1;
