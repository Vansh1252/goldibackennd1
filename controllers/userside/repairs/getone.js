const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');
const repairmodel = require('../../../models/repairs.model.js');

const getonerepairorder = async (req, res) => {
    try {
        const { repairorderId } = req.body
        if (repairorderId) {
            if (mongoose.Types.ObjectId.isValid(repairorderId)) {
                const repairorders = await repairmodel.findById(repairorderId).select('-__v -updatedAt -createdAt')
                if (repairorders) {
                    return responseManager.onsuccess(res, repairorders, "Data fetched...!");
                } else {
                    return responseManager.badrequest(res, "repairorder is not found...!");
                }
            } else {
                return responseManager.badrequest(res, "invalid repairorderId...!");
            }
        } else {
            return responseManager.badrequest(res, "order is required...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = getonerepairorder