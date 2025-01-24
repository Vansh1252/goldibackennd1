const ordermodel = require('../../../models/orders.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const categorymodel = require('../../../models/categories.model.js');
const constants = require('../../../utilities/constants.js');

const getoneorder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const { adminId: adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin ID is missing. Ensure you are authenticated.");
        } if (mongoose.Types.ObjectId.isValid(orderId)) {
            const category = await categorymodel.find().select('name')
            if (category !== undefined) {
                const order = await ordermodel.findById(orderId)
                    .select('-__v -updatedAt -status -createdAt -orderDate -totalBag -cancelDate -totalQuantity')
                if (order) {
                    const response = {
                        finaldescription: order.finalDescription,
                        category: category,
                        products: order.products.map((product) => ({
                            productId: product.productId,
                            name: product.name,
                            image: product.imageUrl,
                            category: product.categoryId,
                            totalquantity: product.quantity,
                            remainingQuantity: product.remainingQuantity
                        })),
                    }
                    return responseManager.onsuccess(res, response, "fetched data ");
                }
                else {
                    return responseManager.badrequest(res, "order not found...!");
                }
            }
            else {
                return responseManager.badrequest(res, "No category found...!");
            }
        } else {
            return responseManager.badrequest(res, "invalid order ID");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = getoneorder;

