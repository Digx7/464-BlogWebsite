import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = ({ onDelete, user }) => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({}); // Store comments for each blog post
  const [newComments, setNewComments] = useState({}); // Store new comment input for each blog post

  useEffect(() => {
    // Fetch blog posts from the backend
    fetch('http://localhost:3000/api/blogs')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data); // Set the fetched data to the blogs state
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  const fetchComments = (blogId) => {
    // Fetch comments for a specific blog post
    fetch(`http://localhost:3000/api/comments/${blogId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => ({
          ...prevComments,
          [blogId]: data, // Store comments in the state for this blog post
        }));
      })
      .catch((error) => console.error('Error fetching comments:', error));
  };

  const handleAddComment = (blogId) => {
    // Prevent adding empty comments
    if (!newComments[blogId]?.trim()) return;
  
    fetch('http://localhost:3000/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blogId,
        userId: user.id, // Assuming `user` has an `id` property
        content: newComments[blogId],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.comment) { // Check if the response contains the comment object
          // Clear the comment input for the current blog post
          setNewComments((prevNewComments) => ({
            ...prevNewComments,
            [blogId]: '',
          }));
  
          // Update the comments state immediately to include the new comment
          setComments((prevComments) => ({
            ...prevComments,
            [blogId]: [...(prevComments[blogId] || []), data.comment], // Append the new comment
          }));
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error('Error adding comment:', error));
  };
  

  const handleCommentChange = (blogId, value) => {
    // Update the new comment input for the specific blog post
    setNewComments((prevNewComments) => ({
      ...prevNewComments,
      [blogId]: value,
    }));
  };

    return (
      <div className="blog-posts">
      <h2>Blog Posts</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-post">
            <h3 className="post-title">{blog.title}</h3>
            <p className="post-body">{blog.content}</p>
            {user.role === 'developer' && ( // Only show delete button if the user is a developer
              <button onClick={() => onDelete(blog.id)}>Delete</button>
            )}

            {/* Comments Section */}
            <div className="comments">
              <h4>Comments</h4>
              <button onClick={() => fetchComments(blog.id)}>View Comments</button>
              {comments[blog.id] ? (
                comments[blog.id].length > 0 ? (
                  comments[blog.id].map((comment) => (
                    <div key={comment.id}>
                      <p><strong>User {comment.userId}:</strong> {comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )
              ) : (
                <p>Click "View Comments" to see comments.</p>
              )}

              {/* Add Comment Form */}
              <div className="add-comment">
                <textarea
                  value={newComments[blog.id] || ''} // Use the specific comment input for this blog post
                  onChange={(e) => handleCommentChange(blog.id, e.target.value)}
                  placeholder="Add a comment"
                  rows="5"
                  cols="50"
                /><br />
                <button onClick={() => handleAddComment(blog.id)}>Submit</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-posts">No blog posts found.</p>
      )}
    </div>
  );
};

export default Home;
