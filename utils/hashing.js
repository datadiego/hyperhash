
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const MD4_S = [3, 7, 11, 19, 3, 7, 11, 19, 3, 7, 11, 19, 3, 7, 11, 19,
               3, 5, 9, 13, 3, 5, 9, 13, 3, 5, 9, 13, 3, 5, 9, 13,
               3, 9, 11, 15, 3, 9, 11, 15, 3, 9, 11, 15, 3, 9, 11, 15];
const MD4_R1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const MD4_R2 = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
const MD4_R3 = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

function md4F(x, y, z) { return (x & y) | (~x & z); }
function md4G(x, y, z) { return (x & y) | (x & z) | (y & z); }
function md4H(x, y, z) { return x ^ y ^ z; }
function rotl(x, n) { return ((x << n) | (x >>> (32 - n))) >>> 0; }

function encryptMD4(input) {
    const data = Buffer.from(String(input), 'utf8');
    const pad = Buffer.alloc((55 - (data.length % 64) + 64) % 64);
    const lenBuf = Buffer.alloc(8);
    lenBuf.writeUInt32LE((data.length << 3) >>> 0, 0);
    lenBuf.writeUInt32LE(Math.floor(data.length / 0x20000000), 4);
    const msg = Buffer.concat([data, Buffer.from([0x80]), pad, lenBuf]);

    let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
    const X = new Uint32Array(16);

    for (let offset = 0; offset < msg.length; offset += 64) {
        for (let i = 0; i < 16; i++) X[i] = msg.readUInt32LE(offset + i * 4);

        let A = a, B = b, C = c, D = d;
        let t;
        for (let i = 0; i < 16; i++) {
            t = (A + md4F(B, C, D) + X[MD4_R1[i]]) >>> 0;
            A = D; D = C; C = B; B = rotl(t, MD4_S[i]);
        }
        for (let i = 0; i < 16; i++) {
            t = (A + md4G(B, C, D) + X[MD4_R2[i]] + 0x5a827999) >>> 0;
            A = D; D = C; C = B; B = rotl(t, MD4_S[i + 16]);
        }
        for (let i = 0; i < 16; i++) {
            t = (A + md4H(B, C, D) + X[MD4_R3[i]] + 0x6ed9eba1) >>> 0;
            A = D; D = C; C = B; B = rotl(t, MD4_S[i + 32]);
        }

        a = (a + A) >>> 0; b = (b + B) >>> 0;
        c = (c + C) >>> 0; d = (d + D) >>> 0;
    }

    const out = Buffer.alloc(16);
    out.writeUInt32LE(a, 0);
    out.writeUInt32LE(b, 4);
    out.writeUInt32LE(c, 8);
    out.writeUInt32LE(d, 12);
    return out.toString('hex');
}

function encryptMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function encryptSHA1(input) {
    return crypto.createHash('sha1').update(input, "utf8").digest('hex');
}

function encryptSHA256(input) {
    return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}

function bcryptHash(input) {
    const saltRounds = 10;
    return bcrypt.hashSync(input, saltRounds);
}

module.exports = { encryptMD4, encryptMD5, encryptSHA1, encryptSHA256, bcryptHash };
