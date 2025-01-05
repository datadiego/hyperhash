const sqlite = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
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

    get(id) {
        const query = 'SELECT * FROM cracked WHERE id = ?';
        const result = this.db.prepare(query).get(id);
        return result;
    }

    get(name){
        const query = 'SELECT * FROM cracked WHERE hash = ?';
        const result = this.db.prepare(query).get(name);
        return result;
    }

    create(cracked) {
        const query = 'INSERT INTO cracked (hash, password) VALUES (?, ?)';
        const result = this.db.prepare(query).run(cracked.hash, cracked.password);
        return result;
    }

    delete(id) {
        const query = 'DELETE FROM cracked WHERE id = ?';
        const result = this.db.prepare(query).run(id);
        return result;
    }

    leaderboard() {
        const query = 'SELECT hash, password FROM cracked ORDER BY hash DESC';
        const cracked = this.db.prepare(query).all();

        const sortedCracked = cracked.sort((a, b) => b.hash - a.hash);
        return sortedCracked;
    }
}

module.exports = Cracked;