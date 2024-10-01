const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance from db.js

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true, // Ensures username is unique
        allowNull: false, // Username cannot be null
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Password cannot be null
    },
});

module.exports = User; // Export the User model
