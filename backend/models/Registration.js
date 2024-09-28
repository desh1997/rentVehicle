// models/Registration.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Registration extends Model {}

Registration.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Vehicles',
      key: 'id',
    },
    allowNull: false,
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'Registration',
});

module.exports = Registration;
