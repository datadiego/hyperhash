const path = require('path');
const fs = require('fs');
const isAuthenticated = require('./middleware/auth');
const express = require('express');
const nunjucks = require('nunjucks');
const User = require('./models/users');
const getRandomHash = require('./utils/getRandom');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV !== 'production') {
    console.log("Running in development mode");
    require('dotenv').config();
} else {
    console.log("Running in production mode");
}
const COOKIE_SECRET = process.env.COOKIE_SECRET;
console.log(COOKIE_SECRET);
let actual_hash = {
    ...getRandomHash(),
    timestamp: Date.now()
}



const app = express();

//check if db exists
const dbPath = path.join(__dirname, 'db/db.sqlite');
if (!fs.existsSync(dbPath)) {
    require('./db/init');
}

// Configura express-session
app.use(session({
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: 'db' }),
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
app.use('/files', express.static(path.join(__dirname, 'utils')));
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
app.use('/api/cracked', require('./controllers/cracked'));

app.get("/api/hash", (req, res) => {
    res.json(actual_hash["hash"]);
});

app.get('/', isAuthenticated(), (req, res) => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - actual_hash["timestamp"];
    const hoursElapse = Math.floor(timeElapsed / 3600000);
    const points = 1 + hoursElapse;
    console.log("Puntos:", points);
    const obj = {
        hash: actual_hash["hash"],
        points
    };
    res.render('game', obj);
});

app.get('/game', isAuthenticated(), (req, res) => {
    res.redirect('/'); 
});

app.get("/responder", isAuthenticated(), (req, res) => {
    const { respuesta } = req.query
    const obj = {
        hash: actual_hash["hash"]
    };
    const username = req.session.user;
    const user = User.getFromUsername(username);
    if (respuesta === actual_hash["palabra"]) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - actual_hash["timestamp"];
        const hoursElapse = Math.floor(timeElapsed / 3600000);
        const points = 1 + hoursElapse;

        user.points += points;
        user.successful_guesses += 1;
        actual_hash = {
            ...getRandomHash(),
            timestamp: Date.now()
        };
        User.update(user.username, user);
        obj["success"] = true;
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
    res.redirect('/');
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

app.get('/points', isAuthenticated(), (req, res) => {
    const users = User.all();
    const points = users.map(user => {
        return {
            username: user.username,
            points: user.points
        }
    });
    res.json(points);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});