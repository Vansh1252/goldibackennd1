const ordermodel = require('../../../models/orders.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const mongoose = require('mongoose');

const statuschangecompletd = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin ID is missing. Ensure you are authenticated.");
        }
        if (!orderId && !mongoose.Types.ObjectId.isValid(orderId)) {
            return responseManager.badrequest(res, "orderId is Invalid...!");
        }
        const order = await ordermodel.findById(orderId);
        if (!order) {
            return responseManager.badrequest(res, "Order not found...!");
        }
        const incompleteProduct = order.products.find(product => product.remainingQuantity > 0);
        if (incompleteProduct) {
            return responseManager.badrequest(res, "Some quantity is left in the order...!");
        }
        order.status = 'Completed';
        order.deliveredDate = new Date();
        await order.save();
        return responseManager.onsuccess(res, order, "Order status updated successfully...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = statuschangecompletd;
