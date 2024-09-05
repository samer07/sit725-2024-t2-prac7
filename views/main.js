document.addEventListener('DOMContentLoaded', () => {
    const destinationCardsContainer = document.getElementById('destination-cards');
    const socket = io(); // Connect to the Socket.io server

    // Fetch and display recent destinations
    async function fetchRecentDestinations() {
        try {
            const response = await fetch('/api/home');
            const destinations = await response.json();
            destinationCardsContainer.innerHTML = ''; // Clear existing cards
            destinations.forEach(dest => {
                const card = document.createElement('div');
                card.className = 'destination-card';
                card.innerHTML = `
                    <img src="${dest.image}" alt="${dest.name}">
                    <div class="destination-card-content">
                        <h3>${dest.name}</h3>
                        <p>${dest.description}</p>
                    `;
                destinationCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    }

    // Initial fetch to load destinations when the page loads
    fetchRecentDestinations();

    // Listen for real-time updates from the server when a destination is updated
    socket.on('destinationUpdated', (data) => {
        console.log('Received updated destination:', data);
        // Optionally, fetch recent destinations again to refresh the UI
        fetchRecentDestinations();
    });

    // listen for other events such as new destination added, deleted, etc.
    socket.on('destinationAdded', (newDestination) => {
        console.log('New destination added:', newDestination);
        // Update the UI or re-fetch the destination list
        fetchRecentDestinations();
    });
});
