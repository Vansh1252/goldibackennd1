const usermodel = require('../../../models/users.model');
const responseManager = require('../../../utilities/responseManager');
const mongoose = require('mongoose')
const constants = require('../../../utilities/constants');

const getone = async (req, res) => {
    try {
        const { adminId } = req.admin;
        const { search, status, product_status } = req.body;
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            const query = { deleted: false };
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { mobileNumber: { $regex: search, $options: "i" } }
                ];
            }
            if (status) {
                query.status = status;
            }
            if (product_status) {
                query.product_status = product_status
            }
            const users = await usermodel.find(query).select("-email -password -deleted -createdBy -createdAt -updatedAt -__v");
            if (!users) {
                return responseManager.badrequest(res, "No users found.");
            }
            return responseManager.onsuccess(res, users, "Users fetched successfully.");

        } else {
            return responseManager.Authorization(res, "adminId is Invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getone;