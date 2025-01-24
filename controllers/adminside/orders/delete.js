const mongoose = require('mongoose');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const ordermodel = require('../../../models/orders.model');
const deleteorder = async (req, res) => {
    const { orderId } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(orderId)) {
                const order = await ordermodel.findById(orderId, { deleted: true }, { new: true });
                if (order) {
                    return responseManager.onsuccess(res, "deleted successfully...!");
                } else {
                    return responseManager.badrequest(res, "order not found...!");
                }
            } else {
                return responseManager.badrequest(res, "Invalid orderId...!");
            }
        } else {
            return responseManager.badrequest(res, "invalid adminId...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};


module.exports = deleteorder;