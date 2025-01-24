const responseManager = require('../../../utilities/responseManager.js');
const mongoose = require('mongoose');
const constants = require('../../../utilities/constants.js');
const samplemodel = require('../../../models/samples.model.js');

const getonesampleorder = async(req,res)=>{
    try {
        const {sampleorderId} =req.body
        if(sampleorderId){
            if(mongoose.Types.ObjectId.isValid(sampleorderId)){
                const repairorders = await samplemodel.findById(sampleorderId).select('-__v -updatedAt -createdAt') 
                if(repairorders){
                    return responseManager.onsuccess(res,repairorders,"Data fetched...!");
                }else{
                    return responseManager.badrequest(res,"sampleorder is not found...!");
                }
            }else{
                return responseManager.badrequest(res,"invalid sampleorderId...!");
            }
        }else{
            return responseManager.badrequest(res,"order is required...!");
        }
    } catch (error) {
        return responseManager.servererror(res,constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
}

module.exports =getonesampleorder