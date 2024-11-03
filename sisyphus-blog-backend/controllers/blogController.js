// controllers/blogController.js

//some initial blogs we can edit later
let blogs = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
];
// Function to get all blog posts
// Sends a JSON response containing the list of all blog posts
exports.getAllBlogs = (req, res) => {
  res.status(200).json(blogs);
};

// Function to create a new blog post
// Validates the incoming request to ensure both title and content are provided
// If valid, creates a new blog post, adds it to the list, and sends a success response
exports.createBlog = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  // Create a new blog post object
// 'id' is assigned a unique value by adding 1 to the current length of the blogs array
// 'title' and 'content' are taken from the request body
  const newBlog = {
    id: blogs.length + 1,
    title,
    content
  };

  blogs.push(newBlog); // Add the new blog post to the mock data
  res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
};

// New function to delete a blog post
exports.deleteBlog = (req, res) => {
  const blogId = parseInt(req.params.id, 10);
  blogs = blogs.filter(blog => blog.id !== blogId); // Remove the blog post with the given id
  res.status(200).json({ message: 'Blog post deleted successfully' });
};