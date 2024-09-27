const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Vehicle extends Model {}

Vehicle.init({
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheels: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Vehicle',
});

module.exports = Vehicle;
