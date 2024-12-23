const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const isAuthenticated = () => {
    return (req, res, next) => {
        //check for the jwt token
        if (!req.headers.cookie) {
            return res.render('login');
        }
        const token = req.headers.cookie.split('=')[1];
        if (!token) {
            return res.render('login');
        }
        try {
            const decoded = jwt.verify(token, COOKIE_SECRET);
            next();
        } catch (error) {
            return res.render('login');
        }
    }
}

module.exports = isAuthenticated;