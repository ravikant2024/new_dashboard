// Import necessary packages
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Enable CORS
app.use(cors({
    origin:'*',
}));

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

// Start the server
const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
  