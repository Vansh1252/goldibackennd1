const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const ordermodel = require('../../../models/orders.model.js');
const mongoose = require('mongoose');
const listOfOrder = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return responseManager.badrequest(res, "User ID is required!");
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "Invalid User ID!");
        }
        const orders = await ordermodel.find({ userId }).select('finalDescription status totalBags totalQuantity').lean();

        if (!orders || orders.length === 0) {
            return responseManager.badrequest(res, "No orders found for this user!");
        }
        return responseManager.onsuccess(res, orders, "Orders have been fetched successfully");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = listOfOrder;

