// routes/destinationRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

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

// Define routes for destinations
router.get('/', destinationController.getDestinations);
router.post('/', upload.single('image'), destinationController.createDestination);
router.put('/:id', upload.single('image'), destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
