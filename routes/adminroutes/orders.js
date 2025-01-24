const express = require('express');
const router = express.Router();
const getoneorder = require('../../controllers/adminside/orders/getone');
const statuschangecompletd = require('../../controllers/adminside/orders/status');
const ordercancel = require('../../controllers/adminside/orders/cancel');
const details = require('../../controllers/adminside/orders/details');
const getonewithoutpagination = require('../../controllers/adminside/orders/getonewithoutpaginaction');
const getonewithpagination = require('../../controllers/adminside/orders/getonewithpagination');
const deletes = require('../../controllers/adminside/orders/delete');
const adminauthenction = require('../../validator/adminauthenction');


router.post('/getoneorder', adminauthenction, getoneorder);
router.post('/completed', adminauthenction, statuschangecompletd);
router.post('/details', adminauthenction, details)
router.post('/cancel', adminauthenction, ordercancel);
router.post('/getone', adminauthenction, getonewithoutpagination);
router.post('/', adminauthenction, getonewithpagination);
router.post('/delete', adminauthenction, deletes);



module.exports = router;