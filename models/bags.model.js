const mongoose = require('mongoose');

const BagSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'userdatas',
        required: true
    },
    bagName: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
                required: true,
            },
            name: {
                type: String
            },
            imageUrl: {
                type: String,
                required: true
            },
            bagquantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'adminmangers',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const bagmodel = mongoose.model('bags', BagSchema);

module.exports = bagmodel;