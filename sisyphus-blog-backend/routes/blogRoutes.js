const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController'); // Import the blog controller

// Route to get all blog posts
router.get('/', blogController.getAllBlogs);

// Route to create a new blog post
router.post('/', blogController.createBlog);

// New route to delete a blog post
router.delete('/:id', blogController.deleteBlog);

module.exports = router; // Export the router
