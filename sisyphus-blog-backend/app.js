const express = require('express');
const cors = require('cors'); // Enable CORS
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

// Import your routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes'); // Handles blog-related routes
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); // Make sure this line is correct
app.use('/api/comments', commentRoutes);

// Mock data and controller logic for testing purposes
// You can remove this if your actual database setup is ready
let blogs = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.' }
];

// Connecting to Database
var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./db/main.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err && err.code == "SQLITE_CANTOPEN") {
    createDataBase();
  } else if (err) {
    console.log("Getting error " + err);
  } else {
    runQueries(db);
  }
});

// Blog routes for testing purposes
app.get('/api/blogs', (req, res) => {
  res.status(200).json(blogs);
});

app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newBlog = {
    id: blogs.length + 1,
    title,
    content
  };

  blogs.push(newBlog); // Add the new blog post to the mock data
  res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





function createDataBase() {
  var newdb = new sqlite3.Database('./db/main.db', (err) => {
    if (err) {
      console.log("Getting error" + err);
      exit(1);
    }
    createTables(newdb);
  });
}

function createTables(newdb) {
  console.log(`Running Create Tables`);
  newdb.exec(`
    CREATE TABLE blogs (
      blog_id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      author TEXT NOT NULL
    );
    INSERT INTO BLOGS (blog_id, title, author)
      values (1, 'Blog 1', 'Everette'),
            (2, 'Blog 2', 'Shelby')`, () => {
      runQueries(newdb);
    });
}

function runQueries(db) {
  db.all(`SELECT * FROM blogs WHERE blog_id = ?`, 2, (err, rows) => {
    // console.log(rows)
    
    rows.forEach(row => {
      console.log (row.title + "\t" +
        row.author + "\t" +
        row.data_published + "\t" +
        row.data_last_updated + "\t" +
        row.content);
    });
  });
}
