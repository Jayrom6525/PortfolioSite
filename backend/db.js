require('dotenv').config();//Load enviorment variables
const { Pool } = require('pg');// Import the Pool object from the pg package

//check if necessary environment variables are provided
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_NAME) {
    console.error('Required environment variables are not provided');
}

//create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false //Use SSL in production
});

module.exports = pool; //Export the pool object