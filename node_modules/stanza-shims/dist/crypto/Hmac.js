"use strict";
/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - create-hash, Copyright (c) 2017 crypto-browserify contributors
 * - create-hmac, Copyright (c) 2017 crypto-browserify contributors
 * - randombytes, Copyright (c) 2017 crypto-browserify
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable no-bitwise
const readable_stream_1 = require("readable-stream");
const createHash_1 = tslib_1.__importDefault(require("./createHash"));
const ZEROS = Buffer.alloc(128);
class Hmac extends readable_stream_1.Transform {
    constructor(alg, key) {
        super();
        if (typeof key === 'string') {
            key = Buffer.from(key);
        }
        const blocksize = alg === 'sha512' ? 128 : 64;
        this._alg = alg;
        if (key.length > blocksize) {
            key = createHash_1.default(alg)
                .update(key)
                .digest();
        }
        else if (key.length < blocksize) {
            key = Buffer.concat([key, ZEROS], blocksize);
        }
        this._ipad = Buffer.alloc(blocksize);
        this._opad = Buffer.alloc(blocksize);
        for (let i = 0; i < blocksize; i++) {
            this._ipad[i] = key[i] ^ 0x36;
            this._opad[i] = key[i] ^ 0x5c;
        }
        this._hash = createHash_1.default(alg).update(this._ipad);
    }
    _transform(data, enc, next) {
        let err;
        try {
            this.update(data, enc);
        }
        catch (e) {
            err = e;
        }
        finally {
            next(err);
        }
    }
    _flush(done) {
        let err;
        try {
            this.push(this._final());
        }
        catch (e) {
            err = e;
        }
        done(err);
    }
    _final() {
        const h = this._hash.digest();
        return createHash_1.default(this._alg)
            .update(this._opad)
            .update(h)
            .digest();
    }
    update(data, inputEnc) {
        this._hash.update(data, inputEnc);
        return this;
    }
    digest(outputEnc) {
        const outData = this._final() || Buffer.alloc(0);
        if (outputEnc) {
            return outData.toString(outputEnc);
        }
        return outData;
    }
}
exports.default = Hmac;
