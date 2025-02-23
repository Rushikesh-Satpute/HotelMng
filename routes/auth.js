// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();


// Check if User Exists Route
router.post('/check-user', async (req, res) => {
  console.log("Checking user is exist or not");
  
  const { phoneNumber } = req.body;
  
  try {
      const user = await User.findOne({ phoneNumber });
      if (user) {
          return res.status(200).json({ registered: true });
          console.log("user present");
      }
      
      return res.status(404).json({ registered: false });
  } catch (error) {
    console.log(error);
      console.error("Error checking user:", error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});


// Registration Route
router.post('/register', async (req, res) => {
  console.log("Received: " + req.body.accountType);

  const {
    firstName,
    lastName,
    phoneNumber,
    adharNumber,
    birthday,
    state,
    city,
    pincode,
    accountType,
  } = req.body;

  // Basic validation
  if (!firstName ||
      !lastName ||
      !phoneNumber ||
      !adharNumber ||
      !birthday ||
      !state ||
      !city ||
      !pincode) {
    console.log("{code:400,msg:'Some value missing'}");
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      console.log('User already exists.');
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      adharNumber,
      birthday,
      state,
      city,
      pincode,
      accountType,
    });

    // Optional: Hash the password before saving (if you're using a password)
    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(req.body.password, salt);

    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully.',
      success: true,
      user: newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});

module.exports = router;
