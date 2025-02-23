// routes/bookingRoutes.js
const express = require('express');
const Booking = require('../models/bookingModel'); // Import the Booking model
const { body, validationResult } = require('express-validator');

const router = express.Router();

// GET route to fetch all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        
        if (!deletedBooking) {
            console.log("booking not found");
            
            return res.status(404).json({ message: 'Booking not found.' });
        }

        res.status(200).json({ message: 'Booking deleted successfully.' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to create a new booking
router.post(
    '/',
    [
        // Validation rules
        body('registrationNumber').notEmpty().withMessage('Registration number is required.'),
        body('roomType').notEmpty().withMessage('Room type is required.'),
        body('guestName').notEmpty().withMessage('Guest name is required.'),
        body('guestCount').isInt({ min: 1 }).withMessage('At least one guest is required.'),
        body('checkInDate').notEmpty().withMessage('Invalid check-in date.'),
        body('checkOutDate').notEmpty().withMessage('Invalid check-out date.'),
        body('total').notEmpty().withMessage('Invalid Price Calculation.'),
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);
        const { registrationNumber, roomType, guestCount, guestName, checkInDate, checkOutDate,total } = req.body;

        try {
            // Check for existing bookings with the same registration number
            const existingBooking = await Booking.findOne({ registrationNumber });
            if (existingBooking) {
                return res.status(400).json({ message: 'This registration number is already booked.' });
            }

            const booking = new Booking({ registrationNumber, roomType, guestCount, guestName, checkInDate, checkOutDate, total });
            await booking.save();

            res.status(201).json({ message: 'Booking created successfully', booking });
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Export the router
module.exports = router;
