// const express = require('express');
// const router = express.Router();

// // Sample route to get all vehicles
// router.get('/', (req, res) => {
//     res.json([{ id: 1, model: 'Sedan' }, { id: 2, model: 'SUV' }]);
// });

// module.exports = router;

const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Get all vehicle types
router.get('/', async (req, res) => {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
});

// Booking API
router.post('/book', async (req, res) => {
    const { model, startDate, endDate } = req.body;
    
    // Implement logic to check availability and create a booking
    // ...

    res.status(201).json({ message: 'Vehicle booked successfully!' });
});

module.exports = router;