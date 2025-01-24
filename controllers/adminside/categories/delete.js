const mongoose = require('mongoose');
const categorymodel = require('../../../models/categories.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const deleteproduct = async (req, res) => {
    const { categoryId } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(categoryId)) {
                const category = await categorymodel.findByIdAndDelete(categoryId, { deleted: true }, { new: true });
                if (category !== null) {
                    return responseManager.onsuccess(res, "deleted successfully...!");
                } else {
                    return responseManager.badrequest(res, "category not found...!");
                }
            } else {
                return responseManager.badrequest(res, "categoryId is invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "adminId is invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}
module.exports = deleteproduct;