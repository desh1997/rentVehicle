// backend/seed/seed.js
const { sequelize } = require('../models');
const Vehicle = require('../models/Vehicle');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const vehicles = [
        { model: 'Hatchback', type: 'car', wheels: 4 },
        { model: 'SUV', type: 'car', wheels: 4 },
        { model: 'Sedan', type: 'car', wheels: 4 },
        { model: 'Cruiser', type: 'bike', wheels: 2 },
        { model: 'Sports', type: 'bike', wheels: 2 },
    ];

    await Vehicle.bulkCreate(vehicles);
    console.log('Database seeded!');
    process.exit(0);
};

seedDatabase();
