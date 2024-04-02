"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Hash_1 = tslib_1.__importDefault(require("./Hash"));
exports.Hash = Hash_1.default;
const MD5_1 = tslib_1.__importDefault(require("./MD5"));
const SHA_1_1 = tslib_1.__importDefault(require("./SHA-1"));
const SHA_256_1 = tslib_1.__importDefault(require("./SHA-256"));
const SHA_512_1 = tslib_1.__importDefault(require("./SHA-512"));
const HASH_IMPLEMENTATIONS = new Map([
    ['md5', MD5_1.default],
    ['sha-1', SHA_1_1.default],
    ['sha-256', SHA_256_1.default],
    ['sha-512', SHA_512_1.default],
    ['sha1', SHA_1_1.default],
    ['sha256', SHA_256_1.default],
    ['sha512', SHA_512_1.default]
]);
function createHash(alg) {
    alg = alg.toLowerCase();
    const HashImp = HASH_IMPLEMENTATIONS.get(alg);
    if (HashImp) {
        return new HashImp();
    }
    else {
        throw new Error('Unsupported hash algorithm: ' + alg);
    }
}
exports.default = createHash;
