const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://s224711373:WmAvoUgdeLDqzkmN@cluster0.0dvlx6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Destination model
const destinationSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String
});

const Destination = mongoose.model('Destination', destinationSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API routes for destinations
// Get all destinations
app.get('/api/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new destination
app.post('/api/destinations', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const destination = new Destination({ name, description, image });
    try {
        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing destination
app.put('/api/destinations/:id', upload.single('image'), async (req, res) => {
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
});

// Delete a destination
app.delete('/api/destinations/:id', async (req, res) => {
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
});

// Log result of addTwoNumber (existing functionality)
// console.log(addTwoNumber(19, 12));

const port = 8080;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});