const cartmodel = require('../../../models/carts.model.js');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    const { productId, quantity, productDescription } = req.body;
    const { userId } = req.user;
    try {
        // if (!mongoose.Types.ObjectId.isValid(userId)) {
        //     return responseManager.badrequest(res, "Invalid userId!");
        // }
        // if (!mongoose.Types.ObjectId.isValid(productId)) {
        //     return responseManager.badrequest(res, "Invalid productId!");
        // }
        // const productExists = await productmodel.findById(productId);
        // if (!productExists) {
        //     return responseManager.badrequest(res, "Product not found!");
        // }
        // if (quantity <= 0) {
        //     return responseManager.badrequest(res, "Quantity should be greater than zero!");
        // }
        // let cart = await cartmodel.findOne({ userId });
        // if (cart) {
        //     const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
        //     if (existingProduct) {
        //         if (existingProduct.quantity === quantity) {
        //             return responseManager.badrequest(res, "Cannot add the same product to the cart. Update the quantity instead!");
        //         }
        //         existingProduct.quantity = quantity;
        //     }
        //     else {
        //         cart.products.push({
        //             productId,
        //             quantity: existingProduct.quantity,
        //             productDescription,
        //         });
        //     }
        // } else {
        //     cart = new cartmodel({
        //         userId,
        //         products: [{ productId, quantity, productDescription }],
        //     });
        // }
        // await cart.save();
        // return responseManager.created(res, "Cart updated successfully!");
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            if (productId && mongoose.Types.ObjectId.isValid(productId)) {
                if (quantity && quantity != null && quantity != undefined && typeof quantity === 'number' && quantity > 0) {
                    const productdata = await productmodel.findById(productId);
                    if (productdata != null) {
                        const cartdata = await cartmodel.findOne({ userId }).lean();
                        if (cartdata) {
                            const existingProduct = cartdata.products.find((p) => p.productId.toString() === productId);
                            if (existingProduct != null) {
                                await cartmodel.updateOne(
                                    { userId, "products.productId": productId },
                                    { $inc: { "products.$.quantity": quantity } }
                                );
                                return responseManager.onsuccess(res, null, "Product quantity updated in the cart.");
                            } else {
                                await cartmodel.updateOne(
                                    { userId },
                                    { $push: { products: { productId, quantity, productDescription: productdata.description } } }
                                );
                            }
                            return responseManager.onsuccess(res, 1, "product added to the cart...!");
                        } else {
                            const newcart = new cartmodel({
                                userId,
                                products: [
                                    {
                                        productId,
                                        quantity,
                                        productDescription: productdata.description,
                                    },
                                ],
                            });
                            await newcart.save();
                            return responseManager.created(res, newcart, "cart created and product has been added...!")
                        }
                    } else {
                        return responseManager.badrequest(res, "productdata is valid...!")
                    }
                } else {
                    return responseManager.badrequest(res, "quantity is Invaild...!")
                }
            } else {
                return responseManager.badrequest(res, "productsId is Invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "userId is Invalid...!")
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = addToCart;
