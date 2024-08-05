// routes/index.js
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');

router.get('/status', AppController.getStatus);

// GET /stats
router.get('/stats', AppController.getStats);

module.exports = router;
