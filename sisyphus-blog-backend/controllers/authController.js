// controllers/authController.js
const Joi = require('joi'); // Import Joi (data validation library for JavaScript)
const users = require('../users'); // Import the users data from users.js
const db = require('../config/db');

// Define a Joi schema for login validation
const loginSchema = Joi.object({
  username: Joi.string().required(), // Username must be a string and is required
  password: Joi.string().required()  // Password must be a string and is required
});

exports.login = (req, res) => {
  // Validate the incoming data using the schema
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Return a 400 error if validation fails
  }

  // If validation passes, proceed with the login logic
  const { username, password } = req.body;

  // Find the user with the given username and password
  const user = users.find(u => u.username === username && u.password === password);

  // If the user is not found, return an error
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // If the user is found, return a success message with user info
  res.status(200).json({
    message: 'Login successful',
    user: {
      username: user.username,
      role: user.role
    }
  });
};
