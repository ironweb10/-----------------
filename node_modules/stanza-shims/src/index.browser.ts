import createHash, { Hash } from './crypto/createHash';
import Hmac from './crypto/Hmac';

let root: any;
if (typeof window !== 'undefined') {
    root = window;
} else if (typeof global !== 'undefined') {
    root = global;
}

export function randomBytes(size: number) {
    const rawBytes = new Uint8Array(size);
    if (size > 0) {
        (root.crypto || root.msCrypto).getRandomValues(rawBytes);
    }
    return Buffer.from(rawBytes.buffer);
}

export function getHashes() {
    return ['sha-1', 'sha-256', 'sha-512', 'md5'];
}

export function createHmac(alg: string, key: string | Buffer): Hmac {
    return new Hmac(alg.toLowerCase(), key);
}

const nativeFetch = fetch.bind(window);
const nativeWS = WebSocket;

const nativeRTCPeerConnection: RTCPeerConnection | undefined = root.RTCPeerConnection;

export {
    createHash,
    Hash,
    Hmac,
    nativeFetch as fetch,
    nativeWS as WebSocket,
    nativeRTCPeerConnection as RTCPeerConnection
};
