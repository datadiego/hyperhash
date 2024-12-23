const sqlite = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new sqlite('./db/db.sqlite');

const initSqlPath = path.join(__dirname, 'init.sql');
const query = fs.readFileSync(initSqlPath, 'utf8');

db.exec(query);
db.close();
console.log('Database initialized');

module.exports = db;