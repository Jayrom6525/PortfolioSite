require('dotenv').config(); //Load enviorment variables
const express = require('express');
const cors = require('cors'); // This is useful for allowing requests from your frontend
const session = require('express-session'); // This is useful for session management
const db = require('./db'); //import database connection

const app = express();
const PORT = process.env.PORT || 5000; // Set the port, defaulting to 5000

//testing db connection
db.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error', err.stack));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
