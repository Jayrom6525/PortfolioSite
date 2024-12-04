const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// middleware to verfiy jwt token
const verifyToken = (req,res,next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

//Add item to cart
router.post('/cart', verifyToken, async (req, res) => {
    const { userId } = req;
    const { serviceId, title, description, img } = req.body;

    try {
        await pool.query(
            'INSERT INTO cart (user_id, service_id, title, description, img) VALUES ($1, $2, $3, $4, $5)',
            [userId, serviceId, title, description, img]
        );
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart' });
    }
});

//Get cart Items
router.get('/cart', verifyToken, async (req, res) => {
    const { userId } = req;

    try {
        const { rows } = await pool.query('SELECT * FROM cart WHERE user_id = $1', [userId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' });
    }
});

//Remove item from cart
router.delete('/cart/:serviceId', verifyToken, async (req, res) => {
    const { userId } = req;
    const { serviceId } = req.params;

    try {
        await pool.query('DELETE FROM cart WHERE user_id = $1 AND service_id = $2', [userId, serviceId]);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
    }
});

module.exports = router;