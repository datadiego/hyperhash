const fs = require('fs');
const path = require('path');
//const rockyou = fs.readFileSync(path.join(__dirname, 'rockyou.txt'), 'utf8').split('\n');
const dict = fs.readFileSync(path.join(__dirname, 'dict.txt'), 'utf8').split('\n');
const { encryptMD4, encryptMD5, encryptSHA1, encryptSHA256 } = require('./hashing');


const diccionarios = {
    dict
};

function getRandom(){
    const diccionario = diccionarios[Object.keys(diccionarios)[Math.floor(Math.random() * Object.keys(diccionarios).length)]];
    const palabra =  diccionario[Math.floor(Math.random() * diccionario.length)];
    const hashMD4 = encryptMD4(palabra);
    const hashMD5 = encryptMD5(palabra);
    const hashSHA1 = encryptSHA1(palabra);
    const hashSHA256 = encryptSHA256(palabra);

    return {
        palabra,
        hashMD4,
        hashMD5,
        hashSHA1,
        hashSHA256
    }
}

function getRandomHash(){
    const obj = getRandom();
    //choose a random hash
    const hashes = Object.keys(obj).filter(key => key.includes('hash'));
    const hash = hashes[Math.floor(Math.random() * hashes.length)];
    return {
        hash: obj[hash],
        algo: hash,
        palabra: obj.palabra
    }
}

module.exports = getRandomHash;