const express = require('express');
const router = express.Router();
const save = require('../../controllers/adminside/products/save');
const upload = require('../../utilities/productmulter');
const listofproduct =require('../../controllers/adminside/products/list');
const getone =require('../../controllers/adminside/products/getone');
const edit =require('../../controllers/adminside/products/edit');
const deleted =require('../../controllers/adminside/products/delete');
const adminauthenction =require('../../validator/adminauthenction');


router.post('/save',adminauthenction, [upload.single('imageUrl'), save]);
router.get('/list',adminauthenction,listofproduct);
router.post('/',adminauthenction,getone);
router.post('/edit',adminauthenction,edit);
router.post('/delete',adminauthenction,deleted);

module.exports = router;