const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/db');
const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login endpoint using Passport.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If successful, log the user in
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Send success message after login
            res.json({ message: 'User logged in successfully', user: user });
        });
    })(req, res, next);
});

// Logout endpoint
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'User logged out successfully' });
    });
});

// Optional: Add a route to get the current user (for session checks)
router.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user });
    } else {
        return res.status(401).json({ message: 'Not authenticated' });
    }
});


module.exports = router;
