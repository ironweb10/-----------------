"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EntityCaps = tslib_1.__importStar(require("./LegacyEntityCapabilities"));
class Disco {
    constructor() {
        this.capsAlgorithms = ['sha-1'];
        this.features = new Map();
        this.identities = new Map();
        this.extensions = new Map();
        this.items = new Map();
        this.caps = new Map();
        this.features.set('', new Set());
        this.identities.set('', []);
        this.extensions.set('', []);
    }
    getNodeInfo(node) {
        return {
            extensions: [...(this.extensions.get(node) || [])],
            features: [...(this.features.get(node) || [])],
            identities: [...(this.identities.get(node) || [])]
        };
    }
    addFeature(feature, node = '') {
        if (!this.features.has(node)) {
            this.features.set(node, new Set());
        }
        this.features.get(node).add(feature);
    }
    addIdentity(identity, node = '') {
        if (!this.identities.has(node)) {
            this.identities.set(node, []);
        }
        this.identities.get(node).push(identity);
    }
    addItem(item, node = '') {
        if (!this.items.has(node)) {
            this.items.set(node, []);
        }
        this.items.get(node).push(item);
    }
    addExtension(form, node = '') {
        if (!this.extensions.has(node)) {
            this.extensions.set(node, []);
        }
        this.extensions.get(node).push(form);
    }
    updateCaps(node, algorithms = this.capsAlgorithms) {
        const info = {
            extensions: [...this.extensions.get('')],
            features: [...this.features.get('')],
            identities: [...this.identities.get('')],
            type: 'info'
        };
        for (const algorithm of algorithms) {
            const version = EntityCaps.generate(info, algorithm);
            if (!version) {
                this.caps.delete(algorithm);
                continue;
            }
            this.caps.set(algorithm, {
                algorithm,
                node,
                value: version
            });
            const hashedNode = `${node}#${version}`;
            for (const feature of info.features) {
                this.addFeature(feature, hashedNode);
            }
            for (const identity of info.identities) {
                this.addIdentity(identity, hashedNode);
            }
            for (const form of info.extensions) {
                this.addExtension(form, hashedNode);
            }
            this.identities.set(hashedNode, info.identities);
            this.features.set(hashedNode, new Set(info.features));
            this.extensions.set(hashedNode, info.extensions);
        }
        return [...this.caps.values()];
    }
    getCaps() {
        return [...this.caps.values()];
    }
}
exports.default = Disco;
