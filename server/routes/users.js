const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users.model');
const router = express.Router();

router.post('/', async (req, res) => {
  let { username, email, password } = req.body;
  username = username.toLowerCase();
  email = email.toLowerCase();

  try {
    const existingUser = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ status: "success", data: null, message: 'Veiksmīgi atgriezti dati' });
  } catch (err) {
    res.status(500).json({ status: "error", data: null, message: 'Server error' });
  }
});

module.exports = router;