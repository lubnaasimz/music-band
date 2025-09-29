import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import apiWithFallback from '../../utils/apiWithFallback';

const BandsList = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchBands();
  }, []);

  const fetchBands = async () => {
    try {
      const data = await apiWithFallback.getBands();
      setBands(data);
      setError(null);
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

  const getGenreColor = (genre) => {
    const colors = {
      'Rock': 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      'Jazz': 'linear-gradient(135deg, #feca57, #ff9ff3)',
      'Electronic': 'linear-gradient(135deg, #48dbfb, #0abde3)',
      'Indie': 'linear-gradient(135deg, #ff9ff3, #f368e0)',
      'Pop': 'linear-gradient(135deg, #ff6348, #ff4757)',
      'Classical': 'linear-gradient(135deg, #a55eea, #8c7ae6)',
      'Country': 'linear-gradient(135deg, #26de81, #20bf6b)',
      'Hip Hop': 'linear-gradient(135deg, #fd79a8, #e84393)'
    };
    return colors[genre] || 'linear-gradient(135deg, #667eea, #764ba2)';
  };

  const filteredBands = bands.filter(band => {
    const matchesSearch = band.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         band.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || band.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = [...new Set(bands.map(band => band.genre))].filter(Boolean);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">Error: {error}</div>;

  return (
    <div className="animate-fade-in">
      <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-600 transition-colors mb-8">
        <span>←</span>
        <span>Back to Shows</span>
      </Link>
      
      {/* Hero Section */}
      <div className="text-center py-16 mb-12">
        <h1 className="text-6xl font-black text-white mb-4">
          <span className="text-7xl">🎸</span> All Bands
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Discover amazing artists and their incredible music journeys
        </p>
        
        {/* Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{bands.length}</div>
            <div className="text-white text-sm font-medium">Total Bands</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{genres.length}</div>
            <div className="text-white text-sm font-medium">Genres</div>
          </div>
          <div className="glass p-6 text-center">
            <div className="text-3xl font-bold text-white">{filteredBands.length}</div>
            <div className="text-white text-sm font-medium">Showing</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="glass p-6 mb-12">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="🔍 Search bands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 text-white placeholder-white/70 focus:bg-white/30"
            />
          </div>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-6 py-3 rounded-xl border-0 bg-white/20 text-white focus:bg-white/30"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre} className="text-gray-900">
                {getGenreEmoji(genre)} {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bands Grid */}
      {filteredBands.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎸</div>
          <h3 className="text-2xl font-bold text-white mb-2">No bands found</h3>
          <p className="text-white mb-6">Be the first to add a band!</p>
          <Link to="/create-band" className="btn-primary">
            Add New Band
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBands.map((band, index) => (
            <div key={band.id} className="group">
              <div className="card p-0 overflow-hidden hover:scale-105 transition-transform duration-300">
                {/* Band Header with Gradient */}
                <div 
                  className="p-6 text-white relative overflow-hidden"
                  style={{ background: getGenreColor(band.genre) }}
                >
                  <div className="absolute top-0 right-0 text-6xl opacity-20">
                    {getGenreEmoji(band.genre)}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform">
                      {band.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {getGenreEmoji(band.genre)} {band.genre}
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        🗓️ {band.formed_year}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Band Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-3">{band.description}</p>
                  
                  {band.musicians && band.musicians.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">👥 Band Members</h4>
                      <div className="flex flex-wrap gap-2">
                        {band.musicians.map(musician => (
                          <span key={musician.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {musician.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      📅 Added {new Date(band.created_at).toLocaleDateString()}
                    </div>
                    <Link 
                      to={`/bands/${band.id}`} 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BandsList;