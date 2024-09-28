// models/Vehicle.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const VehicleType = require('./VehicleType');

class Vehicle extends Model {}

Vehicle.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: 'id',
    },
  },
  wheel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  }
}, {
  sequelize,
  modelName: 'Vehicle',
});

Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });

module.exports = Vehicle;
