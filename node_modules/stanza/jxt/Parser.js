"use strict";
/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from: ltx, Copyright © 2010 Stephan Maka
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const tslib_1 = require("tslib");
// tslint:disable cognitive-complexity max-switch-cases
const events_1 = require("events");
const Definitions_1 = require("./Definitions");
const Element_1 = tslib_1.__importDefault(require("./Element"));
const Error_1 = tslib_1.__importDefault(require("./Error"));
function isBasicNameStart(c) {
    return ((97 /* a */ <= c && c <= 122 /* z */) ||
        (65 /* A */ <= c && c <= 90 /* Z */) ||
        c === 58 /* Colon */ ||
        c === 95 /* Underscore */);
}
function isExtendedNameStart(c) {
    return ((0xc0 <= c && c <= 0xd6) ||
        (0xd8 <= c && c <= 0xf6) ||
        (0xf8 <= c && c <= 0x2ff) ||
        (0x370 <= c && c <= 0x37d) ||
        (0x37f <= c && c <= 0x1fff) ||
        (0x200c <= c && c <= 0x200d) ||
        (0x2070 <= c && c <= 0x218f) ||
        (0x2c00 <= c && c <= 0x2fef) ||
        (0x3001 <= c && c <= 0xd7ff) ||
        (0xfdf0 <= c && c <= 0xfffd) ||
        (0x10000 <= c && c <= 0xeffff));
}
function isNameStart(c) {
    return isBasicNameStart(c) || isExtendedNameStart(c);
}
function isName(c) {
    return (isBasicNameStart(c) ||
        c === 45 /* Dash */ ||
        c === 46 /* Period */ ||
        (48 /* Zero */ <= c && c <= 57 /* Nine */) ||
        c === 0xb7 ||
        (0x0300 <= c && c <= 0x036f) ||
        (0x203f <= c && c <= 0x2040) ||
        isExtendedNameStart(c));
}
function isWhitespace(c) {
    return (c === 32 /* Space */ ||
        c === 10 /* NewLine */ ||
        c === 13 /* CarriageReturn */ ||
        c === 9 /* Tab */);
}
class Parser extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        this.allowComments = true;
        this.attributes = {};
        this.state = 34 /* TEXT */;
        this.tagName = '';
        this.haveDeclaration = false;
        this.recordBuffer = [];
        if (opts.allowComments !== undefined) {
            this.allowComments = opts.allowComments;
        }
    }
    write(data) {
        for (const char of data) {
            const c = char.codePointAt(0);
            switch (this.state) {
                case 34 /* TEXT */: {
                    if (c === 60 /* LessThan */) {
                        let text;
                        try {
                            text = Definitions_1.unescapeXML(this.endRecord());
                        }
                        catch (err) {
                            this.emit('error', err);
                            return;
                        }
                        if (text) {
                            this.emit('text', text);
                        }
                        this.transition(31 /* TAG_START */);
                        continue;
                    }
                    else {
                        this.record(char);
                        continue;
                    }
                }
                case 31 /* TAG_START */: {
                    if (c === 47 /* Slash */) {
                        this.transition(7 /* CLOSING_TAG_START */);
                        continue;
                    }
                    if (c === 33 /* Exclamation */) {
                        this.transition(24 /* START_INSTRUCTION */);
                        continue;
                    }
                    if (c === 63 /* Question */) {
                        if (this.haveDeclaration) {
                            this.restrictedXML();
                        }
                        this.transition(25 /* START_PROCESSING_INSTRUCTION */);
                        continue;
                    }
                    if (isNameStart(c)) {
                        this.transition(30 /* TAG_NAME */);
                        this.startRecord(char);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 30 /* TAG_NAME */: {
                    if (isName(c)) {
                        this.record(char);
                        continue;
                    }
                    if (isWhitespace(c)) {
                        this.startTag();
                        this.transition(32 /* TAG_WAIT_NAME */);
                        continue;
                    }
                    if (c === 47 /* Slash */) {
                        this.startTag();
                        this.transition(29 /* TAG_END_SLASH */);
                        continue;
                    }
                    if (c === 62 /* GreaterThan */) {
                        this.startTag();
                        this.transition(34 /* TEXT */);
                        this.emit('startElement', this.tagName, this.attributes);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 29 /* TAG_END_SLASH */: {
                    if (c === 62 /* GreaterThan */) {
                        this.emit('startElement', this.tagName, this.attributes);
                        this.emit('endElement', this.tagName);
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 33 /* TAG */: {
                    if (isWhitespace(c)) {
                        this.transition(32 /* TAG_WAIT_NAME */);
                        continue;
                    }
                    if (c === 47 /* Slash */) {
                        this.transition(29 /* TAG_END_SLASH */);
                        continue;
                    }
                    if (c === 62 /* GreaterThan */) {
                        this.emit('startElement', this.tagName, this.attributes);
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 32 /* TAG_WAIT_NAME */: {
                    if (isWhitespace(c)) {
                        continue;
                    }
                    if (isNameStart(c)) {
                        this.startRecord(char);
                        this.transition(0 /* ATTR_NAME */);
                        continue;
                    }
                    if (c === 47 /* Slash */) {
                        this.transition(29 /* TAG_END_SLASH */);
                        continue;
                    }
                    if (c === 62 /* GreaterThan */) {
                        this.emit('startElement', this.tagName, this.attributes);
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 7 /* CLOSING_TAG_START */: {
                    if (isNameStart(c)) {
                        this.startRecord(char);
                        this.transition(6 /* CLOSING_TAG_NAME */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 6 /* CLOSING_TAG_NAME */: {
                    if (isName(c)) {
                        this.record(char);
                        continue;
                    }
                    if (isWhitespace(c)) {
                        this.transition(8 /* CLOSING_TAG */);
                        continue;
                    }
                    if (c === 62 /* GreaterThan */) {
                        const tag = this.endRecord();
                        this.emit('endElement', tag, this.attributes);
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 8 /* CLOSING_TAG */: {
                    if (isWhitespace(c)) {
                        continue;
                    }
                    if (c === 62 /* GreaterThan */) {
                        const tag = this.endRecord();
                        this.emit('endElement', tag, this.attributes);
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 0 /* ATTR_NAME */: {
                    if (isName(c)) {
                        this.record(char);
                        continue;
                    }
                    if (c === 61 /* Equal */) {
                        this.addAttribute();
                        this.transition(4 /* ATTR_WAIT_QUOTE */);
                        continue;
                    }
                    if (isWhitespace(c)) {
                        this.addAttribute();
                        this.transition(3 /* ATTR_WAIT_EQ */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 3 /* ATTR_WAIT_EQ */: {
                    if (c === 61 /* Equal */) {
                        this.transition(4 /* ATTR_WAIT_QUOTE */);
                        continue;
                    }
                    if (isWhitespace(c)) {
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 4 /* ATTR_WAIT_QUOTE */: {
                    if (c === 34 /* DoubleQuote */) {
                        this.startRecord();
                        this.transition(1 /* ATTR_QUOTE_DOUBLE */);
                        continue;
                    }
                    if (c === 39 /* SingleQuote */) {
                        this.startRecord();
                        this.transition(2 /* ATTR_QUOTE_SINGLE */);
                        continue;
                    }
                    if (isWhitespace(c)) {
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 1 /* ATTR_QUOTE_DOUBLE */:
                case 2 /* ATTR_QUOTE_SINGLE */: {
                    if ((c === 34 /* DoubleQuote */ && this.state === 1 /* ATTR_QUOTE_DOUBLE */) ||
                        (c === 39 /* SingleQuote */ && this.state === 2 /* ATTR_QUOTE_SINGLE */)) {
                        const value = this.endRecord();
                        this.attributes[this.attributeName] = Definitions_1.unescapeXML(value);
                        this.transition(33 /* TAG */);
                        continue;
                    }
                    if (c === 60 /* LessThan */) {
                        return this.notWellFormed();
                    }
                    this.record(char);
                    continue;
                }
                case 24 /* START_INSTRUCTION */: {
                    if (c === 45 /* Dash */) {
                        if (!this.allowComments) {
                            this.restrictedXML();
                        }
                        this.transition(23 /* START_COMMENT_DASH */);
                        continue;
                    }
                    if (c === 91 /* LeftBracket */) {
                        this.transition(21 /* START_CDATA_LB */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 23 /* START_COMMENT_DASH */: {
                    if (c === 45 /* Dash */) {
                        this.transition(14 /* IGNORE_COMMENT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 14 /* IGNORE_COMMENT */: {
                    if (c === 45 /* Dash */) {
                        this.transition(12 /* END_COMMENT_DASH */);
                    }
                    continue;
                }
                case 12 /* END_COMMENT_DASH */: {
                    if (c === 45 /* Dash */) {
                        this.transition(11 /* END_COMMENT_DASH_DASH */);
                    }
                    else {
                        this.transition(14 /* IGNORE_COMMENT */);
                    }
                    continue;
                }
                case 11 /* END_COMMENT_DASH_DASH */: {
                    if (c === 62 /* GreaterThan */) {
                        this.transition(34 /* TEXT */);
                    }
                    else {
                        this.transition(14 /* IGNORE_COMMENT */);
                    }
                    continue;
                }
                case 25 /* START_PROCESSING_INSTRUCTION */: {
                    if (c === 88 /* X */ || c === 120 /* x */) {
                        this.transition(28 /* START_XML_DECLARATION_X */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 28 /* START_XML_DECLARATION_X */: {
                    if (c === 77 /* M */ || c === 109 /* m */) {
                        this.transition(27 /* START_XML_DECLARATION_X_M */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 27 /* START_XML_DECLARATION_X_M */: {
                    if (c === 76 /* L */ || c === 108 /* l */) {
                        this.transition(26 /* START_XML_DECLARATION_X_M_L */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 26 /* START_XML_DECLARATION_X_M_L */: {
                    if (isWhitespace(c)) {
                        this.haveDeclaration = true;
                        this.transition(15 /* IGNORE_INSTRUCTION */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 13 /* END_XML_DECLARATION_QM */: {
                    if (c === 62 /* GreaterThan */) {
                        this.transition(34 /* TEXT */);
                        continue;
                    }
                    return this.notWellFormed();
                }
                case 15 /* IGNORE_INSTRUCTION */: {
                    if (c === 63 /* Question */) {
                        this.transition(13 /* END_XML_DECLARATION_QM */);
                    }
                    continue;
                }
                case 21 /* START_CDATA_LB */: {
                    this.wait(c, 67 /* C */, 20 /* START_CDATA_LB_C */);
                    continue;
                }
                case 20 /* START_CDATA_LB_C */: {
                    this.wait(c, 68 /* D */, 19 /* START_CDATA_LB_C_D */);
                    continue;
                }
                case 19 /* START_CDATA_LB_C_D */: {
                    this.wait(c, 65 /* A */, 18 /* START_CDATA_LB_C_D_A */);
                    continue;
                }
                case 18 /* START_CDATA_LB_C_D_A */: {
                    this.wait(c, 84 /* T */, 17 /* START_CDATA_LB_C_D_A_T */);
                    continue;
                }
                case 17 /* START_CDATA_LB_C_D_A_T */: {
                    this.wait(c, 65 /* A */, 16 /* START_CDATA_LB_C_D_A_T_A */);
                    continue;
                }
                case 16 /* START_CDATA_LB_C_D_A_T_A */: {
                    this.wait(c, 91 /* LeftBracket */, 5 /* CDATA */);
                    continue;
                }
                case 5 /* CDATA */: {
                    if (c === 93 /* RightBracket */) {
                        this.transition(10 /* END_CDATA_RB */);
                        continue;
                    }
                    this.record(char);
                    continue;
                }
                case 10 /* END_CDATA_RB */: {
                    if (c === 93 /* RightBracket */) {
                        this.transition(9 /* END_CDATA_RB_RB */);
                    }
                    else {
                        this.record(String.fromCodePoint(93 /* RightBracket */));
                        this.record(char);
                        this.transition(5 /* CDATA */);
                    }
                    continue;
                }
                case 9 /* END_CDATA_RB_RB */: {
                    if (c === 62 /* GreaterThan */) {
                        const text = this.endRecord();
                        if (text) {
                            this.emit('text', text);
                        }
                        this.transition(34 /* TEXT */);
                    }
                    else {
                        this.record(String.fromCodePoint(93 /* RightBracket */));
                        this.record(String.fromCodePoint(93 /* RightBracket */));
                        this.record(char);
                        this.transition(5 /* CDATA */);
                    }
                    continue;
                }
            }
        }
    }
    end(data) {
        if (data) {
            this.write(data);
        }
        this.write = () => undefined;
    }
    record(char) {
        this.recordBuffer.push(char);
    }
    startRecord(char) {
        this.recordBuffer = [];
        if (char) {
            this.recordBuffer.push(char);
        }
    }
    endRecord() {
        const data = this.recordBuffer;
        this.recordBuffer = [];
        return data.join('');
    }
    startTag() {
        this.tagName = this.endRecord();
        this.attributes = {};
    }
    addAttribute() {
        const name = this.endRecord();
        if (this.attributes[name] !== undefined) {
            return this.notWellFormed();
        }
        this.attributeName = name;
        this.attributes[name] = '';
    }
    wait(c, nextChar, newState) {
        if (c === nextChar) {
            this.transition(newState);
            return;
        }
        return this.notWellFormed();
    }
    transition(state) {
        this.state = state;
        if (state === 34 /* TEXT */) {
            this.startRecord();
        }
    }
    notWellFormed(msg) {
        this.emit('error', Error_1.default.notWellFormed(msg));
    }
    restrictedXML(msg) {
        this.emit('error', Error_1.default.restrictedXML(msg));
    }
}
function parse(data, opts = {}) {
    const p = new Parser(opts);
    let result;
    let element;
    let error = null;
    p.on('text', (text) => {
        if (element) {
            element.children.push(text);
        }
    });
    p.on('startElement', (name, attrs) => {
        const child = new Element_1.default(name, attrs);
        if (!result) {
            result = child;
        }
        if (!element) {
            element = child;
        }
        else {
            element = element.appendChild(child);
        }
    });
    p.on('endElement', (name) => {
        if (!element) {
            p.emit('error', Error_1.default.notWellFormed('a'));
        }
        else if (name === element.name) {
            if (element.parent) {
                element = element.parent;
            }
        }
        else {
            p.emit('error', Error_1.default.notWellFormed('b'));
        }
    });
    p.on('error', (e) => {
        error = e;
    });
    p.write(data);
    p.end();
    if (error) {
        throw error;
    }
    else {
        return result;
    }
}
exports.parse = parse;
exports.default = Parser;
