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

  console.log(`Creating Users`);
  newdb.exec(`
    CREATE TABLE users (
      user_id INTEGER PRIMARY KEY NOT NULL,
      username TEXT NOT NULL,
      profile_pic BLOB,
      password_hash TEXT NOT NULL
    );
    INSERT INTO users
      VALUES (1, 'Digx7', NULL, 'jR;e~HWtPQKiFkWco.cY)=wE^)=+,#8Du=A60H[Coli1Pn4J7Z'),
              (2, 'Masher2', NULL, 'pP}iMWySTLRadUutBMez(Mv(eXAL._r[wnTM;y2OXroDmCV=1'),
              (3, 'Oceanstuck', NULL, 'gwTdi!Sby5JQXe6vUZSu.HEN[$@!$X#%rX-#X+AOji~k2y~16'),
              (4, 'Jxxmimi', NULL, 'r-Y+%UM9#z$1N~zxkCOm54Ch~C@noKtq8uTljE4xQs3q[CO06K');
  `, (err) => {
    if (err) {
      console.log("Getting Error " + err);
      exit(1);
    }
  });

  console.log(`Creating Blogs`);
  newdb.exec(`
    CREATE TABLE blogs (
      blog_id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      author_id INTEGER NOT NULL,
      date_published TEXT NOT NULL,
      date_last_updated TEXT NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET DEFAULT
    );
    INSERT INTO blogs
      VALUES (1, 'Top 10 Ways to Cheat On A Final Project', 1, datetime('now'), datetime('now'), '<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title>Top 10 Ways to Cheat On A Final Project</title>
              </head>
              <body>
                <p>DONT</p>
              </body>
              </html>');
    `, (err) => {
      if (err) {
        console.log("Getting Error " + err);
        exit(1);
      }
  });

  console.log(`Creating Comments`);
  newdb.exec(`
    CREATE TABLE comments (
      comment_id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      blog_id INTEGER NOT NULL,
      date_posted TEXT NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (blog_id) REFERENCES blogs(blog_id) ON DELETE CASCADE
    );
    INSERT INTO comments
      VALUES (1, 1, 1, '2024-10-10 13:30:30:003', 'First');
    `, (err) => {
      if (err) {
        console.log("Getting Error " + err);
        exit(1);
      }
  });

  runQueries(newdb);


  // newdb.exec(`
  //   CREATE TABLE users (
  //     user_id INTEGER PRIMARY KEY NOT NULL,
  //     username TEXT NOT NULL,
  //     profile_pic BLOB,
  //     password_hash TEXT NOT NULL
  //   );
  //   CREATE TABLE blogs (
  //     blog_id INTEGER PRIMARY KEY NOT NULL,
  //     title TEXT NOT NULL,
  //     author_id INTEGER NOT NULL,
  //     date_published TEXT NOT NULL,
  //     date_last_updated TEXT NOT NULL,
  //     content TEXT NOT NULL,
  //     FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET DEFAULT
  //   );
  //   CREATE TABLE comments (
  //     comment_id INTEGER PRIMARY KEY NOT NULL,
  //     user_id INTEGER NOT NULL,
  //     blog_id INTEGER NOT NULL,
  //     date_posted TEXT NOT NULL,
  //     content TEXT NOT NULL
  //     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
  //     FOREIGN KEY (blog_id) REFERENCES blogs(blog_id) ON DELETE CASCADE
  //   );
  //   INSERT INTO users
  //     VALUES (NULL, 'Digx7', NULL, 'jR;e~HWtPQKiFkWco.cY)=wE^)=+,#8Du=A60H[Coli1Pn4J7Z'),
  //             (NULL, 'Masher2', NULL, 'pP}iMWySTLRadUutBMez(Mv(eXAL._r[wnTM;y2OXroDmCV=1'),
  //             (NULL, 'Oceanstuck', NULL, 'gwTdi!Sby5JQXe6vUZSu.HEN[$@!$X#%rX-#X+AOji~k2y~16'),
  //             (NULL, 'Jxxmimi', NULL, 'r-Y+%UM9#z$1N~zxkCOm54Ch~C@noKtq8uTljE4xQs3q[CO06K');
  //   INSERT INTO blogs
  //     VALUES (NULL, 'Top 10 Ways to Cheat On A Final Project', 0, '2024-10-10 13:30:30:003','2024-10-10 13:30:30:003', '<!DOCTYPE html>
  //             <html lang="en">
  //             <head>
  //               <meta charset="utf-8">
  //               <title>Top 10 Ways to Cheat On A Final Project</title>
  //             </head>
  //             <body>
  //               <p>DONT</p>
  //             </body>
  //             </html>');
  //   INSERT INTO comments
  //     VALUES (NULL, 0, 0, '2024-10-10 13:30:30:003', 'First');
    
  //   `, () => {
  //     runQueries(newdb);
  //   });
}

function runQueries(db) {
  // db.all(`SELECT * FROM comments WHERE blog_id = ?`, 1, (err, rows) => {
    
  //   rows.forEach(row => {
  //     console.log (row.content);
  //   });
  // });
}
