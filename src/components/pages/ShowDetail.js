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
      const response = await fetch(`https://music-band-jekc.onrender.com/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete review');
      
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      setError(error.message);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) return <div className="loading">Loading show details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!show) return <div className="error">Show not found</div>;

  return (
    <>
      <Link to="/" className="back-link">← Back to Shows</Link>
      
      <div className="header">
        <h1>{show.title || show.name}</h1>
        <p>📍 {show.venue?.name || show.venue} • 📅 {new Date(show.date).toLocaleDateString()}</p>
      </div>

      <div className="show-card" style={{ marginBottom: '30px' }}>
        <div className="show-description">{show.description}</div>
        <div className="show-genre">{show.genre}</div>
        {show.bands && show.bands.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <strong>Bands: </strong>
            {show.bands.map((band, index) => (
              <span key={band.id}>
                {band.name}
                {index < show.bands.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="reviews-section">
        <h2>Reviews ({reviews.length})</h2>
        
        <ReviewForm 
          showId={id} 
          onReviewAdded={handleReviewAdded}
        />

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this show!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-rating">{renderStars(review.rating)}</div>
              <div className="review-comment">{review.comment}</div>
              <div className="review-author">— {review.user?.username || review.user_name || 'Anonymous'}</div>
              <div style={{ marginTop: '10px' }}>
                <button 
                  className="btn" 
                  style={{ marginRight: '10px', fontSize: '0.8rem', padding: '8px 16px' }}
                  onClick={() => handleReviewUpdated(review)}
                >
                  Edit
                </button>
                <button 
                  className="btn" 
                  style={{ background: '#e53e3e', fontSize: '0.8rem', padding: '8px 16px' }}
                  onClick={() => handleReviewDeleted(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ShowDetail;