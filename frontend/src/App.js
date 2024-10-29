import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/auth/Home';
import Profile from './components/auth/Profile';

import './App.css'; // Import main App styles
import './components/styles/auth.css'; // Correct path to your auth.css file
import './components/styles/home.css'; // Import the home styles

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the presence of an auth token
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="App">
      <header className="App-header">
        John Romagno Personal Training
      </header>
      
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;