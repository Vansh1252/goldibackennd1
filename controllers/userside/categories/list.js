const categorymodel = require('../../../models/categories.model.js');
const usermodel = require('../../../models/users.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');

const getUserProducts = async (req, res) => {
    const { userId: userId } = req.user;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "Invalid user ID.");
        }
        const user = await usermodel.findById(userId);
        if (!user) {
            return responseManager.badrequest(res, "User does not exist.");
        }
        if (!user.product_status) {
            return responseManager.badrequest(res, "User is not permitted to view categories.");
        }
        const categories = await categorymodel.find().select('-__v -createdAt -createdBy -updatedAt');
        return responseManager.onsuccess(res, categories, "Categories fetched successfully.");
    } catch (error) {
        return responseManager.servererror(res, "An unexpected error occurred while fetching products.");
    }
};

module.exports = getUserProducts;
