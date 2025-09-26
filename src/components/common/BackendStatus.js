import React, { useState, useEffect } from 'react';

const BackendStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch('https://music-band-jekc.onrender.com/api/shows/');
      setIsConnected(response.ok);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '10px 15px',
      borderRadius: '25px',
      background: isConnected ? '#48bb78' : '#f56565',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      {isConnected ? '🟢 Backend Connected' : '🔴 Backend Offline'}
    </div>
  );
};

export default BackendStatus;