/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from: ltx, Copyright © 2010 Stephan Maka
 */
/// <reference types="node" />
import { Transform } from 'readable-stream';
import { JSONData } from './Definitions';
import XMLElement from './Element';
import Registry from './Registry';
export interface StreamParserOptions {
    allowComments?: boolean;
    registry: Registry;
    lang?: string;
    acceptLanguages?: string[];
    wrappedStream?: boolean;
    rootKey?: string;
}
export interface ParsedData {
    event?: string;
    kind: string;
    stanza: JSONData;
    xml: XMLElement;
}
export default class StreamParser extends Transform {
    private closedStream;
    private wrappedStream;
    private registry;
    private lang?;
    private acceptLanguages;
    private currentElement?;
    private rootElement?;
    private rootImportKey?;
    private parser;
    constructor(opts: StreamParserOptions);
    _transform(chunk: Buffer, encoding: string, done: () => void): void;
}
