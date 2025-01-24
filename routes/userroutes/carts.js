const express = require('express');
const router = express.Router();
const addtocart = require('../../controllers/userside/carts/addProduct');
const removefromcart = require('../../controllers/userside/carts/remove');
const cartviewproduct = require('../../controllers/userside/carts/view');
const ensureAuthenticates = require('../../validator/tokenauthentication');

router.post('/addproduct', ensureAuthenticates, addtocart);
router.post('/remove', ensureAuthenticates, removefromcart);
router.get('/view', ensureAuthenticates, cartviewproduct);

module.exports = router;