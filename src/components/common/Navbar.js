import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
            <span className="text-2xl">🎵</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BandReviews
            </span>
          </Link>
          
          <div className="flex space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Shows
            </Link>
            <Link 
              to="/bands" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/bands') 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Bands
            </Link>
            <Link 
              to="/create-band" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/create-band') 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-md hover:shadow-lg'
              }`}
            >
              Add Band
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;