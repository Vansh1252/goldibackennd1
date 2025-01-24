const usermodel = require('../../../models/users.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');


const statuschange = async (req, res) => {
    try {
        const { userId } = req.body
        const { adminId } = req.admin;
        if (adminId) {
            const user = await usermodel.findById(userId);
            if (!user) {
                return responseManager.badrequest(res, "User not found.");
            }
            user.status = user.status === true ? false : true;
            await user.save();
            return responseManager.onsuccess(res, user, "Status has been updated successfully.");
        } else {
            return responseManager.Authorization(res, "token is missing...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = statuschange;