const express = require('express');
const router = express.Router();
const repairbag = require('../../controllers/adminside/repairs/repairbag');
const repairordercompleted = require('../../controllers/adminside/repairs/status');
const getonewithoutpaginaction = require('../../controllers/adminside/repairs/getonewithoutpagination');
const getonewithpagination = require('../../controllers/adminside/repairs/getonewithpagination');
const deletes = require('../../controllers/adminside/repairs/deletes');
const getoneorder = require('../../controllers/adminside/repairs/getone');
const adminauthenction = require('../../validator/adminauthenction');

router.post('/addbag', adminauthenction, repairbag);
router.post('/completed', adminauthenction, repairordercompleted);
router.post('/getone', adminauthenction, getonewithoutpaginaction);
router.post('/details', adminauthenction, getoneorder);
router.post('/', adminauthenction, getonewithpagination);
router.post('/delete', adminauthenction, deletes);



module.exports = router;