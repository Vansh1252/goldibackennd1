const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const repairmodel = require('../../../models/repairs.model.js');
const constants = require('../../../utilities/constants.js');

const repairorderbag = async (req, res) => {
    try {
        const { repairorderId, repairnumber, action } = req.body;
        const { adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin token is required.");
        }
        if (!mongoose.Types.ObjectId.isValid(repairorderId)) {
            return responseManager.badrequest(res, "Invalid repairorderId.");
        }
        const repairOrder = await repairmodel.findById(repairorderId);
        if (!repairOrder) {
            return responseManager.badrequest(res, "Repair order not found.");
        }
        if (!['accept', 'cancel'].includes(action)) {
            return responseManager.badrequest(res, "Invalid action. Allowed actions are 'accept' or 'cancel'.");
        }
        if (action === 'accept') {
            if (!repairnumber) {
                return responseManager.badrequest(res, "Bag number is required for acceptance.");
            }
            const unqiuerepairnumber = await repairmodel.findOne({ repairnumber });
            if (!unqiuerepairnumber) {
                repairOrder.repairnumber = repairnumber;
                repairOrder.status = 'Processing';
                repairOrder.AcceptedDate = new Date();
                await repairOrder.save();
                return responseManager.onsuccess(res, "Repair bag accepted and created successfully.");
            } else {
                return responseManager.badrequest(res, "bag number is already in use..!");
            }
        } else if (action === 'cancel') {
            repairOrder.status = 'Cancelled';
            repairOrder.CancelledDate = new Date();
            await repairOrder.save();
            return responseManager.onsuccess(res, null, "Repair order canceled successfully.");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = repairorderbag;
