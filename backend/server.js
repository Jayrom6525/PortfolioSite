require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // This is useful for allowing requests from your frontend
const session = require('express-session'); // This is useful for session management
const passport = require('passport'); // For authentication
const LocalStrategy = require('passport-local').Strategy; // Local authentication strategy
const pool = require('./config/db'); // Import the pool instance from pg
const authRoutes = require('./routes/auth'); // Import the auth routes
const bcrypt = require('bcryptjs'); // For password hashing

const app = express();
const PORT = process.env.PORT || 5000; // Set the port, defaulting to 5000

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the React app (make sure the origin matches your frontend)
    credentials: true // This allows cookies and session data to be sent along with requests
}));

app.use(express.json()); // Parse JSON bodies

// Session middleware (This is needed for login persistence across requests)
app.use(session({
    secret: process.env.SESSION_SECRET, // Your secret key (should be stored in .env)
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set this to true if you're using HTTPS
        httpOnly: true, // Prevent client-side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 // 1 day expiration
    }
}));

// Initialize passport for handling authentication
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

// Passport local strategy configuration
passport.use(new LocalStrategy(
    { usernameField: 'email'}, // Use email as the username field
    async (email, password, done) => {
        try {
            // Fetch user by username
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];
            
            // If user doesn't exist
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            // Check if password matches the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user); // Successful login
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (err) {
            return done(err); // Handle errors during login
        }
    }
));

// Serialize user to store their id in the session
passport.serializeUser((user, done) => {
    done(null, user.id); // This user id will be stored in the session
});

// Deserialize user to retrieve full user details from the session id
passport.deserializeUser(async (id, done) => {
    try {
        // Retrieve user information by id
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        const user = result.rows[0];
        done(null, user); // Complete the deserialization by passing the user object
    } catch (err) {
        done(err); // Handle deserialization error
    }
});

// Use the auth routes
app.use('/', authRoutes);

// Basic route (can be used to check if the server is running)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
