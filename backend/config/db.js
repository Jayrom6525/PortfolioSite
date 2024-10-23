require('dotenv').config(); // Load environment variables
const { Pool } = require('pg'); // Import Pool from pg

// Ensure necessary environment variables are provided
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_NAME) {
  throw new Error('Missing necessary environment variables for database connection');
}

// Create a new Pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;