import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ShowsList from './components/pages/ShowsList';
import ShowDetail from './components/pages/ShowDetail';
import BandDetail from './components/pages/BandDetail';
import VenueDetail from './components/pages/VenueDetail';
import CreateBand from './components/forms/CreateBand';
import BackendStatus from './components/common/BackendStatus';
import ParticleBackground from './components/common/ParticleBackground';
import './styles/professional.css';
import './styles/enhanced.css';

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