const express = require('express');
const router = express.Router();
const placeorder = require('../../controllers/userside/orders/save');
const listoforder = require('../../controllers/userside/orders/list');
const getonebyorder = require('../../controllers/userside/orders/getoneorder');
const getonebybag = require('../../controllers/userside/orders/getonebag');
const ensureAuthenticates = require('../../validator/tokenauthentication');

router.post('/save', ensureAuthenticates, placeorder);
router.get('/', ensureAuthenticates, listoforder);
router.post('/getoneorder', ensureAuthenticates, getonebyorder);
router.post('/getonebybag', ensureAuthenticates, getonebybag);


module.exports = router;