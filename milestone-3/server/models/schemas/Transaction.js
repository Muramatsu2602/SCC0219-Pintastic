const mongoose = require('mongoose');

const TABLE_NAME = 'Transaction';

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  deletedAt: {
    type: Date,
    default: null,
  },

  customerId: {
    type: String,
    default: null,
    required: true,
  },

  products: {
    type: Array,
    default: [],
    required: true,
  },

  amountOfProducts: {
    type: Number,
    default: 0,
    required: true,
  },

  totalPrice: {
    type: Number,
    default: 0.00,
    required: true,
  }
});

module.exports = mongoose.model(TABLE_NAME, schema);
