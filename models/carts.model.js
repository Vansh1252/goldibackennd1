const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
            quantity: {
                type: Number,
                required: true,
                min:1
            },
            productDescription: {
                type: String,
                default: "",
            },
        },
    ],
}, { timestamps: true });

const cartmodel = mongoose.model('carts', CartSchema);

module.exports = cartmodel;
