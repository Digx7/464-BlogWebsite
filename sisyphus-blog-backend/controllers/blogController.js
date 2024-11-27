// controllers/blogController.js

//some initial blogs we can edit later
let blogs = [
  // { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  // { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
];

var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/main.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Getting error " + err);
  }
});

// Function to get all blog posts
// Sends a JSON response containing the list of all blog posts
exports.getAllBlogs = (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  db.all(`SELECT id, title, content FROM blogs`, (err, rows) => {
    if (err) {console.log(err)}
    else {
      res.status(200).json(rows);
    }
  });

  // res.status(200).json(blogs);
};

// Function to create a new blog post
// Validates the incoming request to ensure both title and content are provided
// If valid, creates a new blog post, adds it to the list, and sends a success response
exports.createBlog = (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  

  // Create a new blog post object
// 'id' is assigned a unique value by adding 1 to the current length of the blogs array
// 'title' and 'content' are taken from the request body
  // const newBlog = {
  //   id: newID,
  //   title,
  //   content
  // };

  db.all(`INSERT INTO blogs (id, title, author_id, date_published, date_last_updated, content)
          VALUES (NULL, ?, 1, datetime('now'), datetime('now'), ?)`, [title, content], (err, rows) => {
            if (err) {
              console.log("Getting Error " + err);
            } else {
              // res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
              res.status(201).json({message: 'Blog post created successfully'});
            }
          });

  // blogs.push(newBlog); // Add the new blog post to the mock data
  // res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
};

// New function to delete a blog post
exports.deleteBlog = (req, res) => {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  const blogId = parseInt(req.params.id, 10);
  // blogs = blogs.filter(blog => blog.id !== blogId); // Remove the blog post with the given id

  db.all(`DELETE FROM blogs WHERE id = ?`, blogId, (err) => {
    if (err) {
      console.log("Getting Error " + err);
    } else {
      console.log("Trying to delete blog " + blogId);
      res.status(201).json({ message: 'Blog post deleted successfully' });
    }
  });


  // res.status(200).json({ message: 'Blog post deleted successfully' });
};