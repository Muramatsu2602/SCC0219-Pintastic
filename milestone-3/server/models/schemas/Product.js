const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

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
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  productDiscountPercentage: {
    type: Number,
    default: 0.00,
  },

  productImage: {
    type: String,
    required: true,
  },

  productCategory: {
    type: String,
    required: true,
  },

  productStock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
