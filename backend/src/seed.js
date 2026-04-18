const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    {
        name: 'Full Year Enrollment',
        description: 'Complete academic year enrollment for your child at Beroo Nursery. Includes all core activities and daily care.',
        price: 12000,
        category: 'enrollment',
        stock: 20,
        image: 'https://placehold.co/400x400?text=Enrollment',
    },
    {
        name: 'Half Year Enrollment',
        description: 'Six-month enrollment plan. Ideal for children joining mid-year.',
        price: 7000,
        category: 'enrollment',
        stock: 15,
        image: 'https://placehold.co/400x400?text=Half+Year',
    },
    {
        name: 'English Language Program',
        description: 'Dedicated English language sessions using modern playful teaching methods.',
        price: 1500,
        category: 'languages',
        stock: 999,
        image: 'https://placehold.co/400x400?text=English',
    },
    {
        name: 'German Language Program',
        description: 'Introductory German language classes designed for young children.',
        price: 1500,
        category: 'languages',
        stock: 999,
        image: 'https://placehold.co/400x400?text=German',
    },
    {
        name: 'French Language Program',
        description: 'Fun and creative French language sessions for kids aged 2–6.',
        price: 1500,
        category: 'languages',
        stock: 999,
        image: 'https://placehold.co/400x400?text=French',
    },
    {
        name: 'Arts & Creative Activities Pack',
        description: 'Monthly subscription for arts, crafts, music, and movement sessions.',
        price: 800,
        category: 'activities',
        stock: 30,
        image: 'https://placehold.co/400x400?text=Activities',
    },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected — seeding Beroo Nursery data...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded 6 items successfully');
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});