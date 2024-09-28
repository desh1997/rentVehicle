const express = require('express');
const Vehicle = require('../models/Vehicle'); // Assuming models folder has the Vehicle model
const VehicleType = require('../models/VehicleType');
const router = express.Router();

// Route to get vehicles
router.get('/vehicles', async (req, res) => {
    console.log("--Backend-called---");
    const data = req.query;
    console.log(data.wheels,"--wheels.wheels--");
    // try {
    //     const whereClause = data.wheels ? { typeId: parseInt(data.wheels) } : {};
    //     console.log(whereClause,"--whereClause--");
    //     const vehicles = await Vehicle.findAll(
    //         {
    //         where: whereClause,
    //         // include: [{ model: VehicleType, as: 'type' }] // Include VehicleType data
    //     }
    // );
    //     console.log(vehicles,"--vehicles--");
    //     res.status(200).json({ message: 'Success', data: vehicles });
    // } catch (err) {
    //     res.status(500).json({ error:err });
    // }
    try {
        // Create the where clause based on the provided data
        const whereClause = {
            ...(data.wheels && { wheel: parseInt(data.wheels) }), // Filter by wheel count
            ...(data.typeId && { typeId: parseInt(data.typeId) }) // Optionally filter by typeId if provided
        };
        
        console.log(whereClause, "--whereClause--");
        
        const vehicles = await Vehicle.findAll({
            where: whereClause,
            // include: [{ model: VehicleType, as: 'type' }] // Include VehicleType data if needed
        });
        
        console.log(vehicles, "--vehicles--");
        
        res.status(200).json({ message: 'Success', data: vehicles });
    } catch (err) {
        res.status(500).json({ error: err });
    }
    
});


module.exports = router;
