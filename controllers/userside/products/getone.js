const productmodel = require('../../../models/products.model.js');
const categorymodel = require('../../../models/categories.model.js');
const usermodel = require('../../../models/users.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');

const getone = async (req, res) => {
    const { categoryId } = req.body;
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            if (mongoose.Types.ObjectId.isValid(categoryId)) {
                const category = await categorymodel.findById(categoryId);
                if (category !== undefined) {
                    const product = await productmodel.find({ categoryId }).select('-__v -createdAt');
                    return responseManager.onsuccess(res, product, "the list of products by category..");
                } else {
                    return responseManager.badrequest(res, "Category not found");
                }
            } else {
                return responseManager.badrequest(res, "Invalid category ID");
            }
        } else {
            return responseManager.badrequest(res, "Invalid user...!");
        }
    } catch (error) {
        return responseManager.servererror(res, 'Failed to fetch products.');
    }
}

module.exports = getone
