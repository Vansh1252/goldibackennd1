const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const ordermodel = require('../../../models/orders.model.js');
const bagmodel = require('../../../models/bags.model.js');
const mongoose = require('mongoose');

const getonebybag = async (req, res) => {
    try {
        const { bagId } = req.body;
        if (!bagId) {
            return responseManager.badrequest(res, "Bag ID is required!");
        }
        if (!mongoose.Types.ObjectId.isValid(bagId)) {
            return responseManager.badrequest(res, "Invalid Bag ID!");
        }
        const bag = await bagmodel.findById(bagId)
            .populate('orderId', ' totalquantity');
        if (!bag) {
            return responseManager.badrequest(res, "Bag not found!");
        }
        const order = await ordermodel.findById(bag.orderId).lean();
        if (!order) {
            return responseManager.badrequest(res, "Order not found!");
        }
        const response = {
            bagDetails: {
                bagId: bag._id,
                products: bag.products.map(product => ({
                    productId: product.productId,
                    productName: product.productId.name,
                    productImage: product.productId.imageUrl,
                    productDescription: product.productId.productDescription,
                    totalQuantity: product.totalquantity,
                    bagQuantity: product.bagquantity
                }))
            },
        };

        return responseManager.onsuccess(res, response, "Bag details fetched successfully!");
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonebybag;
