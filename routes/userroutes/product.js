const express = require('express');
const router = express.Router();
const listofproduct =require('../../controllers/userside/products/list');
const getone =require('../../controllers/userside/products/getone');
const ensureAuthenticates =require('../../validator/tokenauthentication');


router.get('/',ensureAuthenticates,listofproduct);
router.post('/getone',ensureAuthenticates,getone);

module.exports = router;