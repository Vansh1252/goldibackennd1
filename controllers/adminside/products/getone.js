const productmodel = require('../../../models/products.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');

const getone = async (req, res) => {
    try {
        const { search } = req.body;
        const { adminId } = req.admin;
        if (adminId) {
            const query = {};
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: "i" } }
                ]
            };
            const product = await productmodel.find(query).select("-__v -createdAt -categoryId");
            if (!product) {
                return responseManager.badrequest(res, "No users found.");
            } else {
                return responseManager.onsuccess(res, product, "Users fetched successfully.");
            }
        }else{
            return responseManager.Authorization(res,"admin is missing...!");
        }
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = getone;