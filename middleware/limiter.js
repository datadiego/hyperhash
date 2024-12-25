const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // limit each IP to 1 request per windowMs
    message: "Demasiadas peticiónes, intenta de nuevo en un minuto"
});

const limiterMiddleware = (req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP 4.2.0');
    next();
}

module.exports = limiter;