// model.js

let io; // This will be set to the Socket.io instance

// In-memory array of destinations
const destinations = [
    { id: 1, name: "Kathmandu", description: "Capital city of Nepal", image: "path/to/image.jpg" }
];

// Function to initialize Socket.io instance
export function setSocketIoInstance(socketIoInstance) {
    io = socketIoInstance;
}

// Get all destinations
export function getDestinations() {
    return destinations;
}

// Add a new destination and emit an event
export function addDestination(destination) {
    destination.id = Date.now(); // Simple way to generate a unique ID
    destinations.push(destination);
    
    // Emit event to notify clients of the new destination
    if (io) {
        io.emit('destinationAdded', destination);
    }
}

// Update an existing destination and emit an event
export function updateDestination(id, updatedDestination) {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
        destinations[index] = { ...destinations[index], ...updatedDestination };
        
        // Emit event to notify clients of the update
        if (io) {
            io.emit('destinationUpdated', destinations[index]);
        }
    }
}

// Delete a destination and emit an event
export function deleteDestination(id) {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
        const deletedDestination = destinations.splice(index, 1)[0];
        
        // Emit event to notify clients of the deletion
        if (io) {
            io.emit('destinationDeleted', { id });
        }
    }
}
