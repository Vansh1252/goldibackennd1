const express = require('express');
const router = express.Router();
const getoneordersforbag = require('../../controllers/adminside/bags/edit');
const save = require('../../controllers/adminside/bags/save');
const deleted = require('../../controllers/adminside/bags/delete');
const adminauthenction = require('../../validator/adminauthenction');


router.post('/createbag', adminauthenction, save);
router.post('/', adminauthenction, getoneordersforbag);
router.post('/delete', adminauthenction, deleted);


module.exports = router;