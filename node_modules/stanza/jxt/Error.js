"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JXTErrorCondition = void 0;
var JXTErrorCondition;
(function (JXTErrorCondition) {
    JXTErrorCondition["NotWellFormed"] = "not-well-formed";
    JXTErrorCondition["RestrictedXML"] = "restricted-xml";
    JXTErrorCondition["AlreadyClosed"] = "already-closed";
    JXTErrorCondition["UnknownRoot"] = "unknown-stream-root";
})(JXTErrorCondition = exports.JXTErrorCondition || (exports.JXTErrorCondition = {}));
class JXTError extends Error {
    constructor(opts) {
        super(opts.text);
        this.isJXTError = true;
        this.condition = opts.condition;
        this.text = opts.text;
    }
    static notWellFormed(text) {
        return new JXTError({
            condition: JXTErrorCondition.NotWellFormed,
            text
        });
    }
    static restrictedXML(text) {
        return new JXTError({
            condition: JXTErrorCondition.RestrictedXML,
            text
        });
    }
    static alreadyClosed(text) {
        return new JXTError({
            condition: JXTErrorCondition.AlreadyClosed,
            text
        });
    }
    static unknownRoot(text) {
        return new JXTError({
            condition: JXTErrorCondition.UnknownRoot,
            text
        });
    }
}
exports.default = JXTError;
