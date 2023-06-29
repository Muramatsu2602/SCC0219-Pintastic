const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new mongoose.Schema({
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

  active: {
    type: Boolean,
    default: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    default: "123",
  }
});

module.exports = mongoose.model('Admin', adminSchema);
