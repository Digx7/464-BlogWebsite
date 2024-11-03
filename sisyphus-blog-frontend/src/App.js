import React, { useState, useEffect } from 'react';
import Login from './Login';
import Home from './Home';

function App() {
  const [user, setUser] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleLogin = userInfo => {
    setUser(userInfo);
  };

  const handleCreatePost = e => {
    e.preventDefault();
    fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newPostTitle, content: newPostContent })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Blog post created successfully') {
          alert('Blog post created!');
          setNewPostTitle('');
          setNewPostContent('');
          fetch('http://localhost:3000/api/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching updated blogs:', error));
        } else {
          alert('Error creating blog post');
        }
      })
      .catch(error => console.error('Error creating blog post:', error));
  };

  const handleDeletePost = id => {
    fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Blog post deleted successfully') {
          fetch('http://localhost:3000/api/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching updated blogs:', error));
        } else {
          alert('Error deleting blog post');
        }
      })
      .catch(error => console.error('Error deleting blog post:', error));
  };

  return (
    <div className="App">
      <h1>Sisyphus Blog</h1>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Home blogs={blogs} onDelete={handleDeletePost} user={user} /> {/* Pass the user object */}
          {user.role === 'developer' && (
            <div>
              <h2>Create a Blog Post</h2>
              <form onSubmit={handleCreatePost}>
                <input
                  type="text"
                  placeholder="Title"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                />
                <textarea
                  placeholder="Content"
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
