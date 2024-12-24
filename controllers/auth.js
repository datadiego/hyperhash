const router = require('express').Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { isValidUser } = require('../models/auth');
const dotenv = require('dotenv');
dotenv.config();
const COOKIE_SECRET = process.env.COOKIE_SECRET;

router.post('/login', (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    if (isValidUser(user, password)) {
        req.session.user = user;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid login' });
    }
});
module.exports = router;