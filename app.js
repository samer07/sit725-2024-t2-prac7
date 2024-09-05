const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

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

// Create the HTTP server and attach Socket.io
const server = http.createServer(app);
const io = socketIO(server);

let connectedClients = 0;

// Handle socket connections
io.on('connection', (socket) => {
    connectedClients++;
    console.log('New client connected');
    io.emit('clientCount', connectedClients); // Send client count to all clients

    socket.on('addDestination', (newDestination) => {
        io.emit('destinationAdded', newDestination);
    });

    socket.on('updateDestination', (updatedDestination) => {
        io.emit('destinationUpdated', updatedDestination);
    });

    socket.on('deleteDestination', (deletedDestination) => {
        io.emit('destinationDeleted', deletedDestination);
    });

    socket.on('disconnect', () => {
        connectedClients--;
        console.log('Client disconnected');
        io.emit('clientCount', connectedClients); // Send updated client count to all clients
    });
});

// Listen on a specific port
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
