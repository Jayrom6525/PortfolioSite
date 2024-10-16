// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register'; // Import the Register component
import Login from './components/auth/Login'; // Import the Login component
import Home from './components/auth/Home'; // Import the Home component
import NavBar from './components/Navbar'; // Import the NavBar component

import './App.css'; // Import main App styles
import './components/styles/auth.css'; // Correct path to your auth.css file
import './components/styles/home.css'; // Import the home styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        John Romagno Personal Training
      </header>
      
      <Router>
        {/* Navigation bar appears on all pages */}
        <NavBar />
        
        {/* Define the route structure */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Add the route for the registration page */}
          <Route path="/register" element={<Register />} />
          
          {/* Add the route for the login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
