const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel'); // Make sure your Hotel model is correctly imported

// Get all hotels
router.get('/getHotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

// Add hotel
router.post('/addHotel', async (req, res) => {
  const hotelData = req.body;
  try {
    const hotel = new Hotel(hotelData);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: 'Error adding hotel' });
  }
});

// Edit hotel
router.put('/editHotel/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  const hotelData = req.body;
  console.log(hotelData);
  
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, hotelData, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hotel' });
  }
});

// Delete hotel
router.delete('/deleteHotel/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    await Hotel.findByIdAndDelete(hotelId);
    res.status(204).json(); // No content
  } catch (error) {
    res.status(400).json({ message: 'Error deleting hotel' });
  }
});

module.exports = router;
