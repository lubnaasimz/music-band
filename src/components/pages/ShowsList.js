import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchFilter from '../forms/SearchFilter';
import LoadingSpinner from '../common/LoadingSpinner';
import apiWithFallback from '../../utils/apiWithFallback';

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
      const data = await apiWithFallback.getShows();
      setShows(data);
      setError(null);
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
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-16 mb-12">
        <h1 className="text-6xl font-black text-white mb-4">
          <span className="text-7xl">🎵</span> BandReviews
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Discover & Review Incredible Live Music Experiences
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{shows.length}</div>
            <div className="text-white/70 text-sm uppercase tracking-wide">Live Shows</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{getTotalReviews()}</div>
            <div className="text-white/70 text-sm uppercase tracking-wide">Reviews</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{genres.length}</div>
            <div className="text-white/70 text-sm uppercase tracking-wide">Genres</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{shows.flatMap(s => s.bands).length}</div>
            <div className="text-white/70 text-sm uppercase tracking-wide">Artists</div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
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
      
      {/* Shows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredAndSortedShows.map((show, index) => {
          const rating = getShowRating(show);
          const reviewCount = show.reviews?.length || 0;
          
          return (
            <Link key={show.id} to={`/shows/${show.id}`} className="group">
              <div className="card p-6 h-full hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {show.title}
                  </h3>
                  {show.ticket_price && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${show.ticket_price}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="mr-2">📍</span>
                  <span className="font-medium">{show.venue?.name}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="mr-2">📅</span>
                  <span>{new Date(show.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  {show.time && <span className="ml-2 text-blue-600 font-medium">at {show.time}</span>}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{show.description}</p>
                
                {/* Bands */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {show.bands.slice(0, 3).map((band, i) => (
                    <span key={band.id} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {getGenreEmoji(band.genre)} {band.name}
                    </span>
                  ))}
                  {show.bands.length > 3 && (
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      +{show.bands.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Meta */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  {rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-gray-900">{rating}</span>
                      <span className="text-gray-500 text-sm">({reviewCount})</span>
                    </div>
                  )}
                  
                  {show.venue?.capacity && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-1">🎫</span>
                      <span>{show.venue.capacity.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* No Results */}
      {filteredAndSortedShows.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">No shows found</h3>
          <p className="text-white/70">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ShowsList;