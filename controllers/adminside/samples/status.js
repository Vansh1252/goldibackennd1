const mongoose = require('mongoose');
const samplemodel = require('../../../models/samples.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const constants = require('../../../utilities/constants.js');

const completeSampleOrder = async (req, res) => {
    try {
        const { sampleorderId } = req.body;
        const { adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin token is required.");
        }
        if (!mongoose.Types.ObjectId.isValid(sampleorderId)) {
            return responseManager.badrequest(res, "Invalid sampleorderId.");
        }
        const sampleorder = await samplemodel.findById(sampleorderId);
        if (!sampleorder) {
            return responseManager.badrequest(res, "Sample order not found.");
        }
        if (sampleorder.status === 'Completed') {
            return responseManager.badrequest(res, "Sample order is already completed.");
        }
        sampleorder.status = 'Completed';
        sampleorder.CompletedDate = new Date();
        await sampleorder.save();
        return responseManager.onsuccess(res, sampleorder, "Sample order completed successfully.");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = completeSampleOrder;
