// tests/unit/destinationController.test.js

const Destination = require('../../models/destinationModel');
const { getDestinations, createDestination, updateDestination, deleteDestination } = require('../../controllers/destinationController');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

jest.mock('../../models/destinationModel');  // Mock the Destination model

describe('Destination Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all destinations', async () => {
        const mockDestinations = [{ name: 'Paris', description: 'City of Light' }];
        Destination.find.mockResolvedValue(mockDestinations);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await getDestinations(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockDestinations);
        expect(Destination.find).toHaveBeenCalledTimes(1);
    });

    it('should handle errors in getDestinations', async () => {
        const errorMessage = { message: 'Error fetching destinations' };
        const rejectedPromise = Promise.reject(errorMessage);
        Destination.find.mockReturnValue(rejectedPromise);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await getDestinations(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error fetching destinations' });
    });

    // Add similar tests for createDestination, updateDestination, and deleteDestination methods
});
