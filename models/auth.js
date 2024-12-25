// auth.js
const sqlite = require('better-sqlite3');
const dbPath = './db/db.sqlite';
const bcrypt = require('bcrypt');
const isValidUser = (username, password) => {
    const db = new sqlite(dbPath);
    console.log(username, password);
    const query = 'SELECT password FROM users WHERE username = ?';
    const result = db.prepare(query).get(username);
    db.close();
    if (!result) {
        return false;
    }
    return bcrypt.compareSync(password, result.password);
};


module.exports = {
    isValidUser
};