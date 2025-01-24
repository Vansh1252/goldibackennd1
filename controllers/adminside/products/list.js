const categorymodel = require('../../../models/categories.model.js');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {

    const { adminId } = req.admin;
    try {
        const { categoryId } = req.body;
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (!categoryId) {
                const product = await productmodel.find({}).select('-__v -createdAt');
                return responseManager.onsuccess(res, product, "the list of products..");
            }
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                return responseManager.badrequest(res, "Invalid category ID");
            }
            if (categoryId) {
                const category = await categorymodel.findById(categoryId);
                if (!category) {
                    return responseManager.badrequest(res, "Category not found");
                }
                const product = await productmodel.find({ categoryId }).select('-__v -createdAt');
                return responseManager.onsuccess(res, product, "the list of products by category..");
            }
        } else {
            return responseManager.Authorization(res, "adminId invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getProducts;
