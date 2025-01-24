const repairmodel = require('../../../models/repairs.model');
const responseManager = require('../../../utilities/responseManager');
const constants = require('../../../utilities/constants');
const mongoose = require('mongoose');

const saverepairorder = async (req, res) => {
  try {
    const { description } = req.body;
    const { userId } = req.user;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      if (description && description !== null && description !== undefined && typeof description === 'string' && description.trim() !== '') {
        if (req.file) {
          const lastOrder = await repairmodel
            .findOne({ userId })
            .sort({ order_Number: -1 })
            .select('order_Number');
          const order_Number = lastOrder ? lastOrder.order_Number + 1 : 1;
          const repairProduct = new repairmodel({
            userId,
            order_Number: order_Number,
            imageUrl: `/uploads/repairorderphoto${req.file.filename}`,
            description
          });
          await repairProduct.save();
          return responseManager.created(res, "Order placed successfully...!");
        } else {
          return responseManager.badrequest(res, "Image is required...!");
        }
      } else {
        return responseManager.badrequest(res, "Description is required...!");
      }
    } else {
      return responseManager.badrequest(res, "User ID is invalid...!");
    }
  } catch (error) {
    return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
  }
};

module.exports = saverepairorder

