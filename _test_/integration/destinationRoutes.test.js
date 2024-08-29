const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const destinationRoutes = require('../../routes/destinationRoutes');

const app = express();
app.use(express.json());
app.use('/api/destinations', destinationRoutes);

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://s224711373:WmAvoUgdeLDqzkmN@cluster0.0dvlx6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test');
}, 20000);  // 20 seconds timeout for this hook

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Destination Routes Integration Test', () => {
    it('should create a new destination', async () => {
        const newDestination = { name: 'Paris', description: 'The city of light' };
        const res = await request(app).post('/api/destinations').send(newDestination);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('Paris');
    }, 20000);  // 20 seconds timeout for this test
});
