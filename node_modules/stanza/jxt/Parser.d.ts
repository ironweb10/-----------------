/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from: ltx, Copyright © 2010 Stephan Maka
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import XMLElement from './Element';
export interface Attributes {
    [key: string]: string | undefined;
    xmlns?: string;
}
export interface ParserOptions {
    allowComments?: boolean;
}
declare class Parser extends EventEmitter {
    private allowComments;
    private attributeName?;
    private attributes?;
    private state;
    private tagName?;
    private haveDeclaration;
    private recordBuffer;
    constructor(opts?: ParserOptions);
    write(data: string): void;
    end(data?: string): void;
    private record;
    private startRecord;
    private endRecord;
    private startTag;
    private addAttribute;
    private wait;
    private transition;
    private notWellFormed;
    private restrictedXML;
}
export declare function parse(data: string, opts?: ParserOptions): XMLElement;
export default Parser;
