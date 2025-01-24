const usermodel = require('../../../models/users.model');
const mongoose = require('mongoose')
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');


const getonewithpagination = async (req, res) => {
    const { search, status, limit, page } = req.body;
    const { adminId } = req.admin;
    try {
        if (mongoose.Types.ObjectId.isValid(adminId)) {
            const itemsPerPage = parseInt(limit) || 10;
            const currentPage = parseInt(page) || 1;
            let query = {deleted: false};
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { mobileNumber: { $regex: search, $options: "i" } }
                ];
            }
            if (status) {
                query.status = status;
            }
            const totalRecords = await usermodel.countDocuments(query);
            const orders = await usermodel
                .find(query)
                .select("userId name mobileNumber status product_status")
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage);
            return responseManager.onsuccess(res, { orders, pagination: { totalRecords, totalPages: Math.ceil(totalRecords / itemsPerPage), currentPage, itemsPerPage } }, "Orders fetched successfully.");
        } else {
            return responseManager.Authorization(res, "adminId is invalid...!");
        }
    } catch (error) {
        return responseManager.badrequest(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonewithpagination;