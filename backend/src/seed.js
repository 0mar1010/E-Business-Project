const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    {
        name: 'Whey Protein 2kg',
        description: 'Premium chocolate whey protein. 24g protein per serving.',
        price: 350,
        category: 'supplements',
        stock: 100,
        image: 'https://placehold.co/400x400?text=Whey+Protein',
    },
    {
        name: 'Creatine Monohydrate',
        description: 'Pure creatine monohydrate for strength and power.',
        price: 120,
        category: 'supplements',
        stock: 80,
        image: 'https://placehold.co/400x400?text=Creatine',
    },
    {
        name: 'Adjustable Dumbbell Set',
        description: '5-50kg adjustable dumbbells. Space-saving design.',
        price: 1200,
        category: 'equipment',
        stock: 20,
        image: 'https://placehold.co/400x400?text=Dumbbells',
    },
    {
        name: 'Resistance Bands Set',
        description: 'Set of 5 resistance bands. Light to extra heavy.',
        price: 85,
        category: 'equipment',
        stock: 60,
        image: 'https://placehold.co/400x400?text=Bands',
    },
    {
        name: 'Gym Gloves',
        description: 'Anti-slip gym gloves with wrist support.',
        price: 65,
        category: 'accessories',
        stock: 90,
        image: 'https://placehold.co/400x400?text=Gloves',
    },
    {
        name: 'Dry-Fit T-Shirt',
        description: 'Breathable dry-fit training shirt. Available in all sizes.',
        price: 95,
        category: 'apparel',
        stock: 120,
        image: 'https://placehold.co/400x400?text=T-Shirt',
    },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected — seeding products...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded 6 products successfully');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});