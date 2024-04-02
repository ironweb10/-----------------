"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = exports.XMLElement = exports.Translator = exports.Registry = exports.StreamParser = exports.parse = exports.Parser = void 0;
const tslib_1 = require("tslib");
const Element_1 = tslib_1.__importDefault(require("./Element"));
exports.XMLElement = Element_1.default;
const Registry_1 = tslib_1.__importDefault(require("./Registry"));
exports.Registry = Registry_1.default;
const Translator_1 = tslib_1.__importDefault(require("./Translator"));
exports.Translator = Translator_1.default;
tslib_1.__exportStar(require("./Definitions"), exports);
tslib_1.__exportStar(require("./Types"), exports);
tslib_1.__exportStar(require("./Helpers"), exports);
var Parser_1 = require("./Parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return tslib_1.__importDefault(Parser_1).default; } });
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return Parser_1.parse; } });
var StreamParser_1 = require("./StreamParser");
Object.defineProperty(exports, "StreamParser", { enumerable: true, get: function () { return tslib_1.__importDefault(StreamParser_1).default; } });
function define(definitions) {
    return (registry) => {
        registry.define(definitions);
    };
}
exports.define = define;
