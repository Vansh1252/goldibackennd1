
const express = require('express');
const router = express.Router();
const sampleId = require('../../controllers/adminside/samples/samplebag');
const sampleordercompleted = require('../../controllers/adminside/samples/status');
const getonewithoutpaginaction = require('../../controllers/adminside/samples/getonewithoutpagination');
const getonesampleorder = require('../../controllers/adminside/samples/getone');
const deletes = require('../../controllers/adminside/samples/deletes');
const getonewithpagination = require('../../controllers/adminside/samples/getonewithpagination');
const adminauthenction = require('../../validator/adminauthenction');


router.post('/createbag', adminauthenction, sampleId);
router.post('/completed', adminauthenction, sampleordercompleted);
router.post('/getone', adminauthenction, getonewithoutpaginaction);
router.post('/details', adminauthenction, getonesampleorder);
router.post('/', adminauthenction, getonewithpagination);
router.post('/delete', adminauthenction, deletes);



module.exports = router;