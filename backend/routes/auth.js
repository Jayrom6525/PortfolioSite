const express = require('express');
const bcrypt = require('bcryptjs'); // Corrected from bycrypt to bcrypt
const passport = require('passport');
const pool = require('../config/db');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
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

module.exports = router;
