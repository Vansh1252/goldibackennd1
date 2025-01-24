const mongoose = require('mongoose');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const samplemodel = require('../../../models/samples.model');

const deleteorder = async (req, res) => {
    const { sampleorderId } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(sampleorderId)) {
                const order = await samplemodel.findByIdAndUpdate(sampleorderId, { deleted: true }, { new: true });
                if (order) {
                    return responseManager.onsuccess(res, "deleted successfully...!");
                } else {
                    return responseManager.badrequest(res, "order not found...!");
                }
            } else {
                return responseManager.badrequest(res, "Invalid sampleorderId...!");
            }
        } else {
            return responseManager.Authorization(res, "invalid adminId...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = deleteorder;