const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1, // limit each IP to 1 request per windowMs
    message: "Demasiadas peticiónes, intenta de nuevo en un minuto"
});

module.exports = limiter;