const express = require('express');
const users = require('./users');
const login = require('./login');
const protected = require('./protected');
const router = express.Router();
router
    .use('/auth', users)
    .use('/auth', login)
    .use('/auth', protected);

module.exports = router;