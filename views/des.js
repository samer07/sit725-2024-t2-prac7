document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('destination-form');
    const destinationIdInput = document.getElementById('destination-id');
    const destinationCardsContainer = document.getElementById('destination-cards');
    const socket = io(); // Connect to the Socket.io server

    // Fetch and display destinations
    async function fetchDestinations() {
        try {
            const response = await fetch('/api/destinations');
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
                        <button onclick="editDestination('${dest._id}')">Edit</button>
                        <button onclick="deleteDestination('${dest._id}')">Delete</button>
                    </div>
                `;
                destinationCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = destinationIdInput.value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (id) {
                // Update destination
                await fetch(`/api/destinations/${id}`, {
                    method: 'PUT',
                    body: formData
                });

                // Emit a socket event to notify all clients of the update
                socket.emit('updateDestination', { id, name, description });
            } else {
                // Create new destination
                const response = await fetch('/api/destinations', {
                    method: 'POST',
                    body: formData
                });
                const newDestination = await response.json();

                // Emit a socket event to notify all clients of the new destination
                socket.emit('addDestination', newDestination);
            }
            form.reset();
            destinationIdInput.value = '';
            fetchDestinations();
        } catch (error) {
            console.error('Error saving destination:', error);
        }
    });

    // Edit destination
    window.editDestination = async (id) => {
        try {
            const response = await fetch(`/api/destinations/${id}`);
            const destination = await response.json();
            document.getElementById('name').value = destination.name;
            document.getElementById('description').value = destination.description;
            document.getElementById('image').value = ''; // Reset file input
            document.getElementById('destination-id').value = destination._id;
        } catch (error) {
            console.error('Error fetching destination for edit:', error);
        }
    };

    // Delete destination
    window.deleteDestination = async (id) => {
        try {
            await fetch(`/api/destinations/${id}`, {
                method: 'DELETE'
            });

            // Emit a socket event to notify all clients of the deletion
            socket.emit('deleteDestination', { id });
            fetchDestinations();
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };

    // Listen for real-time updates from the server
    socket.on('destinationUpdated', (updatedDestination) => {
        console.log('Received updated destination:', updatedDestination);
        // Fetch and display updated destinations
        fetchDestinations();
    });

    socket.on('destinationAdded', (newDestination) => {
        console.log('New destination added:', newDestination);
        // Fetch and display updated destinations
        fetchDestinations();
    });

    socket.on('destinationDeleted', (deletedDestination) => {
        console.log('Destination deleted:', deletedDestination);
        // Fetch and display updated destinations
        fetchDestinations();
    });

    // Initial fetch
    fetchDestinations();
});
