// routes/vehicleType.js
const express = require('express');
const VehicleType = require('../models/VehicleType');
const router = express.Router();

// Define your vehicle type routes here
router.get('/vehicle-type', async function(req, res) {
    const data = req.query;
    
    try {
        const whereClause = {
            ...(data.wheels && { wheel: parseInt(data.wheels) }) 
        };
    
        console.log(whereClause, "--whereClause for VehicleType--");
    
        const vehicleTypes = await VehicleType.findAll({
            where: whereClause
        });
    
        console.log(vehicleTypes, "--vehicles--");
    
        res.status(200).json({ message: 'Success', data: vehicleTypes });
    } catch (err) {
        res.status(500).json({ error: err.message || 'Error fetching vehicles' });
    }
});

module.exports = router;
