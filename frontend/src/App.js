// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register'; // Import the Register component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        John Romagno Personal Training
      </header>
      <Router>
        <Routes>
          {/* Add the route for the registration page */}
          <Route path="/register" element={<Register />} />
          
          {/* You can add more routes here for other pages, like login, home, etc. */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
