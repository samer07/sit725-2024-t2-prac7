// tests/integration/desModel.test.js

import { fetchDestinations, createDestination, deleteDestination } from '../../views/desModel';

describe('Destination API Integration Test', () => {
    it('should fetch destinations', async () => {
        const destinations = await fetchDestinations();
        expect(destinations).toBeDefined();
        expect(destinations.length).toBeGreaterThan(0);
    });

    it('should create a new destination', async () => {
        const newDest = { name: 'Lumbini', description: 'Birthplace of Buddha' };
        await createDestination(newDest);
        const destinations = await fetchDestinations();
        expect(destinations.some(dest => dest.name === 'Lumbini')).toBe(true);
    });

    it('should delete a destination', async () => {
        const destinationsBefore = await fetchDestinations();
        const idToDelete = destinationsBefore[0]._id; // Assuming _id is the identifier
        await deleteDestination(idToDelete);
        const destinationsAfter = await fetchDestinations();
        expect(destinationsAfter.length).toBeLessThan(destinationsBefore.length);
    });
});
