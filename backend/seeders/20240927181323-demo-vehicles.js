// seeders/20230928-vehicle-seed.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      {
        model: 'Toyota Yaris',
        type: 'hatchback',
        wheels: 4,
        available: true
      },
      {
        model: 'Honda Fit',
        type: 'hatchback',
        wheels: 4,
        available: true
      },
      {
        model: 'Ford Fiesta',
        type: 'hatchback',
        wheels: 4,
        available: true
      },
      // SUV cars
      {
        model: 'Toyota RAV4',
        type: 'suv',
        wheels: 4,
        available: true
      },
      {
        model: 'Honda CR-V',
        type: 'suv',
        wheels: 4,
        available: true
      },
      {
        model: 'Ford Escape',
        type: 'suv',
        wheels: 4,
        available: true
      },
      // Sedan cars
      {
        model: 'Toyota Camry',
        type: 'sedan',
        wheels: 4,
        available: true
      },
      {
        model: 'Honda Accord',
        type: 'sedan',
        wheels: 4,
        available: true
      },
      {
        model: 'Nissan Altima',
        type: 'sedan',
        wheels: 4,
        available: true
      },
      // Bike
      {
        model: 'Harley-Davidson Sportster',
        type: 'cruiser',
        wheels: 2,
        available: true
      },
      {
        model: 'Yamaha YZF-R3',
        type: 'sports',
        wheels: 2,
        available: true
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
