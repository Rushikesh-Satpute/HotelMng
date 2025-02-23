// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true, // Ensure unique registration numbers
    },
    roomType: {
        type: String,
        required: true,
    },
    guestCount: {
        type: Number,
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    guestName: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
