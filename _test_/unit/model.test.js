// tests/unit/model.test.js

import { getDestinations, addDestination, updateDestination, deleteDestination } from '../../views/model';

describe('Model Functions', () => {
    beforeEach(() => {
        // Reset the destinations array before each test
        destinations.length = 0;
        addDestination({ id: 1, name: 'Kathmandu', description: 'Capital city of Nepal', image: 'path/to/image.jpg' });
    });

    it('should get all destinations', () => {
        const result = getDestinations();
        expect(result.length).toBe(1);
    });

    it('should add a new destination', () => {
        addDestination({ id: 2, name: 'Pokhara', description: 'Beautiful city', image: 'path/to/image2.jpg' });
        const result = getDestinations();
        expect(result.length).toBe(2);
    });

    it('should update an existing destination', () => {
        updateDestination(1, { name: 'Kathmandu Updated' });
        const result = getDestinations().find(dest => dest.id === 1);
        expect(result.name).toBe('Kathmandu Updated');
    });

    it('should delete a destination', () => {
        deleteDestination(1);
        const result = getDestinations();
        expect(result.length).toBe(0);
    });
});
