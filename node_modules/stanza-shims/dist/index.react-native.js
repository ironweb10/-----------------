"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RNRandomBytes = tslib_1.__importStar(require("react-native-randombytes"));
tslib_1.__exportStar(require("./index.browser"), exports);
function randomBytes(size) {
    return RNRandomBytes.randomBytes(size);
}
exports.randomBytes = randomBytes;
