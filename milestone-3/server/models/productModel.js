const mongoose = require('mongoose');

module.exports.productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },

  // productCreatedAt: {
  //   type: Date,
  //   default: Date.now(),
  // },

  // productUpdatedAt: {
  //   type: Date,
  //   default: Date.now(),
  // },

  // productDeletedAt: {
  //   type: Date,
  //   default: Date.now(),
  // },

  // productStatus: {
  //   type: String,
  //   required: true,
  // },

  title: {
    type: String,
    required: true,
  },

  // description: {
  //   type: String,
  //   required: true,
  // },

  // price: {
  //   type: Number,
  //   required: true,
  // },

  // productDiscountPercentage: {
  //   type: Number,
  //   required: true,
  // },

  // productImage: {
  //   type: String,
  //   required: true,
  // },

  // productCategory: {
  //   type: String,
  //   required: true,
  // },

  // productStock: {
  //   type: Number,
  //   required: true,
  // },
});
