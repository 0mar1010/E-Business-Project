const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const images = {
    supplements: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    equipment: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    apparel: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop', // <-- Updated link here!
    accessories: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
}

const products = [
    // SUPPLEMENTS (15)
    { name: 'Whey Protein Chocolate 2kg', description: 'Premium whey protein with 24g protein per serving. Chocolate flavor.', price: 350, category: 'supplements', stock: 100, image: images.supplements },
    { name: 'Whey Protein Vanilla 2kg', description: 'Smooth vanilla whey protein. 24g protein per serving.', price: 350, category: 'supplements', stock: 80, image: images.supplements },
    { name: 'Whey Protein Strawberry 1kg', description: 'Strawberry flavored whey protein for muscle recovery.', price: 195, category: 'supplements', stock: 60, image: images.supplements },
    { name: 'Creatine Monohydrate 500g', description: 'Pure creatine monohydrate for strength and explosive power.', price: 120, category: 'supplements', stock: 90, image: images.supplements },
    { name: 'Mass Gainer 5kg', description: 'High-calorie mass gainer. 1250 calories per serving for serious bulking.', price: 520, category: 'supplements', stock: 40, image: images.supplements },
    { name: 'BCAA Powder 300g', description: 'Branched-chain amino acids for muscle recovery and endurance.', price: 180, category: 'supplements', stock: 70, image: images.supplements },
    { name: 'Pre-Workout Energy 250g', description: 'Explosive energy and focus formula for intense workouts.', price: 220, category: 'supplements', stock: 55, image: images.supplements },
    { name: 'L-Carnitine 1000mg', description: 'Fat burner and energy booster. 60 capsules.', price: 140, category: 'supplements', stock: 85, image: images.supplements },
    { name: 'Omega-3 Fish Oil', description: 'High-quality fish oil for joint health and recovery. 90 softgels.', price: 95, category: 'supplements', stock: 110, image: images.supplements },
    { name: 'Multivitamin Sport', description: 'Complete multivitamin formula designed for athletes. 60 tablets.', price: 85, category: 'supplements', stock: 120, image: images.supplements },
    { name: 'Glutamine Powder 400g', description: 'Pure L-Glutamine for muscle recovery and immune support.', price: 160, category: 'supplements', stock: 65, image: images.supplements },
    { name: 'Casein Protein 2kg', description: 'Slow-release protein for overnight muscle recovery.', price: 380, category: 'supplements', stock: 45, image: images.supplements },
    { name: 'Fat Burner Capsules', description: 'Thermogenic fat burner with green tea extract. 90 capsules.', price: 175, category: 'supplements', stock: 75, image: images.supplements },
    { name: 'ZMA Recovery Formula', description: 'Zinc, magnesium, and vitamin B6 for deep sleep and recovery.', price: 110, category: 'supplements', stock: 50, image: images.supplements },
    { name: 'Collagen Peptides 300g', description: 'Hydrolyzed collagen for joints, skin, and connective tissue.', price: 145, category: 'supplements', stock: 60, image: images.supplements },

    // EQUIPMENT (15)
    { name: 'Adjustable Dumbbell Set 5-50kg', description: 'Space-saving adjustable dumbbells. Replaces 15 pairs of weights.', price: 1200, category: 'equipment', stock: 20, image: images.equipment },
    { name: 'Barbell 20kg Olympic', description: 'Olympic standard 20kg barbell. 220cm length, chrome finish.', price: 850, category: 'equipment', stock: 15, image: images.equipment },
    { name: 'Weight Plates Set 100kg', description: 'Cast iron weight plates set. Includes 2x25kg, 2x20kg, 2x10kg, 2x5kg.', price: 1800, category: 'equipment', stock: 10, image: images.equipment },
    { name: 'Pull-Up Bar Doorframe', description: 'No-screw doorframe pull-up bar. Fits doors 60-100cm wide.', price: 185, category: 'equipment', stock: 40, image: images.equipment },
    { name: 'Resistance Bands Set 5pcs', description: 'Set of 5 latex resistance bands. Extra light to extra heavy.', price: 85, category: 'equipment', stock: 60, image: images.equipment },
    { name: 'Kettlebell 16kg', description: 'Cast iron kettlebell with smooth finish. 16kg.', price: 320, category: 'equipment', stock: 25, image: images.equipment },
    { name: 'Kettlebell 24kg', description: 'Cast iron kettlebell with smooth finish. 24kg.', price: 440, category: 'equipment', stock: 20, image: images.equipment },
    { name: 'Ab Roller Wheel', description: 'Double wheel ab roller with knee pad. Builds core strength.', price: 75, category: 'equipment', stock: 55, image: images.equipment },
    { name: 'Jump Rope Speed Cable', description: 'Adjustable speed jump rope with ball bearings. 300cm.', price: 65, category: 'equipment', stock: 80, image: images.equipment },
    { name: 'Yoga Mat 6mm', description: 'Non-slip TPE yoga mat. 183x61cm, 6mm thickness.', price: 120, category: 'equipment', stock: 50, image: images.equipment },
    { name: 'Foam Roller 60cm', description: 'High-density foam roller for muscle recovery and myofascial release.', price: 95, category: 'equipment', stock: 45, image: images.equipment },
    { name: 'Bench Press Flat', description: 'Heavy-duty flat bench press. Supports up to 300kg.', price: 950, category: 'equipment', stock: 8, image: images.equipment },
    { name: 'Power Rack Squat Stand', description: 'Adjustable squat rack with safety bars. Max load 200kg.', price: 1500, category: 'equipment', stock: 5, image: images.equipment },
    { name: 'Battle Rope 10m', description: '10 meter battle rope, 38mm diameter. Full body conditioning.', price: 420, category: 'equipment', stock: 12, image: images.equipment },
    { name: 'TRX Suspension Trainer', description: 'Full-body suspension training system. Works anywhere.', price: 550, category: 'equipment', stock: 18, image: images.equipment },

    // APPAREL (10)
    { name: 'Dry-Fit Training T-Shirt', description: 'Breathable moisture-wicking shirt. Available in S/M/L/XL.', price: 95, category: 'apparel', stock: 150, image: images.apparel },
    { name: 'Compression Shorts', description: 'High-performance compression shorts for training and recovery.', price: 120, category: 'apparel', stock: 100, image: images.apparel },
    { name: 'Training Jogger Pants', description: 'Lightweight jogger pants with side pockets. S to XXL.', price: 180, category: 'apparel', stock: 80, image: images.apparel },
    { name: 'Sports Hoodie Zip', description: 'Full zip sports hoodie with kangaroo pocket. Fleece lined.', price: 280, category: 'apparel', stock: 60, image: images.apparel },
    { name: 'Tank Top Muscle Fit', description: 'Slim-fit muscle tank top. Breathable mesh fabric.', price: 75, category: 'apparel', stock: 120, image: images.apparel },
    { name: 'Sports Bra High Support', description: 'High-impact sports bra with adjustable straps. XS to XL.', price: 145, category: 'apparel', stock: 90, image: images.apparel },
    { name: 'Leggings High Waist', description: 'High-waist compression leggings. 4-way stretch fabric.', price: 195, category: 'apparel', stock: 85, image: images.apparel },
    { name: 'Training Cap', description: 'Adjustable training cap with moisture-wicking sweatband.', price: 55, category: 'apparel', stock: 140, image: images.apparel },
    { name: 'Compression Sleeves Pair', description: 'Arm compression sleeves for muscle support and recovery.', price: 85, category: 'apparel', stock: 70, image: images.apparel },
    { name: 'Training Shorts 2-in-1', description: '2-in-1 training shorts with inner compression layer.', price: 135, category: 'apparel', stock: 95, image: images.apparel },

    // ACCESSORIES (10)
    { name: 'Gym Gloves Anti-Slip', description: 'Full-palm gym gloves with wrist support. S/M/L/XL.', price: 65, category: 'accessories', stock: 110, image: images.accessories },
    { name: 'Weightlifting Belt Leather', description: 'Genuine leather weightlifting belt. 10cm wide. S to XXL.', price: 320, category: 'accessories', stock: 30, image: images.accessories },
    { name: 'Shaker Bottle 700ml', description: 'BPA-free protein shaker with mixing ball. 700ml.', price: 45, category: 'accessories', stock: 200, image: images.accessories },
    { name: 'Gym Bag 40L', description: 'Large gym bag with shoe compartment and wet pocket. 40L.', price: 235, category: 'accessories', stock: 50, image: images.accessories },
    { name: 'Wrist Wraps Pair', description: 'Heavy-duty wrist wraps for pressing movements. 50cm.', price: 75, category: 'accessories', stock: 85, image: images.accessories },
    { name: 'Knee Sleeves Pair 7mm', description: '7mm neoprene knee sleeves for squats and leg press.', price: 180, category: 'accessories', stock: 40, image: images.accessories },
    { name: 'Lifting Straps Pair', description: 'Cotton lifting straps for deadlifts and rows.', price: 55, category: 'accessories', stock: 95, image: images.accessories },
    { name: 'Gym Chalk Block 8pcs', description: 'Magnesium carbonate chalk for better grip. 8-block set.', price: 40, category: 'accessories', stock: 130, image: images.accessories },
    { name: 'Water Bottle Insulated 1L', description: 'Double-wall insulated water bottle. Keeps cold 24h. 1 liter.', price: 120, category: 'accessories', stock: 75, image: images.accessories },
    { name: 'Resistance Loop Bands 5pcs', description: 'Mini loop resistance bands for glutes and warm-up exercises.', price: 50, category: 'accessories', stock: 115, image: images.accessories },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected — seeding products...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});