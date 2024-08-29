// tests/unit/destinationRoutes.test.js

const request = require('supertest');
const express = require('express');
const destinationRoutes = require('../../routes/destinationRoutes');
const Destination = require('../../models/destinationModel');

jest.mock('../../models/destinationModel'); // Mock the Destination model

const app = express();
app.use(express.json());
app.use('/api/destinations', destinationRoutes);

describe('Destination Routes', () => {
    it('should return a list of destinations', async () => {
        // Mock the find method of the Destination model
        Destination.find.mockResolvedValue([{ name: 'Paris', description: 'The city of light' }]);

        const res = await request(app).get('/api/destinations');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
