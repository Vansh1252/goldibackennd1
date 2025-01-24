const express = require('express');
const router = express.Router();
const login = require('../../controllers/adminside/logins/login.js');
const admincreate = require('../../controllers/adminside/logins/createadmin.js');


router.post('/login', login);
router.post('/createadmin', admincreate,);

module.exports = router;
