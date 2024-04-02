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
/// <reference types="node" />
import { Transform } from 'readable-stream';
export default class Hmac extends Transform {
    private _alg;
    private _hash;
    private _ipad;
    private _opad;
    constructor(alg: string, key: string | Buffer);
    _transform(data: Buffer | string, enc: string | undefined, next: (err?: Error) => void): void;
    _flush(done: (err?: Error) => void): void;
    _final(): Buffer;
    update(data: Buffer | string, inputEnc?: string): this;
    digest(outputEnc?: string): string | Buffer;
}
