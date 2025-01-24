const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');
const repairmodel = require('../../../models/repairs.model.js');

const getonehistory = async (req, res) => {
    try {
        const { userId } = req.user
        if (userId) {
            if (mongoose.Types.ObjectId.isValid(userId)) {
                const repairorders = await repairmodel.find({ userId }).select('-__v -updatedAt -createdAt -imageUrl -CompletedDate -CancelledDate -AcceptedDate -repairnumber -deleted')
                if (repairorders) {
                    return responseManager.onsuccess(res, repairorders, "data fetched...!");
                } else {
                    return responseManager.badrequest(res, "No order currently...!");
                }
            } else {
                return responseManager.badrequest(res, "userID is invalid...!");
            }
        } else {
            return responseManager.badrequest(res, "userId not found...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonehistory