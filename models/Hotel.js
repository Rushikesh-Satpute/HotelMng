// models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true }, // Optional: add more fields as necessary
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
