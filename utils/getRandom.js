const fs = require('fs');
const path = require('path');
//const rockyou = fs.readFileSync(path.join(__dirname, 'rockyou.txt'), 'utf8').split('\n');
//const dict = fs.readFileSync(path.join(__dirname, 'dict.txt'), 'utf8').split('\n');
const { encryptMD4, encryptMD5, encryptSHA1, encryptSHA256, bcryptHash } = require('./hashing');


const archivos = ["pokemon1.txt", "pokemon2.txt", "it.txt"]


const diccionarios = []

for(archivo of archivos){
    const diccionario = fs.readFileSync(path.join(__dirname, archivo), 'utf8').split('\n');
    diccionarios.push(diccionario)
}
function getRandom(){
    const diccionario = diccionarios[Object.keys(diccionarios)[Math.floor(Math.random() * Object.keys(diccionarios).length)]];
    const randomVal = Math.floor(Math.random() * 5);
    const palabra1 =  diccionario[Math.floor(Math.random() * diccionario.length)]
    let diccionario2 
    let palabra2
    if(randomVal == 0){
        diccionario2 = diccionarios[Object.keys(diccionarios)[Math.floor(Math.random() * Object.keys(diccionarios).length)]];
        palabra2 = diccionario2[Math.floor(Math.random() * diccionario2.length)]
    }
    let palabra
    palabra = randomVal == 0 ? palabra1 + palabra2 : palabra1
    console.log(palabra)    
    const hashMD4 = encryptMD4(palabra);
    const hashMD5 = encryptMD5(palabra);
    const hashSHA1 = encryptSHA1(palabra);
    const hashSHA256 = encryptSHA256(palabra);
    const hashBcrypt = bcryptHash(palabra);

    return {
        palabra,
        hashMD4,
        hashMD5,
        hashSHA1,
        hashSHA256,
        hashBcrypt
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