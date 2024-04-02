/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - md5.js, Copyright (c) 2016 Kirill Fomichev
 */
/// <reference types="node" />
import Hash from './Hash';
export default class MD5 extends Hash {
    private _a;
    private _b;
    private _c;
    private _d;
    private _m;
    constructor();
    _update(B: Buffer): void;
    _hash(): Buffer;
}
