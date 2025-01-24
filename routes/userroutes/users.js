const express = require('express');
const router = express.Router();
const login = require('../../controllers/userside/logins/login');

router.post('/login', login);

module.exports = router;
