const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');
const repairmodel = require('../../../models/repairs.model.js');

const getonewithoutpaginaction = async (req, res) => {
    const { search, status } = req.body;
    const { adminId } = req.admin;
    try {
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "adminId is invalid...!");
        }
        const query = { deleted: false };
        if (status) {
            query.status = status;
        }
        const orders = await repairmodel.find(query)
            .populate('userId', 'name mobileNumber')
            .select("userId description AcceptedDate CompletedDate CancelledDate status OrderDate");
        const filteredOrders = orders.filter(order => {
            if (!search) return true;
            const user = order.userId;
            return (user && (new RegExp(search, 'i').test(user.name) || new RegExp(search, 'i').test(user.mobileNumber) || (!isNaN(search) && order.repairnumber === parseInt(search, 10))));
        });
        if (filteredOrders.length > 0) {
            return responseManager.onsuccess(res, filteredOrders, "Orders fetched successfully...!");
        } else {
            return responseManager.badrequest(res, "No orders found matching the criteria...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getonewithoutpaginaction;
