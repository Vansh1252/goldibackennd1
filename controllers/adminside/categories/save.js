const mongoose = require('mongoose')
const categorymodel = require('../../../models/categories.model.js');
const responseManager = require("../../../utilities/responseManager.js");
const constants = require("../../../utilities/constants.js");

const save = async (req, res) => {
    try {
        const { categoryId, name } = req.body;
        const { adminId: adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "admin is missing...!");
        }
        if (name === null) {
            return responseManager.badrequest(res, constants.RESPONSE_MESSAGES.BAD_REQUEST);
        }
        if (categoryId) {
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                return responseManager.badrequest(res, 'Invalid category ID.');
            }
            const duplicateCategory = await categorymodel.findOne({ name });
            if (duplicateCategory) {
                return responseManager.badrequest(res, 'A category with this name already exists.');
            }
            const updatecategory = await categorymodel.findByIdAndUpdate(categoryId, { name }, { new: true });
            if (!updatecategory) {
                return responseManager.badrequest(res, constants.RESPONSE_MESSAGES.CATEGORY_NOT_FOUND);
            }
            return responseManager.onsuccess(res, updatecategory, "the category has been updated...");
        }
        const existingCategory = await categorymodel.findOne({ name });
        if (existingCategory) {
            return responseManager.badrequest(res, 'A category with this name already exists.');
        }
        const category = new categorymodel({ name, createdBy: adminId });

        if (!category) {
            return responseManager.badrequest(res, "category is not created...");
        }
        await category.save();
        return responseManager.onsuccess(res, category, "CATEGORY CREATED SUCCESSFULLY...");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};
module.exports = save;