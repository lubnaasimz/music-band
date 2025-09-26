import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="loading-text">
          <span className="loading-emoji">🎵</span>
          Loading amazing shows...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;