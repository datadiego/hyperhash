const path = require('path');
const fs = require('fs');
const isAuthenticated = require('./middleware/auth');
const express = require('express');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const User = require('./models/users');
const getRandomHash = require('./utils/getRandom');


let actual_hash = getRandomHash();

const session = require('express-session');

dotenv.config();
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const app = express();

//check if db exists
const dbPath = path.join(__dirname, 'db/db.sqlite');
if (!fs.existsSync(dbPath)) {
    require('./db/init');
}

// Configura express-session
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Cambia a true si usas HTTPS
        httpOnly: true
    } 
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
//config
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//views engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use('/api/users', require('./controllers/users'));
app.use('/api/auth', require('./controllers/auth'));

app.get("/api/hash", (req, res) => {
    res.json(actual_hash["hash"]);
});

app.get('/', isAuthenticated(), (req, res) => {
    const obj = {
        hash: actual_hash["hash"]
    };
    res.render('game', obj);
});

app.get('/game', isAuthenticated(), (req, res) => {
    const obj = {
        hash: actual_hash["hash"]
    };
    res.render('game', obj);
});

app.get("/responder", isAuthenticated(), (req, res) => {
    const { respuesta } = req.query
    const obj = {
        hash: actual_hash["hash"]
    };
    const username = req.session.user;
    const user = User.getFromUsername(username);
    if (respuesta === actual_hash["palabra"]) {
        actual_hash = getRandomHash();
        obj["success"] = true;
        obj["hash"] = actual_hash["hash"];
        user.points += 1;
        user.correct_guesses += 1;
        User.update(user.username, user);
        res.render('game', obj);
    } else {
        user.failed_guesses += 1;
        obj["error"] = "Respuesta incorrecta";
        User.update(user.username, user);
        res.render('game', obj);
    }
});

app.get('/rules', (req, res) => {
    res.render('rules');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('login');
}); 

app.get('/profile', isAuthenticated(), (req, res) => {
    const user = User.getFromUsername(req.session.user);
    const leaderboard = User.leaderboard();
    user.rank = leaderboard.findIndex(u => u.username === user.username);
    res.render('profile', user);
}); 

app.get('/leaderboard', isAuthenticated(), (req, res) => {
    const users = User.all();
    //return only names and points
    users.forEach(user => {
        delete user.password;
    });
    //order by points
    users.sort((a, b) => b.points - a.points);
    res.render('leaderboard', {users});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});