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