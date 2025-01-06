const router = require('express').Router();
const User = require('../models/users');
const limiter = require('../middleware/limiter');

router.get('/', (req, res) => {
    try {
        const users = User.all();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Hubo un error', error });
    }
});

router.get('/:id', (req, res) => {
    try {
        const user = User.get(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
});

router.post('/register', limiter, (req, res) => {
    try {
        User.create(req.body);
        const respuesta = {
            username: req.body.username,
            success: true
        };
        res.json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error durante el registro' });
    }
});

router.put('/:id', (req, res) => {
    res.json(User.update(req.params.id, req.body));
});

router.delete('/:id', (req, res) => {
    res.json(User.delete(req.params.id));
});

router.get('/points', (req, res) => {
    try {
        const users = User.all();
        const points = users.map(user => {
            return {
                username: user.username,
                points: user.points
            }
        });
        res.status(200).json(points);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error', error });
    }
});

module.exports = router;