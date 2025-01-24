const mongoose = require('mongoose');
const repairmodel = require('../../../models/repairs.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const completeRepairOrder = async (req, res) => {
    try {
        const { repairorderId } = req.body;
        const { adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin token is required.");
        }
        if (!mongoose.Types.ObjectId.isValid(repairorderId)) {
            return responseManager.badrequest(res, "Invalid repairorderId.");
        }
        const repairorder = await repairmodel.findById(repairorderId);
        if (!repairorder) {
            return responseManager.badrequest(res, "Repair order not found.");
        }
        if (repairorder.status === 'Completed') {
            return responseManager.badrequest(res, "Repair order is already completed.");
        }
        repairorder.status = 'Completed';
        repairorder.CompletedDate = new Date();
        await repairorder.save();
        return responseManager.onsuccess(res, repairorder, "Repair order completed successfully.");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = completeRepairOrder;
