const adminmodel = require("../../../models/admins.model");
const responseManager = require("../../../utilities/responseManager");
const constants = require("../../../utilities/constants");

const admincreate = async (req, res) => {
    const { email, password, confirmpassword } = req.body;

    try {
        if (!email || !password || !confirmpassword) {
            return responseManager.badrequest(res, "Please provide email, password, and confirm password.");
        }
        if (password !== confirmpassword) {
            return responseManager.badrequest(res, "Passwords do not match.");
        }
        const existingAdmin = await adminmodel.findOne({ email });
        if (existingAdmin) {
            return responseManager.badrequest(res, "Admin with this email already exists.");
        }
        const create = new adminmodel({
            email,
            password,
        });
        await create.save();
        const { password: pwd, __v, ...userdata } = create.toObject();
        return responseManager.created(res, "Admin user has been created successfully.");

    } catch (error) {
        return responseManager.servererror(res, constants.RESPONSE_MESSAGES.SERVER_ERROR);
    }
};

module.exports = admincreate;