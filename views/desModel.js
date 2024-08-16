// desModel.js

export async function fetchDestinations() {
    const response = await fetch('/api/destinations');
    return response.json();
}

export async function fetchDestinationById(id) {
    const response = await fetch(`/api/destinations/${id}`);
    return response.json();
}

export async function createDestination(data) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }
    await fetch('/api/destinations', {
        method: 'POST',
        body: formData
    });
}

export async function updateDestination(id, data) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }
    await fetch(`/api/destinations/${id}`, {
        method: 'PUT',
        body: formData
    });
}

export async function deleteDestination(id) {
    await fetch(`/api/destinations/${id}`, {
        method: 'DELETE'
    });
}
