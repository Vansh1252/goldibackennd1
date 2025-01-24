const bagmodel = require('../../../models/bags.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');


const edit = async (req, res) => {
    const { adminId } = req.admin;
    const { bagsId } = req.body;
    try {
        if (adminId !== null) {
            if (mongoose.Types.ObjectId.isValid(adminId)) {
                if (mongoose.Types.ObjectId.isValid(bagsId)) {
                    const bag = await bagmodel.findById(bagsId).select('bagName deliveryDate categoryId products ')
                    if (bag !== undefined) {
                        return responseManager.onsuccess(res, bag, "edit information of bag...!");
                    } else {
                        return responseManager.badrequest(res, "bag not found...!");
                    }
                } else {
                    return responseManager.badrequest(res, "bagId is Invalid...!");
                }
            } else {
                return responseManager.Authorization(res, "adminId is Invalid...!");
            }
        } else {
            return responseManager.Authorization(res, "admin is missing...!")
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports = edit;