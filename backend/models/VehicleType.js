// models/VehicleType.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class VehicleType extends Model {}

VehicleType.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'VehicleType',
});

module.exports = VehicleType;
