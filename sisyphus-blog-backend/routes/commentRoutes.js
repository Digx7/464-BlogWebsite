// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Route to get comments for a specific blog post
router.get('/:blogId', commentController.getComments);

// Route to add a new comment to a blog post
router.post('/', commentController.addComment);

module.exports = router;
