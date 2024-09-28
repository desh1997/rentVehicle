// routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, numberOfWheels, vehicleId, startDate, endDate } = req.body;

  // Check for overlapping bookings
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

  // Create a new booking
  const booking = await Booking.create({ firstName, lastName, numberOfWheels, vehicleId, startDate, endDate });
  return res.status(201).json(booking);
});

module.exports = router;
