"use strict";
/**
 * Portions of this file are derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - uuid, Copyright (c) 2010-2016 Robert Kieffer and other contributors
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviveData = exports.uuid = exports.octetCompare = exports.sleep = exports.timeoutPromise = void 0;
// tslint:disable no-bitwise
const stanza_shims_1 = require("stanza-shims");
const bth = [];
for (let i = 0; i < 256; ++i) {
    bth[i] = (i + 0x100).toString(16).substr(1);
}
async function timeoutPromise(target, delay, rejectValue = () => undefined) {
    let timeoutRef;
    const result = await Promise.race([
        target,
        new Promise((resolve, reject) => {
            timeoutRef = setTimeout(() => reject(rejectValue()), delay);
        })
    ]);
    clearTimeout(timeoutRef);
    return result;
}
exports.timeoutPromise = timeoutPromise;
async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time);
    });
}
exports.sleep = sleep;
function octetCompare(str1, str2) {
    const b1 = typeof str1 === 'string' ? Buffer.from(str1, 'utf8') : str1;
    const b2 = typeof str2 === 'string' ? Buffer.from(str2, 'utf8') : str2;
    return b1.compare(b2);
}
exports.octetCompare = octetCompare;
function uuid() {
    const buf = stanza_shims_1.randomBytes(16);
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    let i = 0;
    return [
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        '-',
        bth[buf[i++]],
        bth[buf[i++]],
        '-',
        bth[buf[i++]],
        bth[buf[i++]],
        '-',
        bth[buf[i++]],
        bth[buf[i++]],
        '-',
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i]]
    ].join('');
}
exports.uuid = uuid;
const DATE_FIELDS = new Set([
    'date',
    'expires',
    'httpUploadRetry',
    'idleSince',
    'published',
    'since',
    'stamp',
    'timestamp',
    'updated',
    'utc'
]);
const ISO_DT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:Z|((\+|-)([\d|:]*)))?$/;
function reviveData(key, value) {
    if (DATE_FIELDS.has(key) && value && typeof value === 'string' && ISO_DT.test(value)) {
        return new Date(value);
    }
    if (value &&
        typeof value === 'object' &&
        value.type === 'Buffer' &&
        Array.isArray(value.data)) {
        return Buffer.from(value);
    }
    return value;
}
exports.reviveData = reviveData;
