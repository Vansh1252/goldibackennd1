const cartmodel = require('../../../models/carts.model.js');
const ordermodel = require('../../../models/orders.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const productmodel = require('../../../models/products.model.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const save = async (req, res) => {
    try {
        const { userId } = req.user;
        const { products, finalDescription } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "Invalid userId!");
        }
        if (!Array.isArray(products)) {
            return responseManager.badrequest(res, "products should be in an array!");
        }
        for (let product of products) {
            if (!mongoose.Types.ObjectId.isValid(product.productId)) {
                return responseManager.badrequest(res, "Invalid productId!");
            }
            if (typeof product.quantity !== "number" || product.quantity <= 0) {
                return responseManager.badrequest(res, "Invalid quantity. Quantity must be greater than zero!");
            }
        }
        const fullproductdetails = [];
        for (const product of products) {
            const productDetails = await productmodel.findById(product.productId).populate('categoryId', 'name').lean();
            if (!productDetails) {
                return responseManager.badrequest(res, "Product with ID not found in the database.");
            }
            fullproductdetails.push({
                productId: product.productId,
                name: productDetails.name,
                imageUrl: productDetails.imageUrl,
                categoryId: productDetails.categoryId,
                categoryname: productDetails.categoryId?.name,
                quantity: product.quantity,
                productDescription: productDetails.description || "",
                remainingQuantity: product.quantity
            });
        }
        const totalQuantity = fullproductdetails.reduce((sum, product) => sum + product.quantity, 0);
        const newOrder = new ordermodel({
            userId,
            products: fullproductdetails,
            finalDescription,
            status: "Pending",
            totalQuantity,
        });
        await newOrder.save();
        return responseManager.created(res, "Order placed successfully!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = save;
