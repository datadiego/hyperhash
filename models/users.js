const sqlite = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
const dbPath = path.join(__dirname, '../db/db.sqlite');

const User = {
    all: () => {
        const db = new sqlite(dbPath);
        const query = 'SELECT * FROM users';
        const result = db.prepare(query).all();
        db.close();
        return result;
    },
    get: id => {
        const db = new sqlite(dbPath);
        const query = 'SELECT * FROM users WHERE id = ?';
        const result = db.prepare(query).get(id);
        db.close();
        return result;
    },
    getFromUsername: username => {
        const db = new sqlite(dbPath);
        const query = 'SELECT * FROM users WHERE username = ?';
        const result = db.prepare(query).get(username);
        db.close();
        return result;
    },
    create: user => {
        console.log(user)
        const db = new sqlite(dbPath);
        const saltRounds = 10;
        const hash = bcrypt.hashSync(user.password, saltRounds);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const result = db.prepare(query).run(user.username, hash);
        db.close();
        return result;
    },
    update: (id, user) => {
        const db = new sqlite(dbPath);
        const query = 'UPDATE users SET username = ?, password = ?, points = ?, failed_guesses = ?, correct_guesses = ? WHERE username = ?';
        const result = db.prepare(query).run(user.username, user.password, user.points, user.failed_guesses, user.correct_guesses, id);
        db.close();
    },
    
    delete: id => {
        const db = new sqlite(dbPath);
        const query = 'DELETE FROM users WHERE id = ?';
        const result = db.prepare(query).run(id);
        db.close();
        return result;
    },
    leaderboard: () => {
        const db = new sqlite(dbPath);
        const query = 'SELECT username, points FROM users ORDER BY points DESC';
        const users = db.prepare(query).all();
        db.close();

        //ordena los usuarios por puntos
        const sortedUsers = users.sort((a, b) => b.points - a.points);
        //filtra campos innecesarios
        const filteredUsers = sortedUsers.map(user => {
            return {
                username: user.username,
                points: user.points,
                rank: sortedUsers.indexOf(user)
            };
        });
        return filteredUsers;
    }
};

module.exports = User;