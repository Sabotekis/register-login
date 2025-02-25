const express = require('express');
const users = require('./users');
const login = require('./login');
const protected = require('./protected');
const router = express.Router();
router
    .use('/users', users)
    .use('/login', login)
    .use('/protected', protected);

module.exports = router;