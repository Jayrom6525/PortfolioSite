require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors'); // This is useful for allowing requests from your frontend
const session = require('express-session'); // This is useful for session management
const passport = require('passport'); // For authentication
const LocalStrategy = require('passport-local').Strategy; // Local authentication strategy
const sequelize = require('./config/db'); // Import Sequelize instance from db.js
const authRoutes = require('./routes/auth'); // Import the auth routes

const app = express();
const PORT = process.env.PORT || 5000; // Set the port, defaulting to 5000

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the React app
    credentials: true
})); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Authenticate Sequelize
sequelize.authenticate()
    .then(() => console.log('Sequelize connected to the database'))
    .catch(err => console.error('Error connecting to the database:', err));

// Synchronize all models (this will also sync the User model)
sequelize.sync()
    .then(() => console.log('All models synchronized successfully'))
    .catch(err => console.error('Error synchronizing models:', err));

// Passport local strategy configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ where: { username } });
        if (!user) return done(null, false);

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return done(null, user);
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
    const user = await User.findByPk(id);
    done(null, user);
});

// Auth routes
app.use('/', authRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
