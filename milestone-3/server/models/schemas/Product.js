const mongoose = require('mongoose');

const TABLE_NAME = 'Product';

const schema = new mongoose.Schema({
  productCreatedAt: {
    type: Date,
    default: Date.now(),
  },

  productUpdatedAt: {
    type: Date,
    default: Date.now(),
  },

  productDeletedAt: {
    type: Date,
    default: null,
  },

  productStatus: {
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

  price: {
    type: Number,
    required: false,
  },

  productDiscountPercentage: {
    type: Number,
    default: 0.00,
  },

  productImage: {
    type: String,
    required: false,
  },

  productCategory: {
    type: String,
    required: false,
  },

  productStock: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model(TABLE_NAME, schema);
