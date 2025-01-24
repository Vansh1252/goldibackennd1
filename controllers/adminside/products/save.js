const mongoose = require('mongoose');
const categorymodel = require('../../../models/categories.model.js');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const productsave = async (req, res) => {
    try {
        const { productId, categoryId } = req.body;
        const { adminId } = req.admin;
        if (mongoose.Types.ObjectId.isValid(adminId)) {

            if (productId !== undefined) {
                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    return responseManager.badrequest(res, "Invalid product ID");
                }
                const product = await productmodel.findById(productId);
                if (!product) {
                    return responseManager.badrequest(res, "Product not found");
                }
                const updateFields = {};
                if (req.file) {
                    updateFields.name = req.file.filename.split('.').slice(0, -1).join('.');
                    updateFields.imageUrl = `./uploads/${req.file.filename}`;
                } if (categoryId) {
                    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                        return responseManager.badrequest(res, "Invalid category ID");
                    }
                    const category = await categorymodel.findById(categoryId);
                    console.log(category);
                    if (!category) {
                        return responseManager.badrequest(res, "Category not found");
                    }
                    updateFields.categoryId = categoryId;
                }
                const updatedProduct = await productmodel.findByIdAndUpdate(productId, updateFields, { new: true });
                if (!updatedProduct) {
                    return responseManager.badrequest(res, "Product not found");
                }
                return responseManager.onsuccess(res, updatedProduct, "Product updated successfully");
            }
            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                return responseManager.badrequest(res, "Invalid category ID");
            }
            const category = await categorymodel.findById(categoryId);
            if (!category) {
                return responseManager.badrequest(res, "Category not found");
            }
            if (!req.file || !req.file.filename) {
                return responseManager.badrequest(res, "Image is required");
            }
            const fileName = req.file.filename.split('/').pop().split('.').slice(0, -1).join('.')
            const product = new productmodel({
                name: fileName,
                imageUrl: `/uploads/productphoto/${req.file.filename}`,
                categoryId,
                adminId: adminId
            });
            await product.save();
            return responseManager.onsuccess(res, product, "Product saved successfully");
        } else {
            return responseManager.Authorization(res, "adminId is Invalid...!");
        }
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = productsave;
