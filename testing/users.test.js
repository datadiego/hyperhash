const request = require('supertest');
const express = require('express');
const router = require('../controllers/users');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', router);

describe('GET /users', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /users/1', () => {
    it('responds with json', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ id: 1, username: "admin", password: "admin", current_hash: "aaaa" });
    });
});