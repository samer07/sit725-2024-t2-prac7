// controllers/homeController.js

const Destination = require('../models/destinationModel');

// Get recent destinations for homepage
exports.getHomePageData = async (req, res) => {
    try {
        const recentDestinations = await Destination.find().limit(5); // Fetch up to 5 recent destinations
        res.json(recentDestinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
