// seeders/seed.js
const sequelize = require('../config/db'); // Use the correct path to your db.js file
const VehicleType = require('../models/VehicleType');
const Vehicle = require('../models/Vehicle');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // Drop existing tables and create new ones

    // Seed Vehicle Types
    const hatchback = await VehicleType.create({ name: 'Hatchback' });
    const suv = await VehicleType.create({ name: 'SUV' });
    const sedan = await VehicleType.create({ name: 'Sedan' });
    const cruiser = await VehicleType.create({ name: 'Cruiser' });

    // Seed Vehicles
    await Vehicle.create({ name: 'Toyota Yaris', typeId: hatchback.id });
    await Vehicle.create({ name: 'Honda Fit', typeId: hatchback.id });
    await Vehicle.create({ name: 'Ford Escape', typeId: suv.id });
    await Vehicle.create({ name: 'Toyota RAV4', typeId: suv.id });
    await Vehicle.create({ name: 'Honda Accord', typeId: sedan.id });
    await Vehicle.create({ name: 'Toyota Camry', typeId: sedan.id });
    await Vehicle.create({ name: 'Harley Davidson', typeId: cruiser.id });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedData();
