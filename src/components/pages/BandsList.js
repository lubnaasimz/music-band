import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';

const BandsList = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBands();
  }, []);

  const fetchBands = async () => {
    try {
      const response = await fetch('https://music-band-1.onrender.com/api/bands/');
      if (!response.ok) throw new Error('Failed to fetch bands');
      const data = await response.json();
      setBands(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getGenreEmoji = (genre) => {
    const emojis = {
      'Rock': '🎸',
      'Jazz': '🎷',
      'Electronic': '🎧',
      'Indie': '🎤',
      'Pop': '🎵',
      'Classical': '🎼',
      'Country': '🤠',
      'Hip Hop': '🎤'
    };
    return emojis[genre] || '🎵';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="fade-in">
      <Link to="/" className="back-link">← Back to Shows</Link>
      
      <div className="hero-section">
        <h1 className="hero-title">🎸 All Bands</h1>
        <p className="hero-subtitle">Discover amazing artists and their music</p>
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{bands.length}</span>
            <span className="stat-label">Total Bands</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{[...new Set(bands.map(b => b.genre))].length}</span>
            <span className="stat-label">Genres</span>
          </div>
        </div>
      </div>

      {bands.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🎸</div>
          <h3>No bands found</h3>
          <p>Be the first to add a band!</p>
          <Link to="/create-band" className="btn" style={{ marginTop: '1rem' }}>
            Add New Band
          </Link>
        </div>
      ) : (
        <div className="shows-grid">
          {bands.map((band, index) => (
            <div key={band.id} className="show-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="show-card-content">
                <div className="show-header">
                  <h3 className="show-title">{band.name}</h3>
                  <div className="band-tag">
                    {getGenreEmoji(band.genre)} {band.genre}
                  </div>
                </div>
                
                <div className="show-date">
                  🗓️ Formed in {band.formed_year}
                </div>
                
                <p className="show-description">{band.description}</p>
                
                {band.musicians && band.musicians.length > 0 && (
                  <div className="show-venue">
                    <div className="venue-name">👥 Band Members</div>
                    <div className="venue-details">
                      {band.musicians.map(musician => musician.name).join(', ')}
                    </div>
                  </div>
                )}
                
                <div className="show-meta">
                  <div className="show-rating">
                    <span>📅</span>
                    <span>Created: {new Date(band.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Link to={`/bands/${band.id}`} className="btn">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BandsList;