const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Rental API!');
});

// Import routes
const vehicleRoutes = require('./routes/vehicles');
app.use('/api', vehicleRoutes);

const vehicleTypeRoutes = require('./routes/vehicleType');
app.use('/api', vehicleTypeRoutes);

const vehicleBookingRoutes = require('./routes/booking');
app.use('/api', vehicleBookingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
