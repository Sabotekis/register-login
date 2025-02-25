const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/users.model');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    res.json({ message: 'This is a protected route', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;