// backend/routes/vehicles.js
const express = require('express');
const router = express.Router();

// Sample route to get all vehicles
router.get('/', (req, res) => {
    res.json([{ id: 1, model: 'Sedan' }, { id: 2, model: 'SUV' }]);
});

module.exports = router;
