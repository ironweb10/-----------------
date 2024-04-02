/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - sha.js, Copyright (c) 2013-2018 sha.js contributors
 */
/// <reference types="node" />
import Hash from './Hash';
export default class Sha1 extends Hash {
    private _a;
    private _b;
    private _c;
    private _d;
    private _e;
    private _w;
    constructor();
    _update(M: Buffer): void;
    _hash(): Buffer;
}
