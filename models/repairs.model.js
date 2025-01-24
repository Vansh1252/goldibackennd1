const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdatas',
        required: true
    },
    order_Number: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    OrderDate: {
        type: Date,
        default: Date.now
    },
    AcceptedDate: {
        type: Date,
        default: null,
    },
    CompletedDate: {
        type: Date,
        default: null,
    },
    CancelledDate: {
        type: Date,
        default: null,
    },
    repairnumber: {
        type: String,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending',
    }
}, { timestamps: true });

const repairordermodel = mongoose.model('repairorders', schema);

module.exports = repairordermodel;