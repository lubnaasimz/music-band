import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVenueDetails();
  }, [id]);

  const fetchVenueDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/venues/${id}`);
      if (!response.ok) throw new Error('Failed to fetch venue details');
      const data = await response.json();
      setVenue(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!venue) return <div className="error">Venue not found</div>;

  return (
    <>
      <Link to="/" className="back-link">← Back to Shows</Link>
      
      <div className="hero-section">
        <h1 className="hero-title">🏛️ {venue.name}</h1>
        <p className="hero-subtitle">{venue.city} • Capacity: {venue.capacity?.toLocaleString()}</p>
      </div>

      <div className="show-card">
        <div className="show-card-content">
          <div className="venue-info">
            <div className="info-item">
              <strong>📍 Address:</strong> {venue.address}
            </div>
            <div className="info-item">
              <strong>🏙️ City:</strong> {venue.city}
            </div>
            <div className="info-item">
              <strong>🎫 Capacity:</strong> {venue.capacity?.toLocaleString()} people
            </div>
            {venue.phone && (
              <div className="info-item">
                <strong>📞 Phone:</strong> {venue.phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueDetail;