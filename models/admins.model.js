const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});
const adminmodel = mongoose.model('adminmangers', schema);
module.exports = adminmodel;