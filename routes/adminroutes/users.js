const express = require('express');
const router = express.Router();
const newuserhandler = require('../../controllers/adminside/users/save.js');
const userhandler = require('../../controllers/adminside/users/getonewithoutpagination.js');
const getonewithpagination = require('../../controllers/adminside/users/getonewithpagination.js');
const changestatus = require('../../controllers/adminside/users/status.js');
const changeproduct_status = require('../../controllers/adminside/users/product_status.js');
const deleteuser = require('../../controllers/adminside/users/deleteuser.js');
const getoneuser = require('../../controllers/adminside/users/edit.js');
const adminauthenction = require('../../validator/adminauthenction');


router.post('/save', adminauthenction, newuserhandler);
router.post('/getone', adminauthenction, userhandler);
router.post('/changestatus', adminauthenction, changestatus);
router.post('/changeproductstatus', adminauthenction, changeproduct_status);
router.post('/delete', adminauthenction, deleteuser);
router.post('/edit', adminauthenction, getoneuser);
router.post('/', adminauthenction, getonewithpagination);

module.exports = router;
