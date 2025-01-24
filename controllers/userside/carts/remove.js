const cartmodel = require('../../../models/carts.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const { userId } = req.user;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseManager.badrequest(res, "Invalid userId!");
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return responseManager.badrequest(res, "Invalid productId...!");
        }
        const cart = await cartmodel.findOne({ userId });
        if (!cart) {
            return responseManager.badrequest(res, "Cart not found for the user.");
        }
        const productIndex = cart.products.findIndex((item) => item.productId.toString() === productId);
        if (productIndex === -1) {
            return responseManager.badrequest(res, "Product not found in the cart.");
        }
        cart.products.splice(productIndex, 1);
        if (cart.products.length === 0) {
            await cart.deleteOne();
            return responseManager.onsuccess(res, null, "Cart is now empty.");
        } else {
            await cart.save();
            return responseManager.onsuccess(res, cart, "Product removed from cart successfully.");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = removeFromCart;