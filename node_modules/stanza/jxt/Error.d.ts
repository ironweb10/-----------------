export declare enum JXTErrorCondition {
    NotWellFormed = "not-well-formed",
    RestrictedXML = "restricted-xml",
    AlreadyClosed = "already-closed",
    UnknownRoot = "unknown-stream-root"
}
export interface JXTErrorOptions {
    condition: JXTErrorCondition;
    text?: string;
}
export default class JXTError extends Error {
    static notWellFormed(text?: string): JXTError;
    static restrictedXML(text?: string): JXTError;
    static alreadyClosed(text?: string): JXTError;
    static unknownRoot(text?: string): JXTError;
    isJXTError: boolean;
    condition: JXTErrorCondition;
    text?: string;
    constructor(opts: JXTErrorOptions);
}
