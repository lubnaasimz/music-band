import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🎵 BandReviews
        </Link>
        
        <div className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Shows
          </Link>
          <Link 
            to="/bands" 
            className={`nav-link ${isActive('/bands') ? 'active' : ''}`}
          >
            Bands
          </Link>
          <Link 
            to="/create-band" 
            className={`nav-link ${isActive('/create-band') ? 'active' : ''}`}
          >
            Add Band
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;