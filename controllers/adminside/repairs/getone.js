const mongoose = require('mongoose');
const repairmodel = require('../../../models/repairs.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const getoneorder = async (req, res) => {
    const { adminId } = req.admin;
    const { repairorderId } = req.body;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(repairorderId)) {
                const repairorder = await repairmodel.findById(repairorderId).select("imageUrl description ");
                if (repairorder) {
                    return responseManager.onsuccess(res, repairorder, "fetched data...!");
                } else {
                    return responseManager.badrequest(res, "repairorder not found...!");
                }
            } else {
                return responseManager.badrequest(res, "repairorderId is invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "admin token is necessary...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getoneorder;