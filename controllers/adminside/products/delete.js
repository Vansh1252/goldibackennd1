const mongoose = require('mongoose');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const deleteproducts = async (req, res) => {
    const { productId } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(productId)) {
                const product = await productmodel.findByIdAndDelete(productId,{deleted:true},{ new: true });
                if (product !== null) {
                    return responseManager.onsuccess(res, "deleted successfully...!");
                } else {
                    return responseManager.badrequest(res, "product not found...!");
                }
            } else {
                return responseManager.badrequest(res, "productId is invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "adminId is invalid...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}
module.exports = deleteproducts;