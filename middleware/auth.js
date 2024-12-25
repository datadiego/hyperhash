const dotenv = require('dotenv');
dotenv.config();
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const isAuthenticated = () => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.render('login');
        }
        next();
    }
}

module.exports = isAuthenticated;