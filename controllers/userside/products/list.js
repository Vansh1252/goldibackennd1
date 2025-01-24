const productmodel = require('../../../models/products.model.js');
const usermodel = require('../../../models/users.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');

const list = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await usermodel.findById(userId)
        if (user.product_status === true) {
            const product = await productmodel.find().select('-__v -createdAt -deleted ')
            return responseManager.onsuccess(res, product, "the list of products..");
        } else {
            return responseManager.badrequest(res, "user is not allow to see the product...!");
        }
    } catch (error) {
        return responseManager.servererror(res, 'Failed to fetch products.');
    }
};

module.exports = list;
