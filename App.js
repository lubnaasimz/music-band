import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShowsList from './components/ShowsList';
import ShowDetail from './components/ShowDetail';
import BandDetail from './components/BandDetail';
import VenueDetail from './components/VenueDetail';
import CreateBand from './components/CreateBand';
import BackendStatus from './components/BackendStatus';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="app-container">
      <ParticleBackground />
      <Navbar />
      <BackendStatus />
      
      <div className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<ShowsList />} />
            <Route path="/shows/:id" element={<ShowDetail />} />
            <Route path="/bands/:id" element={<BandDetail />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/create-band" element={<CreateBand />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;