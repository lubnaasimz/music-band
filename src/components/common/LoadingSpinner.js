import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-64 py-16">
      {/* Animated Music Notes */}
      <div className="relative mb-8">
        <div className="flex space-x-2">
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>🎵</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '150ms' }}>🎶</div>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '300ms' }}>🎵</div>
        </div>
      </div>
      
      {/* Spinning Vinyl Record */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Loading...</h3>
        <p className="text-white/70">Getting your music ready 🎸</p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;