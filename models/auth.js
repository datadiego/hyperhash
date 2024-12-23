// auth.js
const sqlite = require('better-sqlite3');
const dbPath = './db/db.sqlite';

const isValidUser = (username, password) => {
    const db = new sqlite(dbPath);
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const user = db.prepare(query).get(username, password);
    db.close();
    return user !== undefined;
};

module.exports = {
    isValidUser
};