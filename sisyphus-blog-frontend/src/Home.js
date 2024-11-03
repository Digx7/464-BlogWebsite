import React, { useEffect, useState } from 'react';

const Home = ({ onDelete, user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog posts from the backend
    fetch('http://localhost:3000/api/blogs')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched blog data:', data); // Log the fetched data
        setBlogs(data); // Set the fetched data to the blogs state
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            {user.role === 'developer' && ( // Only show delete button if the user is a developer
              <button onClick={() => onDelete(blog.id)}>Delete</button>
            )}
          </div>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default Home;
