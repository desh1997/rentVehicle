import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import BookingForm from './pages/BookingForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookingForm  />} />
            </Routes>
        </Router>
    );
}

export default App;

