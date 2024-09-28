import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchVehicles } from '../api'; // Assuming this fetches vehicles data
import { Box, Button, Step, StepLabel, Stepper, Card, CardContent } from '@mui/material';
import { TextField, InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';


const BookingForm = () => {
    const [name, setName] = useState({ first: '', last: '' });
    const [wheels, setWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleTypes, setVehicleTypes] = useState([]); // Store filtered vehicle types here
    const [model, setModel] = useState('');
    const [dates, setDates] = useState({ start: '', end: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    // Fetch vehicle types when the user selects the number of wheels
    useEffect(() => {
        const fetchVehicleTypes = async () => {
            if (wheels) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/vehicles?wheels=${wheels}`);
                    setVehicleTypes(response.data);
                } catch (err) {
                    setError('Error fetching vehicle types');
                }
            }
        };
        fetchVehicleTypes();
    }, [wheels]);

    const steps = [
        'Enter Name',
        'Select Number of Wheels',
        'Select Type of Vehicle',
        'Select Model',
        'Select Date Range',
    ];

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmit = async () => {
        const formData = {
            firstName: name.first,
            lastName: name.last,
            wheels,
            vehicleType,
            model,
            dates,
        };

        try {
            const response = await axios.post('https://your-backend-api-url.com/submit', formData);
            console.log('Response from server:', response.data);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Error submitting form. Please try again later.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: '500px', height: '450px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div>
                        {activeStep === 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
                                <InputLabel htmlFor="first-name">First Name</InputLabel>
                                <Input
                                    id="first-name"
                                    value={name.first}
                                    onChange={(e) => setName({ ...name, first: e.target.value })}
                                    required
                                    fullWidth
                                />
                                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                <Input
                                    id="last-name"
                                    value={name.last}
                                    onChange={(e) => setName({ ...name, last: e.target.value })}
                                    required
                                    fullWidth
                                />
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <InputLabel>Number of Wheels:</InputLabel>
                                <Checkbox
                                    type="radio"
                                    value="2"
                                    checked={wheels === '2'}
                                    onChange={() => setWheels('2')}
                                /> 2
                                <Checkbox
                                    type="radio"
                                    value="4"
                                    checked={wheels === '4'}
                                    onChange={() => setWheels('4')}
                                /> 4
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <InputLabel>Type of Vehicle:</InputLabel>
                                <Select
                                    value={vehicleType}
                                    onChange={(e) => setVehicleType(e.target.value)}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {vehicleTypes.map((type, index) => (
                                        <MenuItem key={index} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        )}
                        {/* Other steps remain the same */}
                    </div>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid lightgray' }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    {activeStep !== steps.length - 1 ? (
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </Box>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Card>
        </Box>
    );
};

export default BookingForm;