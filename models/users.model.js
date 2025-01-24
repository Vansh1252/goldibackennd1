const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    status: {
        type: Boolean,
        default: true,
    },
    product_status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminmanger',
        required: true
    }
}, {
    timestamps: true,
});
const usermodel = mongoose.model('userdatas', schema);
module.exports = usermodel;