// src/components/NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <li className="profile-dropdown">
              <img
                src="/images/user.png" // Ensure this path leads to your default profile icon
                alt="Profile"
                className="profile-icon"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
