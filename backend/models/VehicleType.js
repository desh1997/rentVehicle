// models/VehicleType.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class VehicleType extends Model {}

VehicleType.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  }
}, {
  sequelize,
  modelName: 'VehicleType',
});

module.exports = VehicleType;

// models/VehicleType.js
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// class VehicleType extends Model {}

// VehicleType.init({
//     // fields...
// }, {
//     sequelize,
//     modelName: 'VehicleType',
// });

// // Export the model
// module.exports = VehicleType;

// // Define associations
// VehicleType.associate = (models) => {
//     VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeid', as: 'vehicles' });
// };