const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.deleteMany({ role: 'admin' });
    await User.create({ email: 'admin@beroo.com', password: hashed, role: 'admin' });
    console.log('Admin created: admin@beroo.com / admin123');
    process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });