const samplemodel = require('../../../models/samples.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const mongoose = require('mongoose');

const savesampleorder = async (req, res) => {
    try {
        const { samplequantity, description } = req.body
        const { userId } = req.user;
        if (userId) {
            if (mongoose.Types.ObjectId.isValid(userId)) {
                if (samplequantity > 0) {
                    if (description && description !== null && description !== undefined && typeof description === 'string' && description.trim() !== '') {
                        if (req.files) {
                            const imageUrls = req.files.map(file => `/uploads/samplephoto${file.filename}`);
                            const lastOrder = await samplemodel
                                .findOne({ userId })
                                .sort({ order_number: -1 })
                                .select('order_number');
                            const order_number = lastOrder ? lastOrder.order_number + 1 : 1;
                            const sampleorder = new samplemodel({
                                userId: userId,
                                order_number: order_number,
                                imageUrl: imageUrls,
                                samplequantity: samplequantity,
                                description: description
                            })
                            await sampleorder.save();
                            return responseManager.created(res, 'Order placed successfully...!');
                        } else {
                            return responseManager.badrequest(res, "Image is required...!");
                        }
                    } else {
                        return responseManager.badrequest(res, "description is required...!");
                    }
                } else {
                    return responseManager.badrequest(res, "sample quanity should be greater than 0...!");
                }
            } else {
                return responseManager.badrequest(res, "userId is invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId not found...!");
        }

    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = savesampleorder