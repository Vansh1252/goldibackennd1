const express = require('express');
const router = express.Router();
const upload = require('../../utilities/samplemulter');
const save = require('../../controllers/userside/samples/save');
const getonehistory = require('../../controllers/userside/samples/history');
const getonesampleorder = require('../../controllers/userside/samples/getone');
const ensureAuthenticates = require('../../validator/tokenauthentication');

router.post('/save', ensureAuthenticates, [upload.array('imageUrl', 10), save]);
router.get('/', ensureAuthenticates, getonehistory);
router.post('/getone', ensureAuthenticates, getonesampleorder);


module.exports = router;