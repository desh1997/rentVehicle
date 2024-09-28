import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchVehicles } from '../api'; // Assuming this fetches vehicles data
import { Box, Button, Step, StepLabel, Stepper, Card, CardContent } from '@mui/material';
import { FormControl } from '@mui/material';
import { TextField } from '@mui/material';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Typography } from '@mui/material';

const BookingForm = () => {
    const [name, setName] = useState({ first: '', last: '' });
    const [wheels, setWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [model, setModel] = useState('');
    const [dates, setDates] = useState({ start: '', end: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const data = await fetchVehicles();
                setVehicles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadVehicles();
    }, []);

    if (loading) return <div>Loading vehicles...</div>;
    if (error) return <div>Error loading vehicles: {error}</div>;

    const steps = [
        'Enter Name',
        'Select Number of Wheels',
        'Select Type of Vehicle',
        'Select Model',
        'Select Date Range',
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
                <CardContent sx={{ flex: 1}}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div>
                        {activeStep === 0 && (
                            <div>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        height: '200px'}}>
                                    <div className='w-full mb-6 pr-2 pl-2'>
                                        <InputLabel htmlFor="first-name">First Name</InputLabel>
                                        <Input
                                            id="first-name"
                                            aria-describedby="my-helper-text"
                                            value={name.first}
                                            onChange={(e) => setName({ ...name, first: e.target.value })}
                                            required
                                            fullWidth 
                                        />
                                    </div>
                                    <div className='w-full mt-6 pr-2 pl-2'>
                                        <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                        <Input
                                            id="last-name"
                                            aria-describedby="my-helper-text"
                                            value={name.last}
                                            onChange={(e) => setName({ ...name, last: e.target.value })}
                                            required
                                            fullWidth 
                                        />
                                    </div>
                                </Box>
                            </div>
                        )}
                        {activeStep === 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2'>
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
                                </div>
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2'>
                                <InputLabel>Type of Vehicle:</InputLabel>
                                <Select onChange={(e) => setVehicleType(e.target.value)} value={vehicleType}>
                                    <option value="">Select</option>
                                    {vehicles.filter(v => v.wheels.toString() === wheels).map(v => (
                                        <option key={v.id} value={v.type}>{v.type}</option>
                                    ))}
                                </Select>
                            </div>
                            </Box>
                        )}
                        {activeStep === 3 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2'>
                                <InputLabel>Model:</InputLabel>
                                <Select onChange={(e) => setModel(e.target.value)} value={model}>
                                    <option value="">Select</option>
                                    {vehicles.filter(v => v.type === vehicleType).map(v => (
                                        <option key={v.id} value={v.model}>{v.model}</option>
                                    ))}
                                </Select>
                            </div>
                            </Box>
                        )}
                        {activeStep === 4 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2'>
                                    <InputLabel>Date Range:</InputLabel>
                                    <Input
                                        type="date"
                                        value={dates.start}
                                        onChange={(e) => setDates({ ...dates, start: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="date"
                                        value={dates.end}
                                        onChange={(e) => setDates({ ...dates, end: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="button" onClick={handleSubmit}>Submit</Button>
                                </Box>
                        )}
                    </div>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid lightgray'}}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="button" onClick={handleNext} disabled={activeStep === steps.length - 1}>
                        Next
                    </Button>
                </Box>
                {error && <div style={{ color: 'red' }}>{error}</div>} {/* Error message display */}
            </Card>
        </Box>
    );
};

export default BookingForm;
