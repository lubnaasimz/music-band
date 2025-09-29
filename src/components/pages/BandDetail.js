import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import apiWithFallback from '../../utils/apiWithFallback';

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
      const data = await apiWithFallback.getBand(id);
      setBand(data);
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

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">Error: {error}</div>;
  if (!band) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">Band not found</div>;

  return (
    <div className="animate-fade-in">
      <Link to="/bands" className="inline-flex items-center space-x-2 text-white hover:text-blue-600 transition-colors mb-8">
        <span>←</span>
        <span>Back to Bands</span>
      </Link>
      
      {/* Hero Section */}
      <div className="card p-0 overflow-hidden mb-12">
        <div 
          className="p-12 text-white relative overflow-hidden"
          style={{ background: getGenreColor(band.genre) }}
        >
          <div className="absolute top-0 right-0 text-9xl opacity-10">
            {getGenreEmoji(band.genre)}
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-black mb-4">{band.name}</h1>
            <div className="flex justify-center items-center space-x-6 mb-6">
              <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-medium">
                {getGenreEmoji(band.genre)} {band.genre}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-lg font-medium">
                🗓️ Formed {band.formed_year}
              </span>
            </div>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              {band.description}
            </p>
          </div>
        </div>
      </div>

      {/* Band Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📖</span>
              About {band.name}
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="text-lg leading-relaxed">{band.description}</p>
            </div>
            
            {/* Timeline */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">⏰</span>
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Band Formation</div>
                    <div className="text-gray-600">{band.formed_year} - {band.name} was formed</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Added to Platform</div>
                    <div className="text-gray-600">{new Date(band.created_at).toLocaleDateString()} - Joined BandReviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-3">📊</span>
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Genre</span>
                <span className="font-semibold text-gray-900">{getGenreEmoji(band.genre)} {band.genre}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Formed</span>
                <span className="font-semibold text-gray-900">{band.formed_year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Years Active</span>
                <span className="font-semibold text-gray-900">{new Date().getFullYear() - band.formed_year} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Members</span>
                <span className="font-semibold text-gray-900">{band.musicians?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Band Members */}
          {band.musicians && band.musicians.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">👥</span>
                Band Members
              </h3>
              <div className="space-y-3">
                {band.musicians.map(musician => (
                  <div key={musician.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {musician.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{musician.name}</div>
                      <div className="text-sm text-gray-600">{musician.instrument}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-3">⚡</span>
              Actions
            </h3>
            <div className="space-y-3">
              <Link 
                to="/create-band" 
                className="w-full btn-primary text-center block"
              >
                Add Another Band
              </Link>
              <Link 
                to="/" 
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center block"
              >
                View Shows
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandDetail;