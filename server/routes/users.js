const express = require('express');
const UsersService = require('../services/UsersService');
const router = express.Router();

router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UsersService.register({ username, email, password });
    res.status(201).json({ status: "success", data: null, message: 'Veiksmīgi atgriezti dati' });
  } catch (err) {
    res.status(400).json({ status: "error", data: null, message: err.message });
  }
});

module.exports = router;