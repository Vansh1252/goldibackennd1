const jwt = require("jsonwebtoken");
const responseManager = require("../../../utilities/responseManager");
const usermodel = require('../../../models/users.model');
const constants = require('../../../utilities/constants');

const loginofuser = async (req, res) => {
    const { mobileNumber, password } = req.body;
    try {
        if (!mobileNumber) {
            return responseManager.badrequest(res, "Please provide mobileNumber..!");
        }
        if (!password) {
            return responseManager.badrequest(res, "Please provide password...!");
        }
        let user = await usermodel.findOne({ mobileNumber });
        if (!user) {
            return responseManager.badrequest(res, "user not found...!");
        }
        if (user.status === false) {
            return responseManager.badrequest(res, "User is not allowed to login by admin...!");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return responseManager.badrequest(res, "Invalid email or password.");
        }
        let token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
        );
        return responseManager.onsuccess(res, token, "Login successful!");
    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = loginofuser;


