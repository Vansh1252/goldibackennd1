const categorymodel = require('../../../models/categories.model.js');
const responseManager = require("../../../utilities/responseManager.js");
const constants = require("../../../utilities/constants.js");


const listofcategory = async (req, res) => {
    try {
        const allcategory = await categorymodel.find({}).select('-createdBy -__v -createdAt -updatedAt');
        return responseManager.onsuccess(res, allcategory, "the list of category..");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};
module.exports = listofcategory;



