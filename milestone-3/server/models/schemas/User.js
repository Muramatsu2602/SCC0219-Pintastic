const mongoose = require('mongoose');

const TABLE_NAME = 'User';

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
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
  },

  cep: {
    type: String,
    required: false,
    trim: true,
  },

  state: {
    type: String,
    required: false,
    trim: true,
  },

  address: {
    type: String,
    required: false,
    trim: true,
  },

  complement: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model(TABLE_NAME, schema);
