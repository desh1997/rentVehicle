// const express = require('express');
// const Vehicle = require('../models/Vehicle'); // Assuming models folder has the Vehicle model
// const VehicleType = require('../models/VehicleType');
// const { Op } = require('sequelize'); // Import Op for Sequelize operators
// const router = express.Router();

// // Route to get vehicles
// router.post('/vehicles', async (req, res) => {
//     const { vehicleTypeIds, wheels } = req.body; // Get vehicleTypeIds array and wheels from the request body
    
//     if (!Array.isArray(vehicleTypeIds) || vehicleTypeIds.length === 0) {
//         return res.status(400).json({ error: 'Invalid vehicleTypeIds array' });
//     }

//     try {
//         // Create the where clause based on the provided data
//         const whereClause = {
//             ...(wheels && { wheel: parseInt(wheels) }), // Filter by wheel count if provided
//             typeId: {
//                 [Op.in]: vehicleTypeIds // Filter by typeId using the array of IDs
//             }
//         };

//         const vehicles = await Vehicle.findAll({
//             where: whereClause,
//             // include: [{ model: VehicleType, as: 'type' }] // Uncomment if you want to include VehicleType data
//         });

//         res.status(200).json({ message: 'Success', data: vehicles });
//     } catch (err) {
//         res.status(500).json({ error: err.message || 'Error fetching vehicles' });
//     }
// });

// module.exports = router;

const express = require('express');
const Vehicle = require('../models/Vehicle'); // Assuming models folder has the Vehicle model
const router = express.Router();

// Route to get vehicles by typeId
router.get('/vehicles', async (req, res) => {
    const type_id = req.query; // Get typeId from query parameters
    
    if (!type_id.id) {
        return res.status(400).json({ error: 'typeId is required' });
    }

    try {
        const vehicles = await Vehicle.findAll({
            where: {
                typeId: type_id.id // Filter by typeId
            }
        });

        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'No vehicles found for the provided typeId' });
        }

        res.status(200).json({ message: 'Success', data: vehicles });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Error fetching vehicles' });
    }
});

module.exports = router;

