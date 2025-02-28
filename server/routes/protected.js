const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/users.model');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('email');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ status: "success", data: null, message: 'Veiksmīgi atgriezti dati', user });
  } catch (err) {
    console.error('Protected route error:', err); 
    res.status(500).json({ status: "error", data: null, message: 'Server error' });
  }
});

module.exports = router;