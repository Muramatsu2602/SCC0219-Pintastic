const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const productsRoutes = require('./server/routes/products');


// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection string
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Routes
app.use('/api/products', productsRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
