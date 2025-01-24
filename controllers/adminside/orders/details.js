const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');
const ordermodel = require('../../../models/orders.model.js');
const bagmodel = require('../../../models/bags.model.js');

const getonedetails = async (req, res) => {
    try {
        const { adminId } = req.admin;
        const { orderId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "Admin token needed...!");
        }
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return responseManager.badrequest(res, "orderId is invalid...!");
        }
        const order = await ordermodel
            .findById(orderId)
            .populate('userId', 'name mobileNumber')
            .select('finalDescription totalQuantity products status orderDate deliveredDate cancelDate');
        if (!order) {
            return responseManager.badrequest(res, "Order not found...!");
        }
        const bag = await bagmodel.findOne({ orderId })
            .select('products deliveryDate bagName')
        if (!bag) {
            return responseManager.badrequest(res, "Bag details not found...!");
        }
        const response = {
            user: {
                name: order.userId?.name,
                mobileNumber: order.userId?.mobileNumber,
            },
            orderDetails: {
                finalDescription: order.finalDescription,
                totalQuantity: order.totalQuantity,
                products: order.products.map((product) => ({
                    name: product.name,
                    image: product.imageUrl,
                    quantity: product.quantity,
                })),
                status: order.status,
                orderDate: order.orderDate,
                deliveredDate: order.deliveredDate,
                cancelDate: order.cancelDate,
            },
            bagDetails: {
                bagName: bag.bagName,
                products: bag.products.map((product) => ({
                    name: product.name,
                    image: product.imageUrl,
                    bagQuantity: product.bagquantity,
                    totalQuantity: product.totalquantity,
                })),
                deliveryDate: bag.deliveryDate,
            },
        };
        return responseManager.onsuccess(res, response, "Fetched data...!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonedetails;