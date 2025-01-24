const express = require('express');
const router = express.Router();
const ensureAuthenticates = require('../../validator/tokenauthentication');
const listofcategory = require('../../controllers/userside/categories/list');

router.post('/list', ensureAuthenticates, listofcategory);

module.exports = router;