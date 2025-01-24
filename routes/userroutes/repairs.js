const express = require('express');
const router = express.Router();
const upload = require('../../utilities/repairordermulter');
const save = require('../../controllers/userside/repairs/save');
const getonehistory = require('../../controllers/userside/repairs/history');
const getonerepairorder = require('../../controllers/userside/repairs/getone');
const ensureAuthenticates = require('../../validator/tokenauthentication');

router.post('/save', ensureAuthenticates, [upload.single('imageUrl'), save]);
router.get('/', ensureAuthenticates, getonehistory);
router.post('/getone', ensureAuthenticates, getonerepairorder);


module.exports = router;