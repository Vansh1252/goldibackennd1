const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adminmanager',
            required: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

const categorymodel = mongoose.model('categories', categorySchema);

module.exports = categorymodel;
