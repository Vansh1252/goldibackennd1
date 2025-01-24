const cartmodel = require('../../../models/carts.model.js');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    try {
        const { productId, quantity, productDescription } = req.body;
        const { userId } = req.user;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "Invalid userId!");
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return responseManager.badrequest(res, "Invalid productId!");
        }
        const productExists = await productmodel.findById(productId);
        if (!productExists) {
            return responseManager.badrequest(res, "Product not found!");
        }
        if (quantity <= 0) {
            return responseManager.badrequest(res, "Quantity should be greater than zero!");
        }
        let cart = await cartmodel.findOne({ userId });
        if (cart) {
            const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
            if (existingProduct) {
                if (existingProduct.quantity === quantity) {
                    return responseManager.badrequest(res, "Cannot add the same product to the cart. Update the quantity instead!");
                }
                existingProduct.quantity = quantity;
            }
            else {
                cart.products.push({
                    productId,
                    quantity: existingProduct.quantity,
                    productDescription,
                });
            }
        } else {
            cart = new cartmodel({
                userId,
                products: [{ productId, quantity, productDescription }],
            });
        }
        await cart.save();
        return responseManager.created(res, "Cart updated successfully!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = addToCart;
