// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  adharNumber: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  pincode: {
    type: Number
  },
  accountType: {
    type: String,
    default: 'Customer'
  },
}, {
  timestamps: true
});

const User = mongoose.model('user', userSchema);
module.exports = User;