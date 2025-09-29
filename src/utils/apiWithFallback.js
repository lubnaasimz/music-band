// Bulletproof API with fallback data
const API_BASE_URL = 'https://music-band-1.onrender.com';

// Mock data as fallback
const mockShows = [
  {
    id: 1,
    title: "Rock Legends Live",
    date: "2024-02-15",
    time: "20:00",
    ticket_price: 75.00,
    description: "An electrifying night of classic rock with legendary performances.",
    venue: { id: 1, name: "Madison Square Garden", city: "New York", capacity: 20000 },
    bands: [{ id: 1, name: "Thunder Strike", genre: "Rock" }],
    reviews: [{ id: 1, rating: 5, comment: "Amazing show!", user: { username: "musicfan" } }],
    created_at: "2024-01-01T00:00:00"
  },
  {
    id: 2,
    title: "Jazz Under the Stars",
    date: "2024-02-20",
    time: "19:30",
    ticket_price: 45.00,
    description: "Smooth jazz melodies under the moonlight with world-class musicians.",
    venue: { id: 2, name: "Blue Note", city: "New York", capacity: 300 },
    bands: [{ id: 2, name: "Midnight Ensemble", genre: "Jazz" }],
    reviews: [{ id: 2, rating: 5, comment: "Pure magic!", user: { username: "jazzlover" } }],
    created_at: "2024-01-02T00:00:00"
  },
  {
    id: 3,
    title: "Electronic Pulse",
    date: "2024-02-25",
    time: "21:00",
    ticket_price: 60.00,
    description: "Cutting-edge electronic music with mind-bending visuals.",
    venue: { id: 3, name: "Warehouse District", city: "Los Angeles", capacity: 1500 },
    bands: [{ id: 3, name: "Neon Circuits", genre: "Electronic" }],
    reviews: [],
    created_at: "2024-01-03T00:00:00"
  }
];

const mockBands = [
  {
    id: 1,
    name: "Thunder Strike",
    genre: "Rock",
    description: "High-energy rock band",
    formed_year: 2018,
    musicians: [],
    created_at: "2024-01-01T00:00:00"
  },
  {
    id: 2,
    name: "Midnight Ensemble",
    genre: "Jazz",
    description: "Smooth jazz collective",
    formed_year: 2015,
    musicians: [],
    created_at: "2024-01-02T00:00:00"
  },
  {
    id: 3,
    name: "Neon Circuits",
    genre: "Electronic",
    description: "Electronic music pioneers",
    formed_year: 2020,
    musicians: [],
    created_at: "2024-01-03T00:00:00"
  }
];

// Store for created bands
let createdBands = JSON.parse(localStorage.getItem('createdBands') || '[]');

const apiWithFallback = {
  getShows: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shows/`);
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.log('Using fallback data for shows');
      return mockShows;
    }
  },

  getBands: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bands/`);
      if (!response.ok) throw new Error('Backend unavailable');
      const backendBands = await response.json();
      return [...mockBands, ...createdBands, ...backendBands];
    } catch (error) {
      console.log('Using fallback data for bands');
      return [...mockBands, ...createdBands];
    }
  },

  createBand: async (bandData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bands/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bandData),
      });
      if (!response.ok) throw new Error('Backend unavailable');
      return await response.json();
    } catch (error) {
      console.log('Using local storage for band creation');
      const newBand = {
        id: Date.now(),
        ...bandData,
        musicians: [],
        created_at: new Date().toISOString()
      };
      createdBands.push(newBand);
      localStorage.setItem('createdBands', JSON.stringify(createdBands));
      return newBand;
    }
  }
};

export default apiWithFallback;