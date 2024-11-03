const Joi = require('joi'); // Import Joi
const db = require('../config/db');

// Define a Joi schema for comment validation
const commentSchema = Joi.object({
  blogId: Joi.number().integer().required(), // blogId must be an integer and is required
  userId: Joi.number().integer().required(), // userId must be an integer and is required
  content: Joi.string().min(1).required()    // content must be a string with at least 1 character
});

exports.addComment = (req, res) => {
  // Validate the incoming data using the schema
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Return a 400 error if validation fails
  }

  const { blogId, userId, content } = req.body;

  // Log the data (for debugging)
  console.log('Comment data:', { blogId, userId, content });

  // Proceed with adding the comment logic (e.g., database query)
  res.status(201).json({ message: 'Comment added successfully (mock response)' });
};
