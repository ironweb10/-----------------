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
/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */
import Hash from './Hash';
export default class Sha256 extends Hash {
    private _a;
    private _b;
    private _c;
    private _d;
    private _e;
    private _f;
    private _g;
    private _h;
    private _w;
    constructor();
    _update(M: Buffer): void;
    _hash(): Buffer;
}
