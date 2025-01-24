const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responseManager = require("../../../utilities/responseManager");
const adminmodel = require("../../../models/admins.model");
const constants = require('../../../utilities/constants');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return responseManager.badrequest(res, "Please provide both email and password.");
        }
        const admin = await adminmodel.findOne({ email });
        if (!admin) {
            return responseManager.badrequest(res, "Invalid email or password.");
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return responseManager.badrequest(res, "Invalid email or password.");
        }
        const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.JWT_SECRET,
        );
        return responseManager.onsuccess(res, token, "Login successful.");

    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = login;