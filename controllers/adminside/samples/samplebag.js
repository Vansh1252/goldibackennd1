const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const samplemodel = require('../../../models/samples.model.js');
const constants = require('../../../utilities/constants.js');

const samplebag = async (req, res) => {
    try {
        const { smapleorderId, samplenumber, action } = req.body;
        const { adminId } = req.admin;
        if (!adminId) {
            return responseManager.Authorization(res, "Admin token is required.");
        }
        if (!mongoose.Types.ObjectId.isValid(smapleorderId)) {
            return responseManager.badrequest(res, "Invalid smapleorderId.");
        }
        const sampleorder = await samplemodel.findById(smapleorderId);
        if (!sampleorder) {
            return responseManager.badrequest(res, "Repair order not found.");
        }
        if (!['accept', 'cancel'].includes(action)) {
            return responseManager.badrequest(res, "Invalid action. Allowed actions are 'accept' or 'cancel'.");
        }
        if (action === 'accept') {
            if (!samplenumber) {
                return responseManager.badrequest(res, "Bag number is required for acceptance.");
            }
            const unquirenumber = await samplemodel.findOne({ samplenumber })
            if (!unquirenumber) {
                sampleorder.samplenumber = samplenumber;
                sampleorder.status = 'Processing';
                sampleorder.AcceptedDate = new Date();
                await sampleorder.save();
                return responseManager.onsuccess(res, "sample bag accepted and created successfully.");
            } else {
                return responseManager.badrequest(res, "sample number is already in use...!");
            }
        } else if (action === 'cancel') {
            sampleorder.status = 'Cancelled';
            sampleorder.CancelledDate = new Date();
            await sampleorder.save();

            return responseManager.onsuccess(res, null, "sample order canceled successfully.");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};


module.exports = samplebag;
