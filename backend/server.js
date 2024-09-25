require('dotenv').config(); //Load enviorment variables
const express = require('express');
const cors = require('cors'); // This is useful for allowing requests from your frontend
const session = require('express-session'); // This is useful for session management
const db = require('./config/db'); //import database connection
const passport = require('passport'); // This is useful for authentication
const LocalStrategy = require('passport-local').Strategy; // This is useful for local authentication
const authRoutes = require('./routes/auth'); // Import the auth routes

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

//initilize passport
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (!user) return done(null, false);

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (isMatch) {
            return done(null, user.rows[0]);
        } else {
            return done(null, false);
        }
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id); // Store the user ID in the session
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
});

//auth routes
app.use('/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
