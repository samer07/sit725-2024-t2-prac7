// desController.js
import { fetchDestinations, fetchDestinationById, createDestination, updateDestination, deleteDestination } from './desModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('destination-form');
    const destinationIdInput = document.getElementById('destination-id');
    const destinationCardsContainer = document.getElementById('destination-cards');

    async function renderDestinations() {
        try {
            const destinations = await fetchDestinations();
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = destinationIdInput.value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const imageFile = document.getElementById('image').files[0];

        const data = { name, description, image: imageFile };
        
        try {
            if (id) {
                await updateDestination(id, data);
            } else {
                await createDestination(data);
            }
            form.reset();
            destinationIdInput.value = '';
            renderDestinations();
        } catch (error) {
            console.error('Error saving destination:', error);
        }
    });

    window.editDestination = async (id) => {
        try {
            const destination = await fetchDestinationById(id);
            document.getElementById('name').value = destination.name;
            document.getElementById('description').value = destination.description;
            document.getElementById('image').value = ''; // Reset file input
            document.getElementById('destination-id').value = destination._id;
        } catch (error) {
            console.error('Error fetching destination for edit:', error);
        }
    };

    window.deleteDestination = async (id) => {
        try {
            await deleteDestination(id);
            renderDestinations();
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };

    renderDestinations();
});
