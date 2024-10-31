import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful login
import '../styles/login.css'; // Ensure correct path to your login.css

const Login = ({ setIsLoggedIn }) => {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle error messages
  const navigate = useNavigate(); // For programmatic navigation

  // Dummy login logic, replace with an actual API call to backend
  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This allows sending cookies for session management
      });
  

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data); //debugging
        alert(data.message); //display success message
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        setIsLoggedIn(true); // set authenticaion state to true
        navigate('/'); // Redirect to homepage on successful login
        return true; // Login successful
      } else {
        setError('Invalid email or password');
        return false; // Login failed
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
      console.error('Login Error:', error);
      return false; // Login failed due to an error
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call login function to authenticate user
    const isAuthenticated = await loginUser(email, password);

    if (isAuthenticated) {
      // Redirect to homepage on successful login
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error messages */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
