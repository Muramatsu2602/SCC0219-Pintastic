const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const routes = require('./routes/Routes');
const PintasticException = require('./models/exceptions/PintasticException');

const PORT = process.env.PORT || 8080;

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Log API requests
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// Register routes
app.use(routes);

// Error handling middleware
app.use((error, request, response, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${error.message}`);
  console.error(error); // Add this line to print the detailed error stack trace
  return response.status(500).end();
});

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
