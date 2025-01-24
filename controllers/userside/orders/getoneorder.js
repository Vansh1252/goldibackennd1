const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const ordermodel = require('../../../models/orders.model.js');
const mongoose = require('mongoose');

const getonebyorder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return responseManager.badrequest(res, "Order ID is required!");
        }
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return responseManager.badrequest(res, "Invalid Order ID!");
        }
        const order = await ordermodel.findById(orderId).select('products finalDescription totalBag deliveredDate orderDate').lean();
        if (!order) {
            return responseManager.badrequest(res, "Order not found!");
        }
        const response = {
            finalDescription: order.finalDescription,
            products: order.products.map(product => ({
                productId: product.productId._id,
                name: product.productId.name,
                imageUrl: product.productId.imageUrl,
                productDescription: product.productId.productDescription,
                quantity: product.quantity
            })),
            orderDate: order.orderDate,
            totalBags: order.totalBag,
        };
        return responseManager.onsuccess(res, response, "Order details fetched successfully");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonebyorder;
