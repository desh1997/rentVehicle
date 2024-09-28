'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
