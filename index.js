const express = require('express');
const connectToDB = require('./utils/connectToDB');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Apply middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectToDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
