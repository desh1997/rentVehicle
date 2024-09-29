// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Button, Step, StepLabel, Stepper, Card, CardContent } from '@mui/material';
// import { InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';
// import { Link } from 'react-router-dom';


// const BookingForm = () => {
//     const [name, setName] = useState({ first: '', last: '' });
//     const [wheels, setWheels] = useState('');
//     const [vehicleType, setVehicleType] = useState('');
//     const [vehicleTypes, setVehicleTypes] = useState([]);
//     const [vehicles, setVehicles] = useState([]);
//     const [model, setModel] = useState('');
//     const [dates, setDates] = useState({ start: '', end: '' });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeStep, setActiveStep] = useState(0);


//     const steps = [
//         'Enter Name',
//         'Select Number of Wheels',
//         'Select Type of Vehicle',
//         'Select Model',
//         'Select Date Range',
//     ];

//     const fetchVehicleTypes = async (wheels) => {
//         try {
//             const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicle-type?wheels=${wheels}`);
//             if (Array.isArray(vehicleResponse.data.data)) {
//                 setVehicleTypes(vehicleResponse.data.data);
                
//                 // if (vehicleResponse.status === 200) {
//                 //     let vehicleTypeIdList=[];
//                 //     for (let i = 0; i < vehicleResponse.data.data.length; i++) {
//                 //         vehicleTypeIdList.push(vehicleResponse.data.data[i].id);
//                 //     }
//                 //     console.log('Fetched vehicle types:', vehicleTypeIdList);
//                 //     const vehicleTypesResponse = await axios.post(`http://localhost:5000/api/vehicles`, {
//                 //         vehicleTypeIds: vehicleTypeIdList
//                 //     });
//                 //     console.log('Fetched vehicle types:', vehicleTypesResponse.data);
//                 //     setVehicles(vehicleTypesResponse.data); // Store fetched vehicle types
//                 // } else {
//                 //     console.error('Expected an array but got:', vehicleResponse.data);
//                 //     return;
//                 // }
                
//             } else {
//                 console.error('Expected an array but got:', vehicleResponse.data);
//             }
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const fetchVehiclesByType = async (typeId) => {
//         try {
//             const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicles?id=${typeId}`);
//             if (Array.isArray(vehicleResponse.data.data)) {
//                 setVehicles(vehicleResponse.data.data); // Store fetched vehicle data
//             } else {
//                 console.error('Expected an array but got:', vehicleResponse.data);
//             }
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleWheelsChange = (numWheels) => {
//         setWheels(numWheels);
//         fetchVehicleTypes(numWheels); 
//     };

//     const handleVehicleTypeChange = (typeId) => {
//         setVehicleType(typeId);
//         fetchVehiclesByType(typeId); 
//     };

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSubmit = async () => {
//         const formData = {
//             firstName: name.first,
//             lastName: name.last,
//             dates: {
//                 startDate: dates.start,
//                 endDate: dates.end,
//             },
//             model: model,
//         };

//         try {
//             const response = await axios.post('http://localhost:5000/api/booking', formData);
//             console.log('Response from server:', response.data);
//             alert(response.data.message);
//         } catch (err) {
//             console.error('Error submitting form:', err);
//         if (err.response && err.response.data && err.response.data.message) {
//             alert(err.response.data.message);
//         } else {
//             alert('Error submitting form. Please try again later.');
//         }
//         }
//     };

//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//             <Card sx={{ width: '500px', height: '450px', display: 'flex', flexDirection: 'column' }}>
//             <Link className="text-blue-500" to="/ListBookings">
//                 <Button variant="contained">View Bookings</Button>
//             </Link>
//                 <CardContent sx={{ flex: 1 }}>
//                     <Stepper activeStep={activeStep} alternativeLabel>
//                         {steps.map((label) => (
//                             <Step key={label}>
//                                 <StepLabel>{label}</StepLabel>
//                             </Step>
//                         ))}
//                     </Stepper>

//                     <div>
//                         {activeStep === 0 && (
//                             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
//                                 <div className='w-full mb-6 pr-2 pl-2'>
//                                     <InputLabel htmlFor="first-name">First Name</InputLabel>
//                                     <Input
//                                         id="first-name"
//                                         aria-describedby="my-helper-text"
//                                         value={name.first}
//                                         onChange={(e) => setName({ ...name, first: e.target.value })}
//                                         required
//                                         fullWidth
//                                     />
//                                 </div>
//                                 <div className='w-full mt-6 pr-2 pl-2'>
//                                     <InputLabel htmlFor="last-name">Last Name</InputLabel>
//                                     <Input
//                                         id="last-name"
//                                         aria-describedby="my-helper-text"
//                                         value={name.last}
//                                         onChange={(e) => setName({ ...name, last: e.target.value })}
//                                         required
//                                         fullWidth
//                                     />
//                                 </div>
//                             </Box>
//                         )}
//                         {activeStep === 1 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//                                 <div className='mb-6 pr-2 pl-2'>
//                                     <InputLabel>Number of Wheels:</InputLabel>
//                                     <Checkbox
//                                         type="radio"
//                                         value="2"
//                                         checked={wheels === '2'}
//                                         onChange={() => handleWheelsChange('2')}
//                                     /> 2
//                                     <Checkbox
//                                         type="radio"
//                                         value="4"
//                                         checked={wheels === '4'}
//                                         onChange={() => handleWheelsChange('4')}
//                                     /> 4
//                                 </div>
//                             </Box>
//                         )}
//                         {activeStep === 2 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//                                 <div className='mb-6 pr-2 pl-2' style={{ width: '300px' }}>
//                                     <InputLabel>Type of Vehicle:</InputLabel>
//                                      <Select fullWidth onChange={(e) => handleVehicleTypeChange(e.target.value)} value={vehicleType}>
//                                         <MenuItem value="">Select</MenuItem>
//                                         {vehicleTypes.map((type, index) => (
//                                             <MenuItem key={index} value={type.id}>
//                                                 {type.name || type.toString()}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </div>
//                             </Box>
//                         )}
//                         {activeStep === 3 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//                                 <div className='mb-6 pr-2 pl-2' style={{ width: '300px' }}>
//                                     <InputLabel>Model:</InputLabel>
//                                     <Select fullWidth onChange={(e) => setModel(e.target.value)} value={model}>
//                                     {vehicles.map((type, index) => (
//                                             <MenuItem key={index} value={type.id}>
//                                                 {type.name || type.toString()}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </div>
//                             </Box>
//                         )}
//                         {activeStep === 4 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//                                 <div className='block mb-6 pr-2 pl-2 pt-10'>
//                                     <InputLabel className='mb-6'>Date Range:</InputLabel>
//                                     <div className='mb-6'>
//                                         <Input
//                                             type="date"
//                                             value={dates.start}
//                                             onChange={(e) => setDates({ ...dates, start: e.target.value })}
//                                             required
//                                         />
//                                     </div>
//                                     <div className='mb-6'>
//                                         <Input
//                                             type="date"
//                                             value={dates.end}
//                                             onChange={(e) => setDates({ ...dates, end: e.target.value })}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </Box>
//                         )}
//                     </div>
//                 </CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid lightgray' }}>
//                     <Button disabled={activeStep === 0} onClick={handleBack}>
//                         Back
//                     </Button>
//                     {activeStep !== 4 ? (
//                         <Button type="button" onClick={handleNext} disabled={activeStep === steps.length - 1}>
//                             Next
//                         </Button>
//                     ) : (
//                         <Button type="button" onClick={handleSubmit}>
//                             Submit
//                         </Button>
//                     )}
//                 </Box>
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//             </Card>
//         </Box>
//     );
// };

// export default BookingForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Step, StepLabel, Stepper, Card, CardContent } from '@mui/material';
import { InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';

const BookingForm = () => {
    const [name, setName] = useState({ first: '', last: '' });
    const [wheels, setWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [model, setModel] = useState('');
    const [dates, setDates] = useState({ start: '', end: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        'Enter Name',
        'Select Number of Wheels',
        'Select Type of Vehicle',
        'Select Model',
        'Select Date Range',
    ];

    const fetchVehicleTypes = async (wheels) => {
        try {
            const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicle-type?wheels=${wheels}`);
            if (Array.isArray(vehicleResponse.data.data)) {
                setVehicleTypes(vehicleResponse.data.data);
            } else {
                console.error('Expected an array but got:', vehicleResponse.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchVehiclesByType = async (typeId) => {
        try {
            const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicles?id=${typeId}`);
            if (Array.isArray(vehicleResponse.data.data)) {
                setVehicles(vehicleResponse.data.data); // Store fetched vehicle data
            } else {
                console.error('Expected an array but got:', vehicleResponse.data);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleWheelsChange = (numWheels) => {
        setWheels(numWheels);
        fetchVehicleTypes(numWheels); 
    };

    const handleVehicleTypeChange = (typeId) => {
        setVehicleType(typeId);
        fetchVehiclesByType(typeId); 
    };

    const handleNext = () => {
        if (activeStep === 0 && (!name.first || !name.last)) {
            setError("Please enter both first and last name.");
            return;
        }
        if (activeStep === 1 && !wheels) {
            setError("Please select the number of wheels.");
            return;
        }
        if (activeStep === 2 && !vehicleType) {
            setError("Please select a vehicle type.");
            return;
        }
        if (activeStep === 3 && !model) {
            setError("Please select a vehicle model.");
            return;
        }
        if (activeStep === 4 && (!dates.start || !dates.end)) {
            setError("Please select a date range.");
            return;
        }

        setError(null); // Clear any previous errors
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
        const formData = {
            firstName: name.first,
            lastName: name.last,
            dates: {
                startDate: dates.start,
                endDate: dates.end,
            },
            model: model,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/booking', formData);
            console.log('Response from server:', response.data);
            alert(response.data.message);
        } catch (err) {
            console.error('Error submitting form:', err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('Error submitting form. Please try again later.');
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: '500px', height: '450px', display: 'flex', flexDirection: 'column' }}>
            <div className='flex items-center justify-center'>
            {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
            <Link className="text-blue-500" to="/ListBookings">
                {/* <Button variant="contained">View Bookings</Button> */}
                View Bookings
            </Link>
            </div>
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
                        )}
                        {activeStep === 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2'>
                                    <InputLabel>Number of Wheels:</InputLabel>
                                    <Checkbox
                                        type="radio"
                                        value="2"
                                        checked={wheels === '2'}
                                        onChange={() => handleWheelsChange('2')}
                                    /> 2
                                    <Checkbox
                                        type="radio"
                                        value="4"
                                        checked={wheels === '4'}
                                        onChange={() => handleWheelsChange('4')}
                                    /> 4
                                </div>
                            </Box>
                        )}
                        {activeStep === 2 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2' style={{ width: '300px' }}>
                                    <InputLabel>Type of Vehicle:</InputLabel>
                                     <Select fullWidth onChange={(e) => handleVehicleTypeChange(e.target.value)} value={vehicleType}>
                                        <MenuItem value="">Select</MenuItem>
                                        {vehicleTypes.map((type, index) => (
                                            <MenuItem key={index} value={type.id}>
                                                {type.name || type.toString()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </Box>
                        )}
                        {activeStep === 3 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='mb-6 pr-2 pl-2' style={{ width: '300px' }}>
                                    <InputLabel>Model:</InputLabel>
                                    <Select fullWidth onChange={(e) => setModel(e.target.value)} value={model}>
                                    {vehicles.map((type, index) => (
                                            <MenuItem key={index} value={type.id}>
                                                {type.name || type.toString()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </Box>
                        )}
                        {activeStep === 4 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <div className='block mb-6 pr-2 pl-2 pt-10'>
                                    <InputLabel className='mb-6'>Date Range:</InputLabel>
                                    <div className='mb-6'>
                                        <Input
                                            type="date"
                                            value={dates.start}
                                            onChange={(e) => setDates({ ...dates, start: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='mb-6'>
                                        <Input
                                            type="date"
                                            value={dates.end}
                                            onChange={(e) => setDates({ ...dates, end: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </Box>
                        )}
                    </div>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ccc', padding: '8px' }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </Box>
            </Card>
        </Box>
    );
};

export default BookingForm;
