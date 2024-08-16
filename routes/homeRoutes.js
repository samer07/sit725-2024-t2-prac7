// routes/homeRoutes.js

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Define route for homepage data
router.get('/', homeController.getHomePageData);

module.exports = router;
