import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ShowsList from './components/pages/ShowsList';
import ShowDetail from './components/pages/ShowDetail';
import BandDetail from './components/pages/BandDetail';
import VenueDetail from './components/pages/VenueDetail';
import BandsList from './components/pages/BandsList';
import CreateBand from './components/forms/CreateBand';
import BackendStatus from './components/common/BackendStatus';
import ParticleBackground from './components/common/ParticleBackground';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <ParticleBackground />
      <Navbar />
      <BackendStatus />
      
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ShowsList />} />
            <Route path="/shows/:id" element={<ShowDetail />} />
            <Route path="/bands" element={<BandsList />} />
            <Route path="/bands/:id" element={<BandDetail />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/create-band" element={<CreateBand />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;