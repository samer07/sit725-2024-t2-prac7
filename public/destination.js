document.addEventListener('DOMContentLoaded', () => {
    const destinationList = document.getElementById('destinations');
    const addDestinationForm = document.getElementById('addDestinationForm');
    const editDestinationForm = document.getElementById('editDestinationForm');
    const editDestinationSection = document.getElementById('editDestinationSection');
  
    // Fetch all destinations on page load
    fetch('/api/destinations')
      .then((response) => response.json())
      .then((destinations) => {
        destinations.forEach((destination) => {
          addDestinationToList(destination);
        });
      });
  
    // Add a destination
    addDestinationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = addDestinationForm.name.value;
      const description = addDestinationForm.description.value;
  
      fetch('/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
        .then((response) => response.json())
        .then((destination) => {
          addDestinationToList(destination);
          addDestinationForm.reset();
        });
    });
  
    // Edit a destination
    editDestinationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editDestinationForm['edit-id'].value;
      const name = editDestinationForm['edit-name'].value;
      const description = editDestinationForm['edit-description'].value;
  
      fetch(`/api/destinations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
        .then((response) => response.json())
        .then((updatedDestination) => {
          updateDestinationInList(updatedDestination);
          editDestinationForm.reset();
          editDestinationSection.style.display = 'none';
        });
    });
  
    // Function to add a destination to the list
    function addDestinationToList(destination) {
      const li = document.createElement('li');
      li.dataset.id = destination._id;
      li.innerHTML = `
        <span>${destination.name}: ${destination.description}</span>
        <div>
          <button class="edit" onclick="editDestination('${destination._id}', '${destination.name}', '${destination.description}')">Edit</button>
          <button onclick="deleteDestination('${destination._id}')">Delete</button>
        </div>
      `;
      destinationList.appendChild(li);
    }
  
    // Function to update a destination in the list
    function updateDestinationInList(destination) {
      const li = destinationList.querySelector(`li[data-id="${destination._id}"]`);
      if (li) {
        li.querySelector('span').textContent = `${destination.name}: ${destination.description}`;
      }
    }
  // Function to delete a destination
  window.deleteDestination = function (id) {
    fetch(`/api/destinations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          const li = destinationList.querySelector(`li[data-id="${id}"]`);
          if (li) {
            destinationList.removeChild(li);
          }
        } else {
          console.error('Failed to delete destination');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to populate the edit form with existing destination data
  window.editDestination = function (id, name, description) {
    editDestinationForm['edit-id'].value = id;
    editDestinationForm['edit-name'].value = name;
    editDestinationForm['edit-description'].value = description;
    editDestinationSection.style.display = 'block';
    window.scrollTo(0, 0);
  };
});
  