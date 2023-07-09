const mongoose = require('mongoose');

const TABLE_NAME = 'Product';

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  deletedAt: {
    type: Date,
    default: null,
  },

  status: {
    type: Boolean,
    default: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  rating: {
    type: Number,
    required: true,
    default: 3
  },

  price: {
    type: Number,
    required: false,
  },

  discountPercentage: {
    type: Number,
    min: 0.00,
    default: 0.00,
  },

  image: {
    type: String,
    required: false,
  },

  category: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model(TABLE_NAME, schema);
