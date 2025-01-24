const usermodel = require('../../../models/users.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');


const product_statuschange = async (req, res) => {
    try {
        const { userId } = req.body
        const { adminId: adminId } = req.admin;
        if (adminId) {
            const user = await usermodel.findById({ userId });
            if (!user) {
                return responseManager.badrequest(res, "User not found.");
            }
            user.product_status = user.product_status === true ? false : true;
            await user.save();
            return responseManager.onsuccess(res, user, "Product status has been updated successfully.");
        } else {
            return responseManager.Authorization(res, "admin token is necessary...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }

};

module.exports = product_statuschange;