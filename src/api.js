// API utility functions
const API_BASE_URL = 'http://127.0.0.1:5000';

export const api = {
  // Test backend connectivity
  testConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/shows`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Shows endpoints
  getShows: async () => {
    const response = await fetch(`${API_BASE_URL}/shows`);
    if (!response.ok) throw new Error('Failed to fetch shows');
    return response.json();
  },

  getShow: async (id) => {
    const response = await fetch(`${API_BASE_URL}/shows/${id}`);
    if (!response.ok) throw new Error('Failed to fetch show');
    return response.json();
  },

  // Reviews endpoints
  getReviews: async (showId) => {
    const response = await fetch(`${API_BASE_URL}/shows/${showId}/reviews`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  createReview: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  },

  updateReview: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to update review');
    return response.json();
  },

  deleteReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete review');
    return response.ok;
  }
};