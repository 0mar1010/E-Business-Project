const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerPhone: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            governorate: { type: String, required: true },
        },
        items: [
            {
                productId: String,
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'shipped', 'delivered'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);