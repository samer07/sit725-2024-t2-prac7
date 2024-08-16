// model.js

const destinations = [
    // Sample data
    { id: 1, name: "Kathmandu", description: "Capital city of Nepal", image: "path/to/image.jpg" }
  ];
  
  export function getDestinations() {
    return destinations;
  }
  
  export function addDestination(destination) {
    destinations.push(destination);
  }
  
  export function updateDestination(id, updatedDestination) {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
      destinations[index] = { ...destinations[index], ...updatedDestination };
    }
  }
  
  export function deleteDestination(id) {
    const index = destinations.findIndex(dest => dest.id === id);
    if (index !== -1) {
      destinations.splice(index, 1);
    }
  }
  