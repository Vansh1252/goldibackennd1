const mongoose = require('mongoose');
const productmodel = require('../../../models/products.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const productupdate = async (req, res) => {
    const { productId } = req.body;
    const { adminId } = req.admin;
    try {
        if (adminId !== null) {
            if (mongoose.Types.ObjectId.isValid(productId)) {
                const product = await productmodel.findById(productId).select('-__v -createdAt -deleted');
                if (product !== null) {
                    return responseManager.onsuccess(res, product, "fetched data successfully...!");
                } else {
                    return responseManager.badrequest(res, "product not found...!");
                }
            } else {
                return responseManager.badrequest(res, "productId is Invaild...!");
            }
        } else {
            return responseManager.Authorization(res, "admin permission needed...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}
module.exports = productupdate;