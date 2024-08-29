// controllers/destinationController.js

const Destination = require('../models/destinationModel');

// Get all destinations
exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error.message);  // Log error message
        console.error('Stack trace:', error.stack);  // Log stack trace
        res.status(500).json({ message: error.message });
    }
};


// Create a new destination
exports.createDestination = async (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const destination = new Destination({ name, description, image });
    try {
        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing destination
exports.updateDestination = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const updatedDestination = await Destination.findByIdAndUpdate(id, { name, description, image }, { new: true });
        if (!updatedDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(updatedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDestination = await Destination.findByIdAndDelete(id);
        if (!deletedDestination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
