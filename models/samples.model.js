const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdatas',
        required: true
    },
    order_number:{
        type:Number,
        required:true
    },
    imageUrl: {
        type: [String],
        required: true
    },
    samplequantity:{
        type:Number,
        required:true,
        min:1
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
    samplenumber: {
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

const samplemodel = mongoose.model('sampleorders', schema);

module.exports = samplemodel;