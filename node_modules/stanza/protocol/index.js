"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// ====================================================================
tslib_1.__exportStar(require("./rfc3921"), exports);
tslib_1.__exportStar(require("./rfc4287"), exports);
tslib_1.__exportStar(require("./rfc6120"), exports);
tslib_1.__exportStar(require("./rfc6121"), exports);
tslib_1.__exportStar(require("./rfc7395"), exports);
tslib_1.__exportStar(require("./xep0004"), exports);
tslib_1.__exportStar(require("./xep0012"), exports);
tslib_1.__exportStar(require("./xep0016"), exports);
tslib_1.__exportStar(require("./xep0030"), exports);
tslib_1.__exportStar(require("./xep0033"), exports);
tslib_1.__exportStar(require("./xep0045"), exports);
tslib_1.__exportStar(require("./xep0047"), exports);
tslib_1.__exportStar(require("./xep0048"), exports);
tslib_1.__exportStar(require("./xep0049"), exports);
tslib_1.__exportStar(require("./xep0050"), exports);
tslib_1.__exportStar(require("./xep0054"), exports);
tslib_1.__exportStar(require("./xep0055"), exports);
tslib_1.__exportStar(require("./xep0059"), exports);
tslib_1.__exportStar(require("./xep0060"), exports);
tslib_1.__exportStar(require("./xep0065"), exports);
tslib_1.__exportStar(require("./xep0066"), exports);
tslib_1.__exportStar(require("./xep0071"), exports);
tslib_1.__exportStar(require("./xep0077"), exports);
tslib_1.__exportStar(require("./xep0080"), exports);
tslib_1.__exportStar(require("./xep0084"), exports);
tslib_1.__exportStar(require("./xep0085"), exports);
tslib_1.__exportStar(require("./xep0092"), exports);
tslib_1.__exportStar(require("./xep0107"), exports);
tslib_1.__exportStar(require("./xep0108"), exports);
tslib_1.__exportStar(require("./xep0114"), exports);
tslib_1.__exportStar(require("./xep0115"), exports);
tslib_1.__exportStar(require("./xep0118"), exports);
tslib_1.__exportStar(require("./xep0141"), exports);
tslib_1.__exportStar(require("./xep0124"), exports);
tslib_1.__exportStar(require("./xep0131"), exports);
tslib_1.__exportStar(require("./xep0138"), exports);
tslib_1.__exportStar(require("./xep0144"), exports);
tslib_1.__exportStar(require("./xep0153"), exports);
tslib_1.__exportStar(require("./xep0158"), exports);
tslib_1.__exportStar(require("./xep0166"), exports);
tslib_1.__exportStar(require("./xep0167"), exports);
tslib_1.__exportStar(require("./xep0172"), exports);
tslib_1.__exportStar(require("./xep0176"), exports);
tslib_1.__exportStar(require("./xep0177"), exports);
tslib_1.__exportStar(require("./xep0184"), exports);
tslib_1.__exportStar(require("./xep0186"), exports);
tslib_1.__exportStar(require("./xep0191"), exports);
tslib_1.__exportStar(require("./xep0198"), exports);
tslib_1.__exportStar(require("./xep0199"), exports);
tslib_1.__exportStar(require("./xep0202"), exports);
tslib_1.__exportStar(require("./xep0203"), exports);
tslib_1.__exportStar(require("./xep0215"), exports);
tslib_1.__exportStar(require("./xep0221"), exports);
tslib_1.__exportStar(require("./xep0224"), exports);
tslib_1.__exportStar(require("./xep0231"), exports);
tslib_1.__exportStar(require("./xep0234"), exports);
tslib_1.__exportStar(require("./xep0247"), exports);
tslib_1.__exportStar(require("./xep0260"), exports);
tslib_1.__exportStar(require("./xep0261"), exports);
tslib_1.__exportStar(require("./xep0264"), exports);
tslib_1.__exportStar(require("./xep0280"), exports);
tslib_1.__exportStar(require("./xep0297"), exports);
tslib_1.__exportStar(require("./xep0300"), exports);
tslib_1.__exportStar(require("./xep0301"), exports);
tslib_1.__exportStar(require("./xep0308"), exports);
tslib_1.__exportStar(require("./xep0313"), exports);
tslib_1.__exportStar(require("./xep0317"), exports);
tslib_1.__exportStar(require("./xep0319"), exports);
tslib_1.__exportStar(require("./xep0320"), exports);
tslib_1.__exportStar(require("./xep0333"), exports);
tslib_1.__exportStar(require("./xep0334"), exports);
tslib_1.__exportStar(require("./xep0335"), exports);
tslib_1.__exportStar(require("./xep0338"), exports);
tslib_1.__exportStar(require("./xep0343"), exports);
tslib_1.__exportStar(require("./xep0352"), exports);
tslib_1.__exportStar(require("./xep0357"), exports);
tslib_1.__exportStar(require("./xep0359"), exports);
tslib_1.__exportStar(require("./xep0363"), exports);
tslib_1.__exportStar(require("./xep0380"), exports);
tslib_1.__exportStar(require("./xep0384"), exports);
tslib_1.__exportStar(require("./xrd"), exports);
const rfc3921_1 = tslib_1.__importDefault(require("./rfc3921"));
const rfc4287_1 = tslib_1.__importDefault(require("./rfc4287"));
const rfc6120_1 = tslib_1.__importDefault(require("./rfc6120"));
const rfc6121_1 = tslib_1.__importDefault(require("./rfc6121"));
const rfc7395_1 = tslib_1.__importDefault(require("./rfc7395"));
const xep0004_1 = tslib_1.__importDefault(require("./xep0004"));
const xep0012_1 = tslib_1.__importDefault(require("./xep0012"));
const xep0016_1 = tslib_1.__importDefault(require("./xep0016"));
const xep0030_1 = tslib_1.__importDefault(require("./xep0030"));
const xep0033_1 = tslib_1.__importDefault(require("./xep0033"));
const xep0045_1 = tslib_1.__importDefault(require("./xep0045"));
const xep0047_1 = tslib_1.__importDefault(require("./xep0047"));
const xep0048_1 = tslib_1.__importDefault(require("./xep0048"));
const xep0049_1 = tslib_1.__importDefault(require("./xep0049"));
const xep0050_1 = tslib_1.__importDefault(require("./xep0050"));
const xep0054_1 = tslib_1.__importDefault(require("./xep0054"));
const xep0055_1 = tslib_1.__importDefault(require("./xep0055"));
const xep0059_1 = tslib_1.__importDefault(require("./xep0059"));
const xep0060_1 = tslib_1.__importDefault(require("./xep0060"));
const xep0065_1 = tslib_1.__importDefault(require("./xep0065"));
const xep0066_1 = tslib_1.__importDefault(require("./xep0066"));
const xep0071_1 = tslib_1.__importDefault(require("./xep0071"));
const xep0077_1 = tslib_1.__importDefault(require("./xep0077"));
const xep0080_1 = tslib_1.__importDefault(require("./xep0080"));
const xep0084_1 = tslib_1.__importDefault(require("./xep0084"));
const xep0085_1 = tslib_1.__importDefault(require("./xep0085"));
const xep0092_1 = tslib_1.__importDefault(require("./xep0092"));
const xep0107_1 = tslib_1.__importDefault(require("./xep0107"));
const xep0108_1 = tslib_1.__importDefault(require("./xep0108"));
const xep0114_1 = tslib_1.__importDefault(require("./xep0114"));
const xep0115_1 = tslib_1.__importDefault(require("./xep0115"));
const xep0118_1 = tslib_1.__importDefault(require("./xep0118"));
const xep0124_1 = tslib_1.__importDefault(require("./xep0124"));
const xep0131_1 = tslib_1.__importDefault(require("./xep0131"));
const xep0138_1 = tslib_1.__importDefault(require("./xep0138"));
const xep0141_1 = tslib_1.__importDefault(require("./xep0141"));
const xep0144_1 = tslib_1.__importDefault(require("./xep0144"));
const xep0153_1 = tslib_1.__importDefault(require("./xep0153"));
const xep0158_1 = tslib_1.__importDefault(require("./xep0158"));
const xep0166_1 = tslib_1.__importDefault(require("./xep0166"));
const xep0167_1 = tslib_1.__importDefault(require("./xep0167"));
const xep0172_1 = tslib_1.__importDefault(require("./xep0172"));
const xep0176_1 = tslib_1.__importDefault(require("./xep0176"));
const xep0177_1 = tslib_1.__importDefault(require("./xep0177"));
const xep0184_1 = tslib_1.__importDefault(require("./xep0184"));
const xep0186_1 = tslib_1.__importDefault(require("./xep0186"));
const xep0191_1 = tslib_1.__importDefault(require("./xep0191"));
const xep0198_1 = tslib_1.__importDefault(require("./xep0198"));
const xep0199_1 = tslib_1.__importDefault(require("./xep0199"));
const xep0202_1 = tslib_1.__importDefault(require("./xep0202"));
const xep0203_1 = tslib_1.__importDefault(require("./xep0203"));
const xep0215_1 = tslib_1.__importDefault(require("./xep0215"));
const xep0221_1 = tslib_1.__importDefault(require("./xep0221"));
const xep0224_1 = tslib_1.__importDefault(require("./xep0224"));
const xep0231_1 = tslib_1.__importDefault(require("./xep0231"));
const xep0234_1 = tslib_1.__importDefault(require("./xep0234"));
const xep0247_1 = tslib_1.__importDefault(require("./xep0247"));
const xep0260_1 = tslib_1.__importDefault(require("./xep0260"));
const xep0261_1 = tslib_1.__importDefault(require("./xep0261"));
const xep0264_1 = tslib_1.__importDefault(require("./xep0264"));
const xep0280_1 = tslib_1.__importDefault(require("./xep0280"));
const xep0297_1 = tslib_1.__importDefault(require("./xep0297"));
const xep0300_1 = tslib_1.__importDefault(require("./xep0300"));
const xep0301_1 = tslib_1.__importDefault(require("./xep0301"));
const xep0308_1 = tslib_1.__importDefault(require("./xep0308"));
const xep0313_1 = tslib_1.__importDefault(require("./xep0313"));
const xep0317_1 = tslib_1.__importDefault(require("./xep0317"));
const xep0319_1 = tslib_1.__importDefault(require("./xep0319"));
const xep0320_1 = tslib_1.__importDefault(require("./xep0320"));
const xep0333_1 = tslib_1.__importDefault(require("./xep0333"));
const xep0334_1 = tslib_1.__importDefault(require("./xep0334"));
const xep0335_1 = tslib_1.__importDefault(require("./xep0335"));
const xep0338_1 = tslib_1.__importDefault(require("./xep0338"));
const xep0343_1 = tslib_1.__importDefault(require("./xep0343"));
const xep0352_1 = tslib_1.__importDefault(require("./xep0352"));
const xep0357_1 = tslib_1.__importDefault(require("./xep0357"));
const xep0359_1 = tslib_1.__importDefault(require("./xep0359"));
const xep0363_1 = tslib_1.__importDefault(require("./xep0363"));
const xep0380_1 = tslib_1.__importDefault(require("./xep0380"));
const xep0384_1 = tslib_1.__importDefault(require("./xep0384"));
const xrd_1 = tslib_1.__importDefault(require("./xrd"));
const Protocol = [
    rfc3921_1.default,
    rfc4287_1.default,
    rfc6120_1.default,
    rfc6121_1.default,
    rfc7395_1.default,
    xep0004_1.default,
    xep0012_1.default,
    xep0016_1.default,
    xep0030_1.default,
    xep0033_1.default,
    xep0045_1.default,
    xep0047_1.default,
    xep0048_1.default,
    xep0049_1.default,
    xep0050_1.default,
    xep0054_1.default,
    xep0055_1.default,
    xep0059_1.default,
    xep0060_1.default,
    xep0065_1.default,
    xep0066_1.default,
    xep0071_1.default,
    xep0077_1.default,
    xep0080_1.default,
    xep0084_1.default,
    xep0085_1.default,
    xep0092_1.default,
    xep0107_1.default,
    xep0108_1.default,
    xep0114_1.default,
    xep0115_1.default,
    xep0118_1.default,
    xep0124_1.default,
    xep0131_1.default,
    xep0138_1.default,
    xep0141_1.default,
    xep0144_1.default,
    xep0153_1.default,
    xep0158_1.default,
    xep0166_1.default,
    xep0167_1.default,
    xep0172_1.default,
    xep0176_1.default,
    xep0177_1.default,
    xep0184_1.default,
    xep0186_1.default,
    xep0191_1.default,
    xep0198_1.default,
    xep0199_1.default,
    xep0202_1.default,
    xep0203_1.default,
    xep0215_1.default,
    xep0221_1.default,
    xep0224_1.default,
    xep0231_1.default,
    xep0234_1.default,
    xep0247_1.default,
    xep0260_1.default,
    xep0261_1.default,
    xep0264_1.default,
    xep0280_1.default,
    xep0297_1.default,
    xep0300_1.default,
    xep0301_1.default,
    xep0308_1.default,
    xep0313_1.default,
    xep0317_1.default,
    xep0319_1.default,
    xep0320_1.default,
    xep0333_1.default,
    xep0334_1.default,
    xep0335_1.default,
    xep0338_1.default,
    xep0343_1.default,
    xep0352_1.default,
    xep0357_1.default,
    xep0359_1.default,
    xep0363_1.default,
    xep0380_1.default,
    xep0384_1.default,
    xrd_1.default
];
exports.default = Protocol;
