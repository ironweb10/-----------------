"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const createHash_1 = tslib_1.__importStar(require("./crypto/createHash"));
exports.createHash = createHash_1.default;
exports.Hash = createHash_1.Hash;
const Hmac_1 = tslib_1.__importDefault(require("./crypto/Hmac"));
exports.Hmac = Hmac_1.default;
let root;
if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global;
}
function randomBytes(size) {
    const rawBytes = new Uint8Array(size);
    if (size > 0) {
        (root.crypto || root.msCrypto).getRandomValues(rawBytes);
    }
    return Buffer.from(rawBytes.buffer);
}
exports.randomBytes = randomBytes;
function getHashes() {
    return ['sha-1', 'sha-256', 'sha-512', 'md5'];
}
exports.getHashes = getHashes;
function createHmac(alg, key) {
    return new Hmac_1.default(alg.toLowerCase(), key);
}
exports.createHmac = createHmac;
const nativeFetch = fetch.bind(window);
exports.fetch = nativeFetch;
const nativeWS = WebSocket;
exports.WebSocket = nativeWS;
const nativeRTCPeerConnection = root.RTCPeerConnection;
exports.RTCPeerConnection = nativeRTCPeerConnection;
