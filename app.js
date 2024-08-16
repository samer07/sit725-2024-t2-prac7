// app.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://s224711373:WmAvoUgdeLDqzkmN@cluster0.0dvlx6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Import routes
const destinationRoutes = require('./routes/destinationRoutes');
const homeRoutes = require('./routes/homeRoutes');

app.use('/api/destinations', destinationRoutes);
app.use('/api/home', homeRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
