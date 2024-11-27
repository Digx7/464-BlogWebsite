const Joi = require('joi'); // Import Joi

// Temporary in-memory storage for comments
let comments = [];

// This will be used when the database is integrated
// const db = require('../config/db'); // Import the database connection

// Define a Joi schema for comment validation
const commentSchema = Joi.object({
  blogId: Joi.number().integer().required(), // blogId must be an integer and is required
  userId: Joi.number().integer().required(), // userId must be an integer and is required
  content: Joi.string().min(1).required()    // content must be a string with at least 1 character
});

var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/main.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Getting error " + err);
  }
});

// Function to add a new comment to a blog post
exports.addComment = (req, res) => {
  console.log("Add Comment");
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  
  // Validate the incoming data using the schema
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Return a 400 error if validation fails
  }

  const { blogId, userId, content } = req.body;

  // Create a new comment object
  const newComment = {
    id: comments.length + 1, // Generate a unique ID
    blogId,
    userId,
    content,
    createdAt: new Date().toISOString() // Use ISO string format for consistency
  };

  comments.push(newComment); // Add the new comment to the mock data

  // Return the newly created comment
  res.status(201).json({
    message: 'Comment added successfully',
    comment: newComment // Ensure this includes all properties (id, userId, blogId, content, createdAt)
  });
};

// Function to get comments for a specific blog post
exports.getComments = (req, res) => {
  console.log("Get Comments");
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  
  const blogId = parseInt(req.params.blogId, 10); // Get the blog ID from the URL parameters
  // const postComments = comments.filter(comment => comment.blogId === blogId); // Filter comments by blog ID
  // res.status(200).json(postComments); // Return the filtered comments

  db.all(`SELECT blogId, userId, content FROM comments WHERE blogId = ?`, blogId, (err, rows) => {
    // console.log(rows);
    res.status(200).json(rows);
  });

};
