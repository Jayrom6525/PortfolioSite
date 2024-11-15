import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/auth/Home';
import Profile from './components/auth/Profile';
import Cart from './components/auth/Cart';

import './App.css'; // Import main App styles
import './components/styles/auth.css'; // Correct path to your auth.css file
import './components/styles/home.css'; // Import the home styles

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking the presence of an auth token
    const token = localStorage.getItem('authToken');
    console.log('Auth toekn:', token); //debugging
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

  const handleAddToCart = (service) => {
    setCartItems([...cartItems, service]);
  };

  return (
    <div className="App">
      <header className="App-header">
        John Romagno Personal Training
      </header>
      
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItemCount={cartItems.length}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;