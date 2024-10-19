import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after successful registration

const Register = () => {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For programmatic navigation after registration

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      // Make an API call to the backend registration route
      const response = await fetch('http://localhost:5000/register', { // Adjusted to the correct port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      if (!response.ok) {
        // If status is not okay, handle the error
        const errorData = await response.json(); // Parse the error response
        setErrorMessage(errorData.message || 'Registration failed!');
      } else {
        const data = await response.json(); // Parse the success response
        setSuccessMessage('Registration successful! You can now log in.');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after 3 seconds (optional)
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="username"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="new-password"
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
