import React, { useState, useEffect } from 'react';
import { fetchVehicles } from '../api'; // Import the fetchVehicles function

const BookingForm = () => {
    const [name, setName] = useState({ first: '', last: '' });
    const [wheels, setWheels] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [model, setModel] = useState('');
    const [dates, setDates] = useState({ start: '', end: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            name,
            wheels,
            vehicleType,
            model,
            dates
        });
    };

    if (loading) return <div>Loading vehicles...</div>;
    if (error) return <div>Error loading vehicles: {error}</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input 
                    type="text" 
                    value={name.first} 
                    onChange={(e) => setName({ ...name, first: e.target.value })} 
                    required 
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input 
                    type="text" 
                    value={name.last} 
                    onChange={(e) => setName({ ...name, last: e.target.value })} 
                    required 
                />
            </div>
            <div>
                <label>Number of Wheels:</label>
                <input 
                    type="radio" 
                    value="2" 
                    checked={wheels === '2'} 
                    onChange={() => setWheels('2')} 
                /> 2
                <input 
                    type="radio" 
                    value="4" 
                    checked={wheels === '4'} 
                    onChange={() => setWheels('4')} 
                /> 4
            </div>
            <div>
                <label>Type of Vehicle:</label>
                <select onChange={(e) => setVehicleType(e.target.value)} value={vehicleType}>
                    <option value="">Select</option>
                    {vehicles.filter(v => v.wheels.toString() === wheels).map(v => (
                        <option key={v.id} value={v.type}>{v.type}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Model:</label>
                <select onChange={(e) => setModel(e.target.value)} value={model}>
                    <option value="">Select</option>
                    {vehicles.filter(v => v.type === vehicleType).map(v => (
                        <option key={v.id} value={v.model}>{v.model}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Date Range:</label>
                <input 
                    type="date" 
                    value={dates.start} 
                    onChange={(e) => setDates({ ...dates, start: e.target.value })} 
                    required 
                />
                <input 
                    type="date" 
                    value={dates.end} 
                    onChange={(e) => setDates({ ...dates, end: e.target.value })} 
                    required 
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookingForm;
