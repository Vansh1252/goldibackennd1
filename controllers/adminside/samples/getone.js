const mongoose = require('mongoose');
const samplemodel = require('../../../models/samples.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const getonesampleorder = async (req, res) => {
    const { adminId } = req.admin
    const { sampleorderId } = req.body
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            if (mongoose.Types.ObjectId.isValid(sampleorderId)) {
                const sampleorder = await samplemodel.findById(sampleorderId).select("imageUrl description ");
                if (sampleorder) {
                    return responseManager.onsuccess(res, sampleorder, "fetched data...!");
                } else {
                    return responseManager.badrequest(res, "sampleorder not found...!");
                }
            } else {
                return responseManager.badrequest(res, "sampleorderId is invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "admin token is necessary...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonesampleorder;