const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/users.model');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Protected route accessed');
    console.log('User ID from token:', req.user.id);

    const user = await User.findById(req.user.id).select('email');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user); 
    res.json({ message: 'This is a protected route', user });
  } catch (err) {
    console.error('Protected route error:', err); 
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;