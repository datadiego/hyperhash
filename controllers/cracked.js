const router = require('express').Router();
const Cracked = new require('../models/cracked')
const limiter = require('../middleware/limiter');

router.get('/', (req, res) => {
    try {
        const cracked = Cracked.all();
        res.status(200).json(cracked);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error', error });
    }
});

router.get('/:name', (req, res) => {
    try {
        const cracked = Cracked.get(req.params.name);
        res.status(200).json(cracked);
    }
    catch (error) {
        res.status(404).json({ error: 'Cracked not found' });
    }
});

module.exports = router;


