const crypto = require('crypto');

function encryptMD4(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
}

function compareMd4(input, hash) {
    return encryptMD4(input) === hash;
}

function encryptMD5(input) {
    return crypto.createHash('md5').update(input).digest('hex');
}

function compareMd5(input, hash) {
    return encryptMD5(input) === hash;
}

function encryptSHA1(input) {
    return crypto.createHash('sha1').update(input, "utf8").digest('hex');
}

function compareSHA1(input, hash) {
    return encryptSHA1(input) === hash;
}

function encryptSHA256(input) {
    const hash = crypto.createHash('sha256').update(input, 'utf8').digest('hex');
    return hash;
}

function compareSHA256(input, hash) {
    return encryptSHA256(input) === hash;
}
/*
const password = 'password';
const md4Hash = encryptMD4(password);
console.log('MD4 hash:', md4Hash);
console.log('MD4 compare:', compareMd4(password, md4Hash));

const md5Hash = encryptMD5(password);
console.log('MD5 hash:', md5Hash);
console.log('MD5 compare:', compareMd5(password, md5Hash));

const sha1Hash = encryptSHA1(password);
console.log('SHA1 hash:', sha1Hash);
console.log('SHA1 compare:', compareSHA1(password, sha1Hash));

const sha256Hash = encryptSHA256(password);
console.log('SHA256 hash:', sha256Hash);
console.log('SHA256 compare:', compareSHA256(password, sha256Hash));
*/



module.exports = { encryptMD4, compareMd4, encryptMD5, compareMd5, encryptSHA1, compareSHA1, encryptSHA256, compareSHA256 };