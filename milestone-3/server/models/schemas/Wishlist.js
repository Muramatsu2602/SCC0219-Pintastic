const mongoose = require('mongoose');

const TABLE_NAME = 'Wishlist';

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(TABLE_NAME, schema);
