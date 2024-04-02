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
export default class Sha512 extends Hash {
    private _ah;
    private _bh;
    private _ch;
    private _dh;
    private _eh;
    private _fh;
    private _gh;
    private _hh;
    private _al;
    private _bl;
    private _cl;
    private _dl;
    private _el;
    private _fl;
    private _gl;
    private _hl;
    private _w;
    constructor();
    _update(M: Buffer): void;
    _hash(): Buffer;
}
