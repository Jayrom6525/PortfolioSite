const express = require('express');
const cors = require('cors'); // This is useful for allowing requests from your frontend
const app = express();
const PORT = process.env.PORT || 5000; // Set the port, defaulting to 5000

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
