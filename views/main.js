document.addEventListener('DOMContentLoaded', () => {
  const destinationCardsContainer = document.getElementById('destination-cards');

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
                  </div>
              `;
              destinationCardsContainer.appendChild(card);
          });
      } catch (error) {
          console.error('Error fetching destinations:', error);
      }
  }

  // Initial fetch
  fetchRecentDestinations();
});
