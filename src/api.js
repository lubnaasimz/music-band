// API utility functions
const API_BASE_URL = 'http://127.0.0.1:5000';

export const api = {
  // Test backend connectivity
  testConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shows/`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Shows endpoints
  getShows: async () => {
    const response = await fetch(`${API_BASE_URL}/api/shows/`);
    if (!response.ok) throw new Error('Failed to fetch shows');
    return response.json();
  },

  getShow: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/shows/${id}`);
    if (!response.ok) throw new Error('Failed to fetch show');
    return response.json();
  },

  // Reviews endpoints
  getReviews: async () => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  },

  createReview: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to create review');
    return response.json();
  },

  updateReview: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to update review');
    return response.json();
  },

  deleteReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete review');
    return response.ok;
  },

  // Bands endpoints
  getBands: async () => {
    const response = await fetch(`${API_BASE_URL}/api/bands/`);
    if (!response.ok) throw new Error('Failed to fetch bands');
    return response.json();
  },

  getBand: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/bands/${id}`);
    if (!response.ok) throw new Error('Failed to fetch band');
    return response.json();
  },

  createBand: async (bandData) => {
    const response = await fetch(`${API_BASE_URL}/api/bands/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bandData),
    });
    if (!response.ok) throw new Error('Failed to create band');
    return response.json();
  },

  // Venues endpoints
  getVenues: async () => {
    const response = await fetch(`${API_BASE_URL}/api/venues/`);
    if (!response.ok) throw new Error('Failed to fetch venues');
    return response.json();
  },

  getVenue: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/venues/${id}`);
    if (!response.ok) throw new Error('Failed to fetch venue');
    return response.json();
  }
};