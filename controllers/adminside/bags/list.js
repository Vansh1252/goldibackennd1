const adminmodel = require('../../../models/admins.model.js');
const bagmodel = require('../../../models/bags.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');

const listofbags = async (req, res) => {
    const { adminId } = req.admin;
    try {
        if (adminId && adminId != null && adminId != undefined && mongoose.Types.ObjectId.isValid(adminId) && adminId != '') {
            const admin = await adminmodel.findById({ _id: adminId });
            if (admin != null) {
                const bags = await bagmodel.find(
                    {
                        deleted: false,
                    },
                ).select('-products -createdBy -deleted -createdAt -updatedAt -__v ');
                if (bags.length <= 0) {
                    return responseManager.badrequest(res, "no bags found of the quantity...!");
                }
                return responseManager.onsuccess(res, "bags found", bags);
            } else {
                return responseManager.badrequest(res, "admin not found...!");
            }
        } else {
            return responseManager.Authorization(res, "unAuthorized request...!");
        }
    } catch (error) {
        console.log(error);
        return responseManager.servererror(res, constants.HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};


module.exports = listofbags