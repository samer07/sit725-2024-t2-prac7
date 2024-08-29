// tests/unit/homeController.test.js

const Destination = require('../../models/destinationModel');
const { getHomePageData } = require('../../controllers/homeController');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/destinationModel');

describe('Home Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return recent destinations for homepage', async () => {
        const mockDestinations = [{ name: 'London', description: 'City of Fog' }];
        Destination.find.mockResolvedValue(mockDestinations);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await getHomePageData(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockDestinations);
        expect(Destination.find).toHaveBeenCalledTimes(1);
    });

    it('should handle errors in getHomePageData', async () => {
        const errorMessage = { message: 'Error fetching homepage data' };
        const rejectedPromise = Promise.reject(errorMessage);
        Destination.find.mockReturnValue(rejectedPromise);

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await getHomePageData(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ message: 'Error fetching homepage data' });
    });
});
