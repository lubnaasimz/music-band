import React, { useState, useEffect } from 'react';
import apiWithFallback from '../../utils/apiWithFallback';

const BackendStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('https://music-band-1.onrender.com/', { 
        method: 'HEAD',
        timeout: 5000 
      });
      const online = response.ok;
      setIsOnline(online);
      setIsVisible(!online); // Only show when offline
    } catch (error) {
      setIsOnline(false);
      setIsVisible(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in">
      <div className={`px-4 py-2 rounded-xl font-medium text-sm shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-yellow-500 text-white'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-200' : 'bg-yellow-200'
          } animate-pulse`}></div>
          <span>
            {isOnline ? '🟢 Backend Online' : '🟡 Using Offline Mode'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;