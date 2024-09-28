'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Toyota Yaris', typeId: 1, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda Fit', typeId: 1, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ford Escape', typeId: 2, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyota RAV4', typeId: 2, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda Accord', typeId: 3, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyota Camry', typeId: 3, wheel: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harley Davidson', typeId: 4, wheel: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
