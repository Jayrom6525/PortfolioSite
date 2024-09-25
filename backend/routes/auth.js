const express = require('express');
const bycrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/db');

const router = express.Router();

//registration endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //hash  passsword
    const hashedPassword = await bycrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
});

//login endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'User logged in successfully' });
});

//logout endpoint
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'User logged out successfully' });
});

module.exports = router;