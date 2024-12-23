const isAuthenticated = require('./middleware/auth');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/users');
dotenv.config();
const COOKIE_SECRET = process.env.COOKIE_SECRET;
router.get('/', isAuthenticated(), (req, res) => {
    res.render('game');
});

router.get('/game', isAuthenticated(), (req, res) => {
    res.render('game');
});

router.get('/rules', (req, res) => {
    res.render('rules');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.render('login');
});

router.get('/profile', isAuthenticated(), (req, res) => {
    const token = req.headers.cookie.split('=')[1];
    const decoded = jwt.verify(token, COOKIE_SECRET);
    const user = User.getFromUsername(decoded.user);
    res.render('profile', user);
});

module.exports = router;