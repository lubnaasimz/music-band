import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from '../forms/SearchFilter';
import LoadingSpinner from '../common/LoadingSpinner';

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://music-band-jekc.onrender.com/api/shows/');
      if (!response.ok) throw new Error('Failed to fetch shows');
      const data = await response.json();
      setShows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedShows = useMemo(() => {
    let filtered = shows.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           show.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || show.bands.some(band => band.genre === selectedGenre);
      const matchesVenue = !selectedVenue || show.venue?.name === selectedVenue;
      
      return matchesSearch && matchesGenre && matchesVenue;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return (a.ticket_price || 0) - (b.ticket_price || 0);
        default:
          return 0;
      }
    });
  }, [shows, searchTerm, selectedGenre, selectedVenue, sortBy]);

  const genres = useMemo(() => {
    const allGenres = shows.flatMap(show => show.bands.map(band => band.genre));
    return [...new Set(allGenres)].filter(Boolean);
  }, [shows]);

  const venues = useMemo(() => {
    const allVenues = shows.map(show => show.venue?.name).filter(Boolean);
    return [...new Set(allVenues)];
  }, [shows]);

  const getShowRating = (show) => {
    if (!show.reviews || show.reviews.length === 0) return 0;
    const avg = show.reviews.reduce((sum, review) => sum + review.rating, 0) / show.reviews.length;
    return Math.round(avg * 10) / 10;
  };

  const getTotalReviews = () => {
    return shows.reduce((total, show) => total + (show.reviews?.length || 0), 0);
  };

  const getGenreEmoji = (genre) => {
    const emojis = {
      'Rock': '🎸',
      'Jazz': '🎷',
      'Electronic': '🎧',
      'Indie': '🎤',
      'Pop': '🎵',
      'Classical': '🎼'
    };
    return emojis[genre] || '🎵';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="floating-elements">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="floating-note"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {['🎵', '🎶', '🎼', '🎤', '🎸', '🎷', '🎹', '🥁'][i]}
          </div>
        ))}
      </div>

      <div className="hero-section">
        <h1 className="hero-title">🎵 BandReviews</h1>
        <p className="hero-subtitle">Discover & Review Incredible Live Music Experiences</p>
        
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{shows.length}</span>
            <span className="stat-label">Live Shows</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getTotalReviews()}</span>
            <span className="stat-label">Reviews</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{genres.length}</span>
            <span className="stat-label">Genres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{shows.flatMap(s => s.bands).length}</span>
            <span className="stat-label">Artists</span>
          </div>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genres={genres}
        venues={venues}
        totalShows={shows.length}
        filteredCount={filteredAndSortedShows.length}
      />
      
      <div className="shows-grid">
        {filteredAndSortedShows.map((show, index) => {
          const rating = getShowRating(show);
          const reviewCount = show.reviews?.length || 0;
          
          return (
            <Link key={show.id} to={`/shows/${show.id}`} style={{ textDecoration: 'none' }}>
              <div className="show-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="show-card-content">
                  <div className="show-header">
                    <div className="show-title">{show.title}</div>
                    {show.ticket_price && (
                      <div className="show-price">${show.ticket_price}</div>
                    )}
                  </div>
                  
                  <div className="show-venue">
                    <span>📍</span> {show.venue?.name}
                  </div>
                  
                  <div className="show-date">
                    <span>📅</span> {new Date(show.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    {show.time && <span className="show-time"> at {show.time}</span>}
                  </div>
                  
                  <div className="show-description">{show.description}</div>
                  
                  <div className="show-bands">
                    {show.bands.slice(0, 3).map((band, i) => (
                      <span key={band.id} className="band-tag">
                        {getGenreEmoji(band.genre)} {band.name}
                      </span>
                    ))}
                    {show.bands.length > 3 && (
                      <span className="band-tag more">+{show.bands.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="show-meta">
                    {rating > 0 && (
                      <div className="show-rating">
                        <span>⭐</span>
                        <span>{rating}</span>
                        <span>({reviewCount})</span>
                      </div>
                    )}
                    
                    <div className="show-venue-capacity">
                      {show.venue?.capacity && (
                        <span>🎫 {show.venue.capacity.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {filteredAndSortedShows.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No shows found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </>
  );
};

export default ShowsList;