export declare type JID = string;
export interface JIDParts {
    domain: string;
    local?: string;
    resource?: string;
}
export interface ParsedJID {
    bare: string;
    domain: string;
    full: string;
    local?: string;
    resource?: string;
}
export interface ParsedURI {
    identity?: string;
    jid?: string;
    action?: string;
    parameters?: {
        [key: string]: string | string[];
    };
}
export interface PreparationOptions {
    prepared?: boolean;
    escaped?: boolean;
}
export declare function escapeLocal(val?: string): string;
export declare function unescapeLocal(val: string): string;
export declare function prepare(data: JIDParts): JIDParts;
export declare function create(data: JIDParts, opts?: PreparationOptions): JID;
export declare function createFull(bare: string, resource?: string): JID;
export declare function parse(jid?: JID): ParsedJID;
export declare function allowedResponders(jid1?: JID, jid2?: JID): Set<JID | undefined>;
export declare function equal(jid1?: JID, jid2?: JID): boolean;
export declare function equalBare(jid1?: JID, jid2?: JID): boolean;
export declare function isFull(jid: JID): boolean;
export declare function isBare(jid: JID): boolean;
export declare function getLocal(jid?: JID): string | undefined;
export declare function getDomain(jid?: JID): JID;
export declare function getResource(jid?: JID): string | undefined;
export declare function toBare(jid?: JID): JID;
export declare function parseURI(val: string): ParsedURI;
export declare function toURI(data: ParsedURI): string;
