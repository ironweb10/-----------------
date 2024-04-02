"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saslprep = exports.resourceprep = exports.nodeprep = exports.NodePrepProhibited = exports.nameprep = exports.prepare = exports.D2 = exports.D1 = exports.C9 = exports.C8 = exports.C7 = exports.C6 = exports.C5 = exports.C4 = exports.C3 = exports.C22 = exports.C21 = exports.C12 = exports.C11 = exports.B3 = exports.B2 = exports.B1 = exports.A1 = exports.Table = void 0;
const tslib_1 = require("tslib");
const punycode_1 = tslib_1.__importDefault(require("punycode"));
const Tables_1 = require("./Tables");
class Table {
    constructor(name, points) {
        this.singles = new Set();
        this.ranges = [];
        this.mappings = new Map();
        const data = Tables_1.TABLE_DATA[name];
        this.name = name;
        if (data) {
            if (data.s) {
                this.singles = new Set(data.s.split('|').map(s => parseInt(s, 32)));
            }
            if (data.r) {
                this.ranges = data.r.split('|').map(r => {
                    const [start, end] = r.split(':');
                    return [parseInt(start, 32), parseInt(end, 32)];
                });
            }
            if (data.m) {
                this.mappings = new Map(data.m.split('|').map(m => {
                    const [point, mapping] = m.split(':');
                    const mappedPoints = mapping.split(';').map(p => parseInt(p, 32));
                    return [parseInt(point, 32), mappedPoints];
                }));
            }
        }
        else if (points) {
            this.singles = new Set(points);
        }
    }
    contains(codePoint) {
        if (this.singles.has(codePoint)) {
            return true;
        }
        let left = 0;
        let right = this.ranges.length - 1;
        while (left <= right) {
            const pivot = Math.floor((left + right) / 2);
            const range = this.ranges[pivot];
            if (codePoint < range[0]) {
                right = pivot - 1;
                continue;
            }
            if (codePoint > range[1]) {
                left = pivot + 1;
                continue;
            }
            return true;
        }
        return false;
    }
    hasMapping(codePoint) {
        return this.mappings.has(codePoint) || this.contains(codePoint);
    }
    map(codePoint) {
        if (this.contains(codePoint) && !this.mappings.has(codePoint)) {
            return String.fromCodePoint(codePoint).toLowerCase().codePointAt(0);
        }
        return this.mappings.get(codePoint) || null;
    }
}
exports.Table = Table;
exports.A1 = new Table('A.1');
exports.B1 = new Table('B.1');
exports.B2 = new Table('B.2');
exports.B3 = new Table('B.3');
exports.C11 = new Table('C.1.1');
exports.C12 = new Table('C.1.2');
exports.C21 = new Table('C.2.1');
exports.C22 = new Table('C.2.2');
exports.C3 = new Table('C.3');
exports.C4 = new Table('C.4');
exports.C5 = new Table('C.5');
exports.C6 = new Table('C.6');
exports.C7 = new Table('C.7');
exports.C8 = new Table('C.8');
exports.C9 = new Table('C.9');
exports.D1 = new Table('D.1');
exports.D2 = new Table('D.2');
// Shortcut some of the simpler table operations
exports.B1.map = () => {
    return null;
};
exports.C11.contains = (codePoint) => codePoint === 32;
exports.C12.map = (codePoint) => {
    return exports.C12.contains(codePoint) ? 32 : null;
};
function prepare(profile, allowUnassigned, input = '') {
    const inputCodePoints = punycode_1.default.ucs2.decode(input);
    let mappedCodePoints = [];
    for (const codePoint of inputCodePoints) {
        if (!allowUnassigned && profile.unassigned.contains(codePoint)) {
            throw new Error('Unassigned code point: x' + codePoint.toString(16));
        }
        let hasMapping = false;
        for (const mappingTable of profile.mappings) {
            if (!mappingTable.hasMapping(codePoint)) {
                continue;
            }
            hasMapping = true;
            const mappedPoint = mappingTable.map(codePoint);
            if (!mappedPoint) {
                continue;
            }
            if (Array.isArray(mappedPoint)) {
                mappedCodePoints = mappedCodePoints.concat(mappedPoint);
            }
            else {
                mappedCodePoints.push(mappedPoint);
            }
        }
        if (!hasMapping) {
            mappedCodePoints.push(codePoint);
        }
    }
    let normalizedCodePoints = mappedCodePoints;
    if (profile.normalize) {
        const mappedString = punycode_1.default.ucs2.encode(mappedCodePoints);
        const normalizedString = mappedString.normalize('NFKC');
        normalizedCodePoints = punycode_1.default.ucs2.decode(normalizedString);
    }
    let hasRandALCat = false;
    let hasLCat = false;
    for (const codePoint of normalizedCodePoints) {
        for (const prohibited of profile.prohibited) {
            if (prohibited.contains(codePoint)) {
                throw new Error('Prohibited code point: x' + codePoint.toString(16));
            }
        }
        if (!allowUnassigned && profile.unassigned.contains(codePoint)) {
            // istanbul ignore next
            throw new Error('Prohibited code point: x' + codePoint.toString(16));
        }
        if (profile.bidirectional) {
            hasRandALCat = hasRandALCat || exports.D1.contains(codePoint);
            hasLCat = hasLCat || exports.D2.contains(codePoint);
        }
    }
    if (profile.bidirectional) {
        if (hasRandALCat && hasLCat) {
            throw new Error('String contained both LCat and RandALCat code points');
        }
        if (hasRandALCat &&
            (!exports.D1.contains(normalizedCodePoints[0]) ||
                !exports.D1.contains(normalizedCodePoints[normalizedCodePoints.length - 1]))) {
            throw new Error('String containing RandALCat code points must start and end with RandALCat code points');
        }
    }
    return punycode_1.default.ucs2.encode(normalizedCodePoints);
}
exports.prepare = prepare;
const NamePrepProfile = {
    bidirectional: true,
    mappings: [exports.B1, exports.B2],
    normalize: true,
    prohibited: [exports.C12, exports.C22, exports.C3, exports.C4, exports.C5, exports.C6, exports.C7, exports.C8, exports.C9],
    unassigned: exports.A1
};
function nameprep(str, allowUnassigned = true) {
    return prepare(NamePrepProfile, allowUnassigned, str);
}
exports.nameprep = nameprep;
exports.NodePrepProhibited = new Table('NodePrepProhibited', [
    0x22,
    0x26,
    0x27,
    0x2f,
    0x3a,
    0x3c,
    0x3e,
    0x40
]);
const NodePrepProfile = {
    bidirectional: true,
    mappings: [exports.B1, exports.B2],
    normalize: true,
    prohibited: [exports.C11, exports.C12, exports.C21, exports.C22, exports.C3, exports.C4, exports.C5, exports.C6, exports.C7, exports.C8, exports.C9, exports.NodePrepProhibited],
    unassigned: exports.A1
};
function nodeprep(str, allowUnassigned = true) {
    return prepare(NodePrepProfile, allowUnassigned, str);
}
exports.nodeprep = nodeprep;
const ResourcePrepProfile = {
    bidirectional: true,
    mappings: [exports.B1],
    normalize: true,
    prohibited: [exports.C12, exports.C21, exports.C22, exports.C3, exports.C4, exports.C5, exports.C6, exports.C7, exports.C8, exports.C9],
    unassigned: exports.A1
};
function resourceprep(str, allowUnassigned = true) {
    return prepare(ResourcePrepProfile, allowUnassigned, str);
}
exports.resourceprep = resourceprep;
const SASLPrepProfile = {
    bidirectional: true,
    mappings: [exports.C12, exports.B1],
    normalize: true,
    prohibited: [exports.C12, exports.C21, exports.C22, exports.C3, exports.C4, exports.C5, exports.C6, exports.C7, exports.C8, exports.C9],
    unassigned: exports.A1
};
function saslprep(str, allowUnassigned = false) {
    return prepare(SASLPrepProfile, allowUnassigned, str);
}
exports.saslprep = saslprep;
