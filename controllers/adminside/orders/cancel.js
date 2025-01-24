const ordermodel = require('../../../models/orders.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const mongoose = require('mongoose');

const ordercancel = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { adminId } = req.admin;
        if (adminId) {
            if (mongoose.Types.ObjectId.isValid(orderId)) {
                const order = await ordermodel.findById(orderId);
                if (order) {
                    order.status = 'Cancelled'
                    await order.save();
                    return responseManager.onsuccess(res, order, "order cancelled successfully...!");
                } else {
                    return responseManager.badrequest(res, "order not found...!");
                }
            } else {
                return responseManager.badrequest(res, "orderId is invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "admin Id is missing...! ");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = ordercancel;