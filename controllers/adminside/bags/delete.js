const mongoose = require('mongoose');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const bagmodel = require('../../../models/bags.model');
const ordermodel = require('../../../models/orders.model');
const deleteBag = async (req, res) => {
    const { bagId } = req.body;
    const { adminId } = req.admin;
    try {
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "Invalid adminId...!");
        }
        if (!mongoose.Types.ObjectId.isValid(bagId)) {
            return responseManager.badrequest(res, "Invalid bagId...!");
        }
        const bag = await bagmodel.findById(bagId);
        if (!bag) {
            return responseManager.badrequest(res, "Bag not found...!");
        }
        const order = await ordermodel.findById(bag.orderId);
        if (!order) {
            return responseManager.badrequest(res, "Order not found for this bag...!");
        }
        bag.products.forEach(bagProduct => {
            const orderProduct = order.products.find(p => p.productId.toString() === bagProduct.productId.toString());
            if (orderProduct) {
                orderProduct.remainingQuantity += bagProduct.bagquantity;
            }
        });
        order.totalBag -= 1;
        await order.save();
        bag.deleted = true;
        await bag.save();
        return responseManager.onsuccess(res, "Bag deleted successfully...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};


module.exports = deleteBag