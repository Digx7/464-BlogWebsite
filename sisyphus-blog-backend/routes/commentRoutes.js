// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment } = require('../controllers/commentController');

router.post('/', addComment);

module.exports = router; // Make sure you are exporting the router
