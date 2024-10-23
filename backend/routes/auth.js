const express = require('express');
const bcrypt = require('bcryptjs'); // Ensure you have bcrypt for password hashing
const passport = require('passport');
const pool = require('../config/db'); // Import the pool instance from pg
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Log the incoming registration request for debugging
        console.log('Registration attempt:', req.body);

        // Check if the username already exists
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        console.log('User exists:', userExists.rows);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Insert new user into the database
        console.log('Inserting user into the database...');
        await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error); // More descriptive error logging
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'User logged in successfully' });
});

// Logout endpoint
router.get('/logout', (req, res) => {
    req.logout((err) => { // Include error handling
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'User logged out successfully' });
    });
});

// Optional: Add a route to get the current user (for session checks)
router.get('/current_user', (req, res) => {
    res.send(req.user); // Send the user info if logged in
});

module.exports = router;