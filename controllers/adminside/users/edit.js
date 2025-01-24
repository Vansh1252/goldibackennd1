const usermodel = require('../../../models/users.model');
const responseManager = require('../../../utilities/responseManager');
const mongoose = require('mongoose')
const constants = require('../../../utilities/constants');

const updateuser = async (req, res) => {
    const { userId } = req.body;
    const { adminId } = req.admin;
    try {
        if (adminId !== null) {
            if (mongoose.Types.ObjectId.isValid(userId)) {
                const user = await usermodel.findById(userId).select('-__v -updatedAt -createdAt -createdBy -deleted -product_status -status ');
                if (user !== null) {
                    return responseManager.onsuccess(res, user, "fetched data successfully...!");
                } else {
                    return responseManager.badrequest(res, "user not found...!");
                }
            } else {
                return responseManager.badrequest(res, "userId is Invaild...!");
            }
        } else {
            return responseManager.Authorization(res, "admin permission needed...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = updateuser;