import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const BandDetail = () => {
  const { id } = useParams();
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBandDetails();
  }, [id]);

  const fetchBandDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/bands/${id}`);
      if (!response.ok) throw new Error('Failed to fetch band details');
      const data = await response.json();
      setBand(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!band) return <div className="error">Band not found</div>;

  return (
    <>
      <Link to="/" className="back-link">← Back to Shows</Link>
      
      <div className="hero-section">
        <h1 className="hero-title">🎸 {band.name}</h1>
        <p className="hero-subtitle">{band.genre} • Formed {band.formed_year}</p>
      </div>

      <div className="show-card">
        <div className="show-card-content">
          <div className="show-description">{band.description}</div>
          
          {band.musicians && band.musicians.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Band Members</h3>
              <div className="show-bands">
                {band.musicians.map(musician => (
                  <span key={musician.id} className="band-tag">
                    🎵 {musician.name} - {musician.instrument}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BandDetail;