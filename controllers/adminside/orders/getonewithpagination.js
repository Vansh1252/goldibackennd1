const ordermodel = require('../../../models/orders.model.js');
const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');

const getonewithpagination = async (req, res) => {
    const { search, status, limit, page } = req.body;
    const { adminId } = req.admin;
    try {
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "adminId is invalid...!");
        }
        const itemsPerPage = parseInt(limit) || 10;
        const currentPage = parseInt(page) || 1;
        let query = { deleted: false };
        if (status) {
            query.status = status;
        }
        const orders = await ordermodel
            .find(query)
            .populate('userId', 'name mobileNumber')
            .select("userId deliveredDate totalQuantity totalBag finalDescription cancelDate orderDate status")
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        const filteredOrders = orders.filter(order => {
            if (!search) return true;
            const user = order.userId;
            return (
                user &&
                (new RegExp(search, 'i').test(user.name) ||
                    new RegExp(search, 'i').test(user.mobileNumber))
            );
        });
        const totalRecords = await ordermodel
            .find(query)
            .populate('userId', 'name mobileNumber')
            .select('userId')
            .then(results =>
                results.filter(order => {
                    const user = order.userId;
                    return (!search || (user && (new RegExp(search, 'i').test(user.name) || new RegExp(search, 'i').test(user.mobileNumber))));
                }).length);
        const totalPages = Math.ceil(totalRecords / itemsPerPage);
        return responseManager.onsuccess(res, { orders: filteredOrders, pagination: { totalRecords, totalPages, currentPage, itemsPerPage, }, }, "Orders fetched successfully.");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};


module.exports = getonewithpagination;
