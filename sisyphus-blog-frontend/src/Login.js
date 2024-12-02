// src/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Make a POST request to the backend login endpoint
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          onLogin(data.user); // Pass the user info (including role) to the parent component
        } else {
          alert(data.message); // Show an error message if login fails
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <input type="submit" value="Login" />
    </div>
    </form>
  );
};

export default Login;
