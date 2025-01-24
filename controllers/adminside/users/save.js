const mongoose = require("mongoose");
const usermodel = require("../../../models/users.model");
const bcrypt = require("bcrypt")
const responseManager = require("../../../utilities/responseManager");
const constants = require("../../../utilities/constants");

const userhandler = async (req, res) => {
    try {
        const { userId, name, lastname, mobileNumber, email, password, confirmpassword } = req.body
        const { adminId } = req.admin;

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return responseManager.Authorization(res, "adminId is Invalid...!");
        }
        if (name === null || name === undefined || name.trim() === '' || typeof name !== 'string') {
            return responseManager.badrequest(res, "name is required...!");
        }
        if (lastname === null || lastname === undefined || lastname == '' || typeof lastname !== 'string') {
            return responseManager.badrequest(res, "lastname is required...!");
        }
        if (email === null || email === undefined || email === '' || typeof email !== 'string') {
            return responseManager.badrequest(res, "email is required...!");
        }
        if (mobileNumber === null || mobileNumber === undefined || mobileNumber == '' || typeof mobileNumber !== 'string') {
            return responseManager.badrequest(res, "mobileNumber is required...!");
        }
        let existingemail = await usermodel.findOne({ email })
        if (existingemail) {
            return responseManager.badrequest(res, "email is already in use...!");
        }
        if (password === null || password === undefined || password === '' || typeof password !== 'string'||password.length < 8) {
            return responseManager.badrequest(res, "password is required...!");
        }
        if (confirmpassword === null || confirmpassword === undefined || confirmpassword === '' || typeof confirmpassword !== 'string' || confirmpassword.length < 8) {
            return responseManager.badrequest(res, "confirmpassword is required...!");
        }
        if (password !== confirmpassword) {
            return responseManager.badrequest(res, "Passwords do not match.");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const existing = await usermodel.findOne({ mobileNumber });
        if (existing) {
            return responseManager.badrequest(res, "Mobile number already exists.");
        }
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return responseManager.badrequest(res, "userId is Invalid...!");
            }
            let updateFields = { name, lastname, mobileNumber, email, password }
            const updateuser = await usermodel.findByIdAndUpdate(userId, updateFields, { new: true }).lean();
            if (updateuser === null) {
                return responseManager.badrequest(res, "user not found...!");
            }
            return responseManager.onsuccess(res, "user has been updated...!");
        }
        const createuser = new usermodel({
            name,
            lastname,
            email,
            mobileNumber,
            password: hashedPassword,
            createdBy: adminId,
        });
        await createuser.save();
        return responseManager.onsuccess(res, createuser, constants.RESPONSE_MESSAGES.USER_CREATED);
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = userhandler;
