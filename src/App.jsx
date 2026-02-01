import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Inventory from './pages/Inventory';
import CarDetails from './pages/CarDetails';
import Services from './pages/Services'; 
import Admin from './pages/Admin'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:id" element={<CarDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<Services />} /> {/* <--- 2. Make sure this is here */}
      </Routes>
    </div>
  );
}

export default App;