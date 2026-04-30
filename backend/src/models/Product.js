const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: ['supplements', 'equipment', 'apparel', 'accessories'],
            required: true,
        },
        stock: { type: Number, default: 0 },
        image: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);