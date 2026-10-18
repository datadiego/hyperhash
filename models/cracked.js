const sqlite = require('better-sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.sqlite');

class Cracked {
    constructor() {
        this.db = new sqlite(dbPath);
    }

    all() {
        const query = 'SELECT * FROM cracked';
        const result = this.db.prepare(query).all();
        return result;
    }

    create(cracked) {
        const query = 'INSERT INTO cracked (username, cracked, points) VALUES (?, ?, ?)';
        const result = this.db.prepare(query).run(cracked.username, cracked.cracked, cracked.points);
        return result;
    }
}

module.exports = Cracked;