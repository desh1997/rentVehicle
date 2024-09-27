import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles'; // Adjust port number as necessary

export const fetchVehicles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error; // Rethrow the error for handling in the component
    }
};