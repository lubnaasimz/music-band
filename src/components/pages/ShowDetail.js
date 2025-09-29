import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewForm from '../forms/ReviewForm';
import apiWithFallback from '../../utils/apiWithFallback';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShowDetails();
  }, [id]);

  const fetchShowDetails = async () => {
    try {
      const showData = await apiWithFallback.getShow(id);
      setShow(showData);
      setReviews(showData.reviews || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map(review => 
      review.id === updatedReview.id ? updatedReview : review
    ));
  };

  const handleReviewDeleted = async (reviewId) => {
    try {
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
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

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
  
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">Error: {error}</div>;
  if (!show) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">Show not found</div>;

  return (
    <div className="animate-fade-in">
      <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-600 transition-colors mb-8">
        <span>←</span>
        <span>Back to Shows</span>
      </Link>
      
      {/* Hero Section */}
      <div className="card p-0 overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-white">
          <div className="text-center">
            <h1 className="text-5xl font-black mb-4">{show.title || show.name}</h1>
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="mr-2">📍</span>
                {show.venue?.name || show.venue}
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="mr-2">📅</span>
                {new Date(show.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              {show.time && (
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <span className="mr-2">🕐</span>
                  {show.time}
                </div>
              )}
            </div>
            {show.ticket_price && (
              <div className="text-2xl font-bold">
                <span className="bg-green-500 px-4 py-2 rounded-full">
                  💰 ${show.ticket_price}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Show Description */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-3">📝</span>
              About This Show
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{show.description}</p>
          </div>

          {/* Performing Bands */}
          {show.bands && show.bands.length > 0 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🎸</span>
                Performing Bands
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {show.bands.map((band) => (
                  <Link key={band.id} to={`/bands/${band.id}`} className="group">
                    <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getGenreEmoji(band.genre)}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {band.name}
                          </h3>
                          <p className="text-sm text-gray-600">{band.genre}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="mr-3">⭐</span>
                Reviews ({reviews.length})
              </h2>
              {reviews.length > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-500">{getAverageRating()}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              )}
            </div>
            
            <ReviewForm 
              showId={id} 
              onReviewAdded={handleReviewAdded}
            />

            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">💭</div>
                <p>No reviews yet. Be the first to review this show!</p>
              </div>
            ) : (
              <div className="space-y-4 mt-8">
                {reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-xl mb-1">{renderStars(review.rating)}</div>
                        <div className="font-semibold text-gray-900">
                          {review.user?.username || review.user_name || 'Anonymous'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    <div className="flex space-x-2 mt-4">
                      <button 
                        className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg transition-colors"
                        onClick={() => handleReviewUpdated(review)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg transition-colors"
                        onClick={() => handleReviewDeleted(review.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Venue Info */}
          {show.venue && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🏛️</span>
                Venue Details
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-900">{show.venue.name}</div>
                  <div className="text-gray-600">{show.venue.city}</div>
                </div>
                {show.venue.capacity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-semibold">{show.venue.capacity.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Show Stats */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-3">📊</span>
              Show Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Reviews</span>
                <span className="font-semibold">{reviews.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Rating</span>
                <span className="font-semibold">{getAverageRating()}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bands</span>
                <span className="font-semibold">{show.bands?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-3">⚡</span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/bands" className="w-full btn-primary text-center block">
                View All Bands
              </Link>
              <Link to="/create-band" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-center block">
                Add New Band
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;