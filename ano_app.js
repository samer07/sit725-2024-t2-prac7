const express = require('express');
const mongoose = require('mongoose');
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
    image: String // Field for image URL
});

const Destination = mongoose.model('Destination', destinationSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Function to add two numbers (existing functionality)
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
};

// Existing route for adding two numbers
app.get("/addTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2);
    res.json({ statusCode: 200, data: result });
});

// Existing route to display HTML
app.get("/Display", (req, res) => {
    const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(n1));
});

// New API routes for destinations
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
app.post('/api/destinations', async (req, res) => {
    const { name, description, image } = req.body;
    const destination = new Destination({ name, description, image });
    try {
        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing destination
app.put('/api/destinations/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;
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
console.log(addTwoNumber(19, 12));

const port = 8080;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
