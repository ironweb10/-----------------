/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - create-hash, Copyright (c) 2017 crypto-browserify contributors
 */
/// <reference types="node" />
import { Transform } from 'readable-stream';
export default abstract class Hash extends Transform {
    protected _block: Buffer;
    protected _finalSize: number;
    protected _blockSize: number;
    protected _bigEndian: boolean;
    protected _len: number;
    constructor(blockSize: number, finalSize: number, endian?: string);
    _transform(chunk: Buffer | string, encoding: string | undefined, callback: (err?: Error) => void): void;
    _flush(callback: (err?: Error) => void): void;
    update(data: Buffer | string | Uint8Array, enc?: BufferEncoding): this;
    digest(): Buffer;
    digest(enc: string): string;
    _update(block: Buffer | Uint8Array): void;
    _hash(): Buffer;
}
