const mongoose = require('mongoose');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const repairmodel = require('../../../models/repairs.model');

const deleteorder = async (req, res) => {
    const { repairorderId } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(repairorderId)) {
                const order = await repairmodel.findByIdAndUpdate(repairorderId, { deleted: true }, { new: true });
                if (order) {
                    return responseManager.onsuccess(res, "deleted successfully...!");
                } else {
                    return responseManager.badrequest(res, "order not found...!");
                }
            } else {
                return responseManager.badrequest(res, "Invalid repairorderId...!");
            }
        } else {
            return responseManager.Authorization(res, "invalid adminId...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = deleteorder;