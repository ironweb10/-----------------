import { Transform } from 'readable-stream';

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - create-hash, Copyright (c) 2017 crypto-browserify contributors
 */
class Hash extends Transform {
    constructor(blockSize, finalSize, endian = 'be') {
        super();
        this._block = Buffer.alloc(blockSize);
        this._finalSize = finalSize;
        this._blockSize = blockSize;
        this._bigEndian = endian === 'be';
        this._len = 0;
    }
    _transform(chunk, encoding, callback) {
        let error = null;
        try {
            this.update(chunk, encoding);
        }
        catch (err) {
            error = err;
        }
        callback(error);
    }
    _flush(callback) {
        let error = null;
        try {
            this.push(this.digest());
        }
        catch (err) {
            error = err;
        }
        callback(error);
    }
    update(data, enc) {
        if (typeof data === 'string') {
            enc = enc || 'utf8';
            data = Buffer.from(data, enc);
        }
        const block = this._block;
        const blockSize = this._blockSize;
        const length = data.length;
        let accum = this._len;
        for (let offset = 0; offset < length;) {
            const assigned = accum % blockSize;
            const remainder = Math.min(length - offset, blockSize - assigned);
            for (let i = 0; i < remainder; i++) {
                block[assigned + i] = data[offset + i];
            }
            accum += remainder;
            offset += remainder;
            if (accum % blockSize === 0) {
                this._update(block);
            }
        }
        this._len += length;
        return this;
    }
    digest(enc) {
        const rem = this._len % this._blockSize;
        this._block[rem] = 0x80;
        // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
        // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
        this._block.fill(0, rem + 1);
        if (rem >= this._finalSize) {
            this._update(this._block);
            this._block.fill(0);
        }
        const bits = this._len * 8;
        if (bits <= 0xffffffff) {
            if (this._bigEndian) {
                this._block.writeUInt32BE(0, this._blockSize - 8);
                this._block.writeUInt32BE(bits, this._blockSize - 4);
            }
            else {
                this._block.writeUInt32LE(bits, this._blockSize - 8);
                this._block.writeUInt32LE(0, this._blockSize - 4);
            }
        }
        else {
            const lowBits = (bits & 0xffffffff) >>> 0;
            const highBits = (bits - lowBits) / 0x100000000;
            if (this._bigEndian) {
                this._block.writeUInt32BE(highBits, this._blockSize - 8);
                this._block.writeUInt32BE(lowBits, this._blockSize - 4);
            }
            else {
                this._block.writeUInt32LE(lowBits, this._blockSize - 8);
                this._block.writeUInt32LE(highBits, this._blockSize - 4);
            }
        }
        this._update(this._block);
        const hash = this._hash();
        return enc ? hash.toString(enc) : hash;
    }
    _update(block) {
        throw new Error('_update must be implemented by subclass');
    }
    _hash() {
        throw new Error('_update must be implemented by subclass');
    }
}

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - md5.js, Copyright (c) 2016 Kirill Fomichev
 */
function rotl(x, n) {
    return (x << n) | (x >>> (32 - n));
}
function fnF(a, b, c, d, m, k, s) {
    return (rotl((a + ((b & c) | (~b & d)) + m + k) | 0, s) + b) | 0;
}
function fnG(a, b, c, d, m, k, s) {
    return (rotl((a + ((b & d) | (c & ~d)) + m + k) | 0, s) + b) | 0;
}
function fnH(a, b, c, d, m, k, s) {
    return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + b) | 0;
}
function fnI(a, b, c, d, m, k, s) {
    return (rotl((a + (c ^ (b | ~d)) + m + k) | 0, s) + b) | 0;
}
class MD5 extends Hash {
    constructor() {
        super(64, 56, 'le');
        this._a = 0x67452301;
        this._b = 0xefcdab89;
        this._c = 0x98badcfe;
        this._d = 0x10325476;
        this._m = new Array(16);
    }
    _update(B) {
        const M = this._m;
        for (let i = 0; i < 16; ++i) {
            M[i] = B.readInt32LE(i * 4);
        }
        let a = this._a;
        let b = this._b;
        let c = this._c;
        let d = this._d;
        a = fnF(a, b, c, d, M[0], 0xd76aa478, 7);
        d = fnF(d, a, b, c, M[1], 0xe8c7b756, 12);
        c = fnF(c, d, a, b, M[2], 0x242070db, 17);
        b = fnF(b, c, d, a, M[3], 0xc1bdceee, 22);
        a = fnF(a, b, c, d, M[4], 0xf57c0faf, 7);
        d = fnF(d, a, b, c, M[5], 0x4787c62a, 12);
        c = fnF(c, d, a, b, M[6], 0xa8304613, 17);
        b = fnF(b, c, d, a, M[7], 0xfd469501, 22);
        a = fnF(a, b, c, d, M[8], 0x698098d8, 7);
        d = fnF(d, a, b, c, M[9], 0x8b44f7af, 12);
        c = fnF(c, d, a, b, M[10], 0xffff5bb1, 17);
        b = fnF(b, c, d, a, M[11], 0x895cd7be, 22);
        a = fnF(a, b, c, d, M[12], 0x6b901122, 7);
        d = fnF(d, a, b, c, M[13], 0xfd987193, 12);
        c = fnF(c, d, a, b, M[14], 0xa679438e, 17);
        b = fnF(b, c, d, a, M[15], 0x49b40821, 22);
        a = fnG(a, b, c, d, M[1], 0xf61e2562, 5);
        d = fnG(d, a, b, c, M[6], 0xc040b340, 9);
        c = fnG(c, d, a, b, M[11], 0x265e5a51, 14);
        b = fnG(b, c, d, a, M[0], 0xe9b6c7aa, 20);
        a = fnG(a, b, c, d, M[5], 0xd62f105d, 5);
        d = fnG(d, a, b, c, M[10], 0x02441453, 9);
        c = fnG(c, d, a, b, M[15], 0xd8a1e681, 14);
        b = fnG(b, c, d, a, M[4], 0xe7d3fbc8, 20);
        a = fnG(a, b, c, d, M[9], 0x21e1cde6, 5);
        d = fnG(d, a, b, c, M[14], 0xc33707d6, 9);
        c = fnG(c, d, a, b, M[3], 0xf4d50d87, 14);
        b = fnG(b, c, d, a, M[8], 0x455a14ed, 20);
        a = fnG(a, b, c, d, M[13], 0xa9e3e905, 5);
        d = fnG(d, a, b, c, M[2], 0xfcefa3f8, 9);
        c = fnG(c, d, a, b, M[7], 0x676f02d9, 14);
        b = fnG(b, c, d, a, M[12], 0x8d2a4c8a, 20);
        a = fnH(a, b, c, d, M[5], 0xfffa3942, 4);
        d = fnH(d, a, b, c, M[8], 0x8771f681, 11);
        c = fnH(c, d, a, b, M[11], 0x6d9d6122, 16);
        b = fnH(b, c, d, a, M[14], 0xfde5380c, 23);
        a = fnH(a, b, c, d, M[1], 0xa4beea44, 4);
        d = fnH(d, a, b, c, M[4], 0x4bdecfa9, 11);
        c = fnH(c, d, a, b, M[7], 0xf6bb4b60, 16);
        b = fnH(b, c, d, a, M[10], 0xbebfbc70, 23);
        a = fnH(a, b, c, d, M[13], 0x289b7ec6, 4);
        d = fnH(d, a, b, c, M[0], 0xeaa127fa, 11);
        c = fnH(c, d, a, b, M[3], 0xd4ef3085, 16);
        b = fnH(b, c, d, a, M[6], 0x04881d05, 23);
        a = fnH(a, b, c, d, M[9], 0xd9d4d039, 4);
        d = fnH(d, a, b, c, M[12], 0xe6db99e5, 11);
        c = fnH(c, d, a, b, M[15], 0x1fa27cf8, 16);
        b = fnH(b, c, d, a, M[2], 0xc4ac5665, 23);
        a = fnI(a, b, c, d, M[0], 0xf4292244, 6);
        d = fnI(d, a, b, c, M[7], 0x432aff97, 10);
        c = fnI(c, d, a, b, M[14], 0xab9423a7, 15);
        b = fnI(b, c, d, a, M[5], 0xfc93a039, 21);
        a = fnI(a, b, c, d, M[12], 0x655b59c3, 6);
        d = fnI(d, a, b, c, M[3], 0x8f0ccc92, 10);
        c = fnI(c, d, a, b, M[10], 0xffeff47d, 15);
        b = fnI(b, c, d, a, M[1], 0x85845dd1, 21);
        a = fnI(a, b, c, d, M[8], 0x6fa87e4f, 6);
        d = fnI(d, a, b, c, M[15], 0xfe2ce6e0, 10);
        c = fnI(c, d, a, b, M[6], 0xa3014314, 15);
        b = fnI(b, c, d, a, M[13], 0x4e0811a1, 21);
        a = fnI(a, b, c, d, M[4], 0xf7537e82, 6);
        d = fnI(d, a, b, c, M[11], 0xbd3af235, 10);
        c = fnI(c, d, a, b, M[2], 0x2ad7d2bb, 15);
        b = fnI(b, c, d, a, M[9], 0xeb86d391, 21);
        this._a = (this._a + a) | 0;
        this._b = (this._b + b) | 0;
        this._c = (this._c + c) | 0;
        this._d = (this._d + d) | 0;
    }
    _hash() {
        const H = Buffer.allocUnsafe(16);
        H.writeInt32LE(this._a, 0);
        H.writeInt32LE(this._b, 4);
        H.writeInt32LE(this._c, 8);
        H.writeInt32LE(this._d, 12);
        return H;
    }
}

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - sha.js, Copyright (c) 2013-2018 sha.js contributors
 */
const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0];
function rotl1(num) {
    return (num << 1) | (num >>> 31);
}
function rotl5(num) {
    return (num << 5) | (num >>> 27);
}
function rotl30(num) {
    return (num << 30) | (num >>> 2);
}
function ft(s, b, c, d) {
    if (s === 0) {
        return (b & c) | (~b & d);
    }
    if (s === 2) {
        return (b & c) | (b & d) | (c & d);
    }
    return b ^ c ^ d;
}
class Sha1 extends Hash {
    constructor() {
        super(64, 56);
        this._a = 0x67452301;
        this._b = 0xefcdab89;
        this._c = 0x98badcfe;
        this._d = 0x10325476;
        this._e = 0xc3d2e1f0;
        this._w = new Array(80);
    }
    _update(M) {
        const W = this._w;
        let a = this._a | 0;
        let b = this._b | 0;
        let c = this._c | 0;
        let d = this._d | 0;
        let e = this._e | 0;
        let i;
        for (i = 0; i < 16; ++i) {
            W[i] = M.readInt32BE(i * 4);
        }
        for (; i < 80; ++i) {
            W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]);
        }
        for (let j = 0; j < 80; ++j) {
            const s = ~~(j / 20);
            const t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0;
            e = d;
            d = c;
            c = rotl30(b);
            b = a;
            a = t;
        }
        this._a = (a + this._a) | 0;
        this._b = (b + this._b) | 0;
        this._c = (c + this._c) | 0;
        this._d = (d + this._d) | 0;
        this._e = (e + this._e) | 0;
    }
    _hash() {
        const H = Buffer.allocUnsafe(20);
        H.writeInt32BE(this._a | 0, 0);
        H.writeInt32BE(this._b | 0, 4);
        H.writeInt32BE(this._c | 0, 8);
        H.writeInt32BE(this._d | 0, 12);
        H.writeInt32BE(this._e | 0, 16);
        return H;
    }
}

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - sha.js, Copyright (c) 2013-2018 sha.js contributors
 */
const K$1 = [
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
];
function ch(x, y, z) {
    return z ^ (x & (y ^ z));
}
function maj(x, y, z) {
    return (x & y) | (z & (x | y));
}
function sigma0(x) {
    return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ ((x >>> 22) | (x << 10));
}
function sigma1(x) {
    return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ ((x >>> 25) | (x << 7));
}
function gamma0(x) {
    return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}
function gamma1(x) {
    return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}
class Sha256 extends Hash {
    constructor() {
        super(64, 56);
        this._a = 0x6a09e667;
        this._b = 0xbb67ae85;
        this._c = 0x3c6ef372;
        this._d = 0xa54ff53a;
        this._e = 0x510e527f;
        this._f = 0x9b05688c;
        this._g = 0x1f83d9ab;
        this._h = 0x5be0cd19;
        this._w = new Array(64);
    }
    _update(M) {
        const W = this._w;
        let a = this._a | 0;
        let b = this._b | 0;
        let c = this._c | 0;
        let d = this._d | 0;
        let e = this._e | 0;
        let f = this._f | 0;
        let g = this._g | 0;
        let h = this._h | 0;
        let i;
        for (i = 0; i < 16; ++i) {
            W[i] = M.readInt32BE(i * 4);
        }
        for (; i < 64; ++i) {
            W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0;
        }
        for (let j = 0; j < 64; ++j) {
            const T1 = (h + sigma1(e) + ch(e, f, g) + K$1[j] + W[j]) | 0;
            const T2 = (sigma0(a) + maj(a, b, c)) | 0;
            h = g;
            g = f;
            f = e;
            e = (d + T1) | 0;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) | 0;
        }
        this._a = (a + this._a) | 0;
        this._b = (b + this._b) | 0;
        this._c = (c + this._c) | 0;
        this._d = (d + this._d) | 0;
        this._e = (e + this._e) | 0;
        this._f = (f + this._f) | 0;
        this._g = (g + this._g) | 0;
        this._h = (h + this._h) | 0;
    }
    _hash() {
        const H = Buffer.allocUnsafe(32);
        H.writeInt32BE(this._a, 0);
        H.writeInt32BE(this._b, 4);
        H.writeInt32BE(this._c, 8);
        H.writeInt32BE(this._d, 12);
        H.writeInt32BE(this._e, 16);
        H.writeInt32BE(this._f, 20);
        H.writeInt32BE(this._g, 24);
        H.writeInt32BE(this._h, 28);
        return H;
    }
}

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - sha.js, Copyright (c) 2013-2018 sha.js contributors
 */
const K$2 = [
    0x428a2f98,
    0xd728ae22,
    0x71374491,
    0x23ef65cd,
    0xb5c0fbcf,
    0xec4d3b2f,
    0xe9b5dba5,
    0x8189dbbc,
    0x3956c25b,
    0xf348b538,
    0x59f111f1,
    0xb605d019,
    0x923f82a4,
    0xaf194f9b,
    0xab1c5ed5,
    0xda6d8118,
    0xd807aa98,
    0xa3030242,
    0x12835b01,
    0x45706fbe,
    0x243185be,
    0x4ee4b28c,
    0x550c7dc3,
    0xd5ffb4e2,
    0x72be5d74,
    0xf27b896f,
    0x80deb1fe,
    0x3b1696b1,
    0x9bdc06a7,
    0x25c71235,
    0xc19bf174,
    0xcf692694,
    0xe49b69c1,
    0x9ef14ad2,
    0xefbe4786,
    0x384f25e3,
    0x0fc19dc6,
    0x8b8cd5b5,
    0x240ca1cc,
    0x77ac9c65,
    0x2de92c6f,
    0x592b0275,
    0x4a7484aa,
    0x6ea6e483,
    0x5cb0a9dc,
    0xbd41fbd4,
    0x76f988da,
    0x831153b5,
    0x983e5152,
    0xee66dfab,
    0xa831c66d,
    0x2db43210,
    0xb00327c8,
    0x98fb213f,
    0xbf597fc7,
    0xbeef0ee4,
    0xc6e00bf3,
    0x3da88fc2,
    0xd5a79147,
    0x930aa725,
    0x06ca6351,
    0xe003826f,
    0x14292967,
    0x0a0e6e70,
    0x27b70a85,
    0x46d22ffc,
    0x2e1b2138,
    0x5c26c926,
    0x4d2c6dfc,
    0x5ac42aed,
    0x53380d13,
    0x9d95b3df,
    0x650a7354,
    0x8baf63de,
    0x766a0abb,
    0x3c77b2a8,
    0x81c2c92e,
    0x47edaee6,
    0x92722c85,
    0x1482353b,
    0xa2bfe8a1,
    0x4cf10364,
    0xa81a664b,
    0xbc423001,
    0xc24b8b70,
    0xd0f89791,
    0xc76c51a3,
    0x0654be30,
    0xd192e819,
    0xd6ef5218,
    0xd6990624,
    0x5565a910,
    0xf40e3585,
    0x5771202a,
    0x106aa070,
    0x32bbd1b8,
    0x19a4c116,
    0xb8d2d0c8,
    0x1e376c08,
    0x5141ab53,
    0x2748774c,
    0xdf8eeb99,
    0x34b0bcb5,
    0xe19b48a8,
    0x391c0cb3,
    0xc5c95a63,
    0x4ed8aa4a,
    0xe3418acb,
    0x5b9cca4f,
    0x7763e373,
    0x682e6ff3,
    0xd6b2b8a3,
    0x748f82ee,
    0x5defb2fc,
    0x78a5636f,
    0x43172f60,
    0x84c87814,
    0xa1f0ab72,
    0x8cc70208,
    0x1a6439ec,
    0x90befffa,
    0x23631e28,
    0xa4506ceb,
    0xde82bde9,
    0xbef9a3f7,
    0xb2c67915,
    0xc67178f2,
    0xe372532b,
    0xca273ece,
    0xea26619c,
    0xd186b8c7,
    0x21c0c207,
    0xeada7dd6,
    0xcde0eb1e,
    0xf57d4f7f,
    0xee6ed178,
    0x06f067aa,
    0x72176fba,
    0x0a637dc5,
    0xa2c898a6,
    0x113f9804,
    0xbef90dae,
    0x1b710b35,
    0x131c471b,
    0x28db77f5,
    0x23047d84,
    0x32caab7b,
    0x40c72493,
    0x3c9ebe0a,
    0x15c9bebc,
    0x431d67c4,
    0x9c100d4c,
    0x4cc5d4be,
    0xcb3e42b6,
    0x597f299c,
    0xfc657e2a,
    0x5fcb6fab,
    0x3ad6faec,
    0x6c44198c,
    0x4a475817
];
function Ch(x, y, z) {
    return z ^ (x & (y ^ z));
}
function maj$1(x, y, z) {
    return (x & y) | (z & (x | y));
}
function sigma0$1(x, xl) {
    return ((x >>> 28) | (xl << 4)) ^ ((xl >>> 2) | (x << 30)) ^ ((xl >>> 7) | (x << 25));
}
function sigma1$1(x, xl) {
    return ((x >>> 14) | (xl << 18)) ^ ((x >>> 18) | (xl << 14)) ^ ((xl >>> 9) | (x << 23));
}
function Gamma0(x, xl) {
    return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ (x >>> 7);
}
function Gamma0l(x, xl) {
    return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ ((x >>> 7) | (xl << 25));
}
function Gamma1(x, xl) {
    return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ (x >>> 6);
}
function Gamma1l(x, xl) {
    return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ ((x >>> 6) | (xl << 26));
}
function getCarry(a, b) {
    return a >>> 0 < b >>> 0 ? 1 : 0;
}
class Sha512 extends Hash {
    constructor() {
        super(128, 112);
        this._ah = 0x6a09e667;
        this._bh = 0xbb67ae85;
        this._ch = 0x3c6ef372;
        this._dh = 0xa54ff53a;
        this._eh = 0x510e527f;
        this._fh = 0x9b05688c;
        this._gh = 0x1f83d9ab;
        this._hh = 0x5be0cd19;
        this._al = 0xf3bcc908;
        this._bl = 0x84caa73b;
        this._cl = 0xfe94f82b;
        this._dl = 0x5f1d36f1;
        this._el = 0xade682d1;
        this._fl = 0x2b3e6c1f;
        this._gl = 0xfb41bd6b;
        this._hl = 0x137e2179;
        this._w = new Array(160);
    }
    _update(M) {
        const W = this._w;
        let ah = this._ah | 0;
        let bh = this._bh | 0;
        let ch = this._ch | 0;
        let dh = this._dh | 0;
        let eh = this._eh | 0;
        let fh = this._fh | 0;
        let gh = this._gh | 0;
        let hh = this._hh | 0;
        let al = this._al | 0;
        let bl = this._bl | 0;
        let cl = this._cl | 0;
        let dl = this._dl | 0;
        let el = this._el | 0;
        let fl = this._fl | 0;
        let gl = this._gl | 0;
        let hl = this._hl | 0;
        let Wih;
        let Wil;
        let i = 0;
        for (i = 0; i < 32; i += 2) {
            W[i] = M.readInt32BE(i * 4);
            W[i + 1] = M.readInt32BE(i * 4 + 4);
        }
        for (; i < 160; i += 2) {
            let xh = W[i - 15 * 2];
            let xl = W[i - 15 * 2 + 1];
            const gamma0 = Gamma0(xh, xl);
            const gamma0l = Gamma0l(xl, xh);
            xh = W[i - 2 * 2];
            xl = W[i - 2 * 2 + 1];
            const gamma1 = Gamma1(xh, xl);
            const gamma1l = Gamma1l(xl, xh);
            // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
            const Wi7h = W[i - 7 * 2];
            const Wi7l = W[i - 7 * 2 + 1];
            const Wi16h = W[i - 16 * 2];
            const Wi16l = W[i - 16 * 2 + 1];
            Wil = (gamma0l + Wi7l) | 0;
            Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0;
            Wil = (Wil + gamma1l) | 0;
            Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0;
            Wil = (Wil + Wi16l) | 0;
            Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0;
            W[i] = Wih;
            W[i + 1] = Wil;
        }
        for (let j = 0; j < 160; j += 2) {
            Wih = W[j];
            Wil = W[j + 1];
            const majh = maj$1(ah, bh, ch);
            const majl = maj$1(al, bl, cl);
            const sigma0h = sigma0$1(ah, al);
            const sigma0l = sigma0$1(al, ah);
            const sigma1h = sigma1$1(eh, el);
            const sigma1l = sigma1$1(el, eh);
            // t1 = h + sigma1 + ch + K[j] + W[j]
            const Kih = K$2[j];
            const Kil = K$2[j + 1];
            const chh = Ch(eh, fh, gh);
            const chl = Ch(el, fl, gl);
            let t1l = (hl + sigma1l) | 0;
            let t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0;
            t1l = (t1l + chl) | 0;
            t1h = (t1h + chh + getCarry(t1l, chl)) | 0;
            t1l = (t1l + Kil) | 0;
            t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0;
            t1l = (t1l + Wil) | 0;
            t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0;
            // t2 = sigma0 + maj
            const t2l = (sigma0l + majl) | 0;
            const t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0;
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = (dl + t1l) | 0;
            eh = (dh + t1h + getCarry(el, dl)) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = (t1l + t2l) | 0;
            ah = (t1h + t2h + getCarry(al, t1l)) | 0;
        }
        this._al = (this._al + al) | 0;
        this._bl = (this._bl + bl) | 0;
        this._cl = (this._cl + cl) | 0;
        this._dl = (this._dl + dl) | 0;
        this._el = (this._el + el) | 0;
        this._fl = (this._fl + fl) | 0;
        this._gl = (this._gl + gl) | 0;
        this._hl = (this._hl + hl) | 0;
        this._ah = (this._ah + ah + getCarry(this._al, al)) | 0;
        this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0;
        this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0;
        this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0;
        this._eh = (this._eh + eh + getCarry(this._el, el)) | 0;
        this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0;
        this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0;
        this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0;
    }
    _hash() {
        const H = Buffer.allocUnsafe(64);
        function writeInt64BE(h, l, offset) {
            H.writeInt32BE(h, offset);
            H.writeInt32BE(l, offset + 4);
        }
        writeInt64BE(this._ah, this._al, 0);
        writeInt64BE(this._bh, this._bl, 8);
        writeInt64BE(this._ch, this._cl, 16);
        writeInt64BE(this._dh, this._dl, 24);
        writeInt64BE(this._eh, this._el, 32);
        writeInt64BE(this._fh, this._fl, 40);
        writeInt64BE(this._gh, this._gl, 48);
        writeInt64BE(this._hh, this._hl, 56);
        return H;
    }
}

const HASH_IMPLEMENTATIONS = new Map([
    ['md5', MD5],
    ['sha-1', Sha1],
    ['sha-256', Sha256],
    ['sha-512', Sha512],
    ['sha1', Sha1],
    ['sha256', Sha256],
    ['sha512', Sha512]
]);
function createHash(alg) {
    alg = alg.toLowerCase();
    const HashImp = HASH_IMPLEMENTATIONS.get(alg);
    if (HashImp) {
        return new HashImp();
    }
    else {
        throw new Error('Unsupported hash algorithm: ' + alg);
    }
}

/**
 * This file is derived from prior work.
 *
 * See NOTICE.md for full license text.
 *
 * Derived from:
 * - hash-base, Copyright (c) 2016 Kirill Fomichev
 * - cipher-base, Copyright (c) 2017 crypto-browserify contributors
 * - create-hash, Copyright (c) 2017 crypto-browserify contributors
 * - create-hmac, Copyright (c) 2017 crypto-browserify contributors
 * - randombytes, Copyright (c) 2017 crypto-browserify
 */
const ZEROS = Buffer.alloc(128);
class Hmac extends Transform {
    constructor(alg, key) {
        super();
        if (typeof key === 'string') {
            key = Buffer.from(key);
        }
        const blocksize = alg === 'sha512' ? 128 : 64;
        this._alg = alg;
        if (key.length > blocksize) {
            key = createHash(alg)
                .update(key)
                .digest();
        }
        else if (key.length < blocksize) {
            key = Buffer.concat([key, ZEROS], blocksize);
        }
        this._ipad = Buffer.alloc(blocksize);
        this._opad = Buffer.alloc(blocksize);
        for (let i = 0; i < blocksize; i++) {
            this._ipad[i] = key[i] ^ 0x36;
            this._opad[i] = key[i] ^ 0x5c;
        }
        this._hash = createHash(alg).update(this._ipad);
    }
    _transform(data, enc, next) {
        let err;
        try {
            this.update(data, enc);
        }
        catch (e) {
            err = e;
        }
        finally {
            next(err);
        }
    }
    _flush(done) {
        let err;
        try {
            this.push(this._final());
        }
        catch (e) {
            err = e;
        }
        done(err);
    }
    _final() {
        const h = this._hash.digest();
        return createHash(this._alg)
            .update(this._opad)
            .update(h)
            .digest();
    }
    update(data, inputEnc) {
        this._hash.update(data, inputEnc);
        return this;
    }
    digest(outputEnc) {
        const outData = this._final() || Buffer.alloc(0);
        if (outputEnc) {
            return outData.toString(outputEnc);
        }
        return outData;
    }
}

let root;
if (typeof window !== 'undefined') {
    root = window;
}
else if (typeof global !== 'undefined') {
    root = global;
}
function randomBytes(size) {
    const rawBytes = new Uint8Array(size);
    if (size > 0) {
        (root.crypto || root.msCrypto).getRandomValues(rawBytes);
    }
    return Buffer.from(rawBytes.buffer);
}
function getHashes() {
    return ['sha-1', 'sha-256', 'sha-512', 'md5'];
}
function createHmac(alg, key) {
    return new Hmac(alg.toLowerCase(), key);
}
const nativeFetch = fetch.bind(window);
const nativeWS = WebSocket;
const nativeRTCPeerConnection = root.RTCPeerConnection;

export { Hash, Hmac, nativeRTCPeerConnection as RTCPeerConnection, nativeWS as WebSocket, createHash, createHmac, nativeFetch as fetch, getHashes, randomBytes };
