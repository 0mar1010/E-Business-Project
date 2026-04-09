const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.deleteMany({ role: 'admin' });
    await User.create({ email: 'admin@gymstore.com', password: hashed, role: 'admin' });
    console.log('Admin created: admin@gymstore.com / admin123');
    process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });