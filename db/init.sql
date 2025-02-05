CREATE TABLE IF NOT EXISTS users  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    failed_guesses INTEGER DEFAULT 0,
    correct_guesses INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cracked  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    cracked TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    FOREIGN KEY (username) REFERENCES users(username)
);

--INSERT INTO users (username, password, failed_guesses, correct_guesses) VALUES ('admin', 'admin', 0, 0);
--INSERT INTO users (username, password, failed_guesses, correct_guesses) VALUES ('user', 'user', 0, 0);

