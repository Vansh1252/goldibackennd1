const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'userdatas',
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            },
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'categories',
                required: true
            },
            categoryname: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            remainingQuantity: {
                type: Number
            },
            productDescription: {
                type: String,
                default: "",
            },
        },
    ],
    finalDescription: {
        type: String,
        default: "",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveredDate: {
        type: Date,
        default: null,
    },
    cancelDate: {
        type: Date,
        default: null,
    },
    totalBag: {
        type: Number,
        default: 0,
    },
    totalQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
}, { timestamps: true });
const ordermodel = mongoose.model('orders', OrderSchema);
module.exports = ordermodel;
