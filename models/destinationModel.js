// models/destinationModel.js

const mongoose = require('mongoose');

// Define schema for destinations
const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
});

// Export the model based on the schema
module.exports = mongoose.model('Destination', destinationSchema);
