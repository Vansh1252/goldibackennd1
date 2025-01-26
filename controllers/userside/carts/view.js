const cartmodel = require('../../../models/carts.model.js');
const responseManger = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');
const mongoose = require('mongoose');

const cartviewproduct = async (req, res) => {
    const { userId } = req.user;
    try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            const cart = await cartmodel.findOne({ userId }).select('-__v -updatedAt -createdAt');
            if (cart !== null) {
                return responseManger.onsuccess(res, cart, "cart fetched...!");
            } else {
                return responseManger.badrequest(res, "cart not found...!");
            }
        } else {
            return responseManger.badrequest(res, "userId is inValid...!");
        }
    } catch (error) {
        return responseManger.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};
module.exports = cartviewproduct;