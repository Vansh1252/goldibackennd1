const express = require('express');
const router = express.Router();
const adminauthenction = require('../../validator/adminauthenction');
const newcategory = require('../../controllers/adminside/categories/save');
const listofcategory = require('../../controllers/adminside/categories/getone');
const deleted = require('../../controllers/adminside/categories/delete');

router.post('/create', adminauthenction, newcategory);
router.get('/', adminauthenction, listofcategory);
router.post('/delete', adminauthenction, deleted);


module.exports = router;