require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize'); // Import Sequelize

// Ensure necessary environment variables are provided
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_NAME) {
    console.error('Required environment variables are not provided');
    process.exit(1); // Exit if env variables are missing
}

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false, // Disable logging SQL queries (optional)
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // Use SSL in production
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Sequelize connected to the database'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = sequelize; // Export Sequelize instance
