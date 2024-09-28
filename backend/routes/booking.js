// // routes/bookings.js
// const express = require('express');
// const Booking = require('../models/Booking');
// const Vehicle = require('../models/Vehicle');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { firstName, lastName, numberOfWheels, vehicleId, startDate, endDate } = req.body;

//   // Check for overlapping bookings
//   const existingBooking = await Booking.findOne({
//     where: {
//       vehicleId,
//       [Op.or]: [
//         { startDate: { [Op.lt]: endDate, [Op.gt]: startDate } },
//         { endDate: { [Op.gt]: startDate, [Op.lt]: endDate } }
//       ]
//     }
//   });

//   if (existingBooking) {
//     return res.status(400).json({ message: 'Vehicle is already booked for the selected dates.' });
//   }

//   // Create a new booking
//   const booking = await Booking.create({ firstName, lastName, numberOfWheels, vehicleId, startDate, endDate });
//   return res.status(201).json(booking);
// });

// module.exports = router;

// routes/bookings.js
const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.post('/booking', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dates = req.body.dates;
    const vehicleId = req.body.model;
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingBooking = await Booking.findOne({
        where: {
            vehicleId,
            [Op.or]: [
                { startDate: { [Op.lt]: endDate, [Op.gt]: startDate } },
                { endDate: { [Op.gt]: startDate, [Op.lt]: endDate } }
            ]
        }
    });

    if (existingBooking) {
        return res.status(400).json({ message: 'Vehicle is already booked for the selected dates.' });
    }

    try {
        const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
        return res.status(201).json({ message: 'Booking created successfully!', booking });
    } catch (err) {
        console.error('Error creating booking:', err);
        return res.status(500).json({ message: 'Error creating booking. Please try again later.' });
    }
});

module.exports = router;
