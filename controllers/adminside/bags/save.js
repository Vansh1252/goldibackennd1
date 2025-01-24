const ordermodel = require('../../../models/orders.model.js');
const bagmodel = require('../../../models/bags.model.js');
const categorymodel = require('../../../models/categories.model.js');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');

const createBag = async (req, res) => {
    const { bagsId, orderId, bagName, deliveryDate, categoryId, products } = req.body;
    const { adminId } = req.admin;
    try {
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "Invalid admin or admin is missing...!");
        }
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return responseManager.badrequest(res, "Invalid orderId...!");
        }
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return responseManager.badrequest(res, "Invalid categoryId...!");
        }
        if (!bagName || typeof bagName !== 'string' || bagName.trim() === '') {
            return responseManager.badrequest(res, "Invalid bagName...!");
        }
        if (!deliveryDate || isNaN(new Date(deliveryDate))) {
            return responseManager.badrequest(res, "Invalid delivery date...!");
        }
        if (!Array.isArray(products) || products.length === 0) {
            return responseManager.badrequest(res, "Products should be a non-empty array...!");
        }
        const category = await categorymodel.findById(categoryId);
        if (!category) {
            return responseManager.badrequest(res, "Category not found...!");
        }
        const order = await ordermodel.findById(orderId);
        if (!order) {
            return responseManager.badrequest(res, "Order not found...!");
        }
        const productIds = products.map(p => p.productId);
        const validProducts = await productmodel.find({ _id: { $in: productIds }, categoryId });
        if (validProducts.length !== products.length) {
            return responseManager.badrequest(res, "Some products are invalid or do not belong to the selected category...!");
        }
        const enrichedProducts = products.map(product => {
            const orderProduct = order.products.find(p => p.productId.toString() === product.productId.toString());
            if (!orderProduct) {
                return responseManager.badrequest(res, "Product not found in order!");
            }
            if (product.bagquantity > orderProduct.remainingQuantity) {
                return responseManager.badrequest(res, "Invalid bag quantity for product!");
            }
            orderProduct.remainingQuantity -= product.bagquantity;
            return {
                productId: product.productId,
                bagquantity: product.bagquantity,
                imageUrl: orderProduct.imageUrl
            };
        });
        if (bagsId && mongoose.Types.ObjectId.isValid(bagsId)) {
            const existingBag = await bagmodel.findById(bagsId);
            if (!existingBag) {
                return responseManager.badrequest(res, "Bag not found...!");
            }
            for (const bagProduct of existingBag.products) {
                const orderProduct = order.products.find(p => p.productId.toString() === bagProduct.productId.toString());
                if (orderProduct) {
                    orderProduct.remainingQuantity += bagProduct.bagquantity;
                }
            }
            existingBag.bagName = bagName;
            existingBag.deliveryDate = new Date(deliveryDate);
            existingBag.products = updatedProducts;
            await existingBag.save();
            await order.save();
            return responseManager.onsuccess(res, existingBag, "Bag updated successfully...!");
        } else {
            const newBag = new bagmodel({
                orderId,
                userId: order.userId,
                bagName,
                deliveryDate: new Date(deliveryDate),
                categoryId,
                products: enrichedProducts,
                createdBy: adminId,
            });
            order.totalBag += 1;
            order.status = 'Processing';
            await newBag.save();
            await order.save();
            return responseManager.onsuccess(res, newBag, "Bag created successfully...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = createBag;

