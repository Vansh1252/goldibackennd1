const usermodel = require("../../../models/users.model");
const responseManager = require("../../../utilities/responseManager");
const mongoose = require('mongoose');
const constants = require("../../../utilities/constants");

const deleteuser = async (req, res) => {
    try {
        const { adminId } = req.admin;
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "adminId is Invalid..!");
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "userID is Invalid...!");
        }
        const user = await usermodel.findByIdAndUpdate(userId, { deleted: true }, { new: true });
        if (user === null) {
            return responseManager.badrequest(res, "there is no user...!");
        }
        await user.save();
        return responseManager.onsuccess(res, user, "successfully deleted...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = deleteuser;