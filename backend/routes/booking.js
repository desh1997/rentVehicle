// const express = require('express');
// const { Op } = require('sequelize');
// const Booking = require('../models/Booking');
// const Vehicle = require('../models/Vehicle');

// const router = express.Router();

// router.post('/booking', async (req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const dates = req.body.dates;
//     const vehicleId = req.body.model;
//     const startDate = dates.startDate;
//     const endDate = dates.endDate;

//     if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const existingBooking = await Booking.findOne({
//         where: {
//             vehicleId,
//             [Op.or]: [
//                 { startDate: { [Op.lt]: endDate, [Op.gt]: startDate } },
//                 { endDate: { [Op.gt]: startDate, [Op.lt]: endDate } }
//             ]
//         }
//     });

//     if (existingBooking) {
//         return res.status(400).json({ message: 'Vehicle is already booked for the selected dates.' });
//     }

//     try {
//         const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
//         return res.status(201).json({ message: 'Booking created successfully!', booking });
//     } catch (err) {
//         console.error('Error creating booking:', err);
//         return res.status(500).json({ message: 'Error creating booking. Please try again later.' });
//     }
// });

// module.exports = router;
// ----------------------------------------------------------------------------------------------------------
const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

// router.post('/booking', async (req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const dates = req.body.dates;
//     const vehicleId = req.body.model; // Assuming model should be the vehicle ID
//     const startDate = dates.startDate;
//     const endDate = dates.endDate;

//     // Validate required fields
//     if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Check for overlapping bookings for the same vehicleId
//     const existingBooking = await Booking.findOne({
//         where: {
//             vehicleId,
//             [Op.or]: [
//                 { startDate: { [Op.lt]: endDate, [Op.gt]: startDate } },
//                 { endDate: { [Op.gt]: startDate, [Op.lt]: endDate } },
//                 { 
//                     startDate: { [Op.eq]: startDate }, 
//                     endDate: { [Op.eq]: endDate } 
//                 }
//             ]
//         }
//     });
//     console.log(existingBooking,"--existingBooking--");
//     if (existingBooking) {
//         return res.status(400).json({ message: 'Vehicle is already booked for the selected dates.' });
//     }

//     try {
//         // Create a new booking
//         const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
//         return res.status(201).json({ message: 'Booking created successfully!', booking });
//     } catch (err) {
//         console.error('Error creating booking:', err);
//         return res.status(500).json({ message: 'Error creating booking. Please try again later.' });
//     }
// });

// module.exports = router;


router.post('/booking', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dates = req.body.dates;
    const vehicleId = req.body.model; // Assuming model should be the vehicle ID
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);

    // Normalize the dates to remove time components
    startDate.setHours(0, 0, 0, 0); // Set to midnight
    endDate.setHours(0, 0, 0, 0); // Set to midnight

    // Validate required fields
    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Log the received booking details
    console.log("Received booking details:", { firstName, lastName, vehicleId, startDate, endDate });

    // Check for overlapping bookings for the same vehicleId
    const existingBooking = await Booking.findOne({
        where: {
            vehicleId,
            [Op.and]: [
                { startDate: { [Op.lte]: endDate } }, // Existing booking starts on or before the new booking ends
                { endDate: { [Op.gte]: startDate } }  // Existing booking ends on or after the new booking starts
            ]
        }
    });

    console.log(existingBooking, "--existingBooking--");

    if (existingBooking) {
        return res.status(200).json({ message: 'Vehicle is already booked for the selected dates.' });
    }

    try {
        // Create a new booking
        const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
        return res.status(201).json({ message: 'Booking created successfully!', booking });
    } catch (err) {
        console.error('Error creating booking:', err);
        return res.status(500).json({ message: 'Error creating booking. Please try again later.' });
    }
});

module.exports = router;
