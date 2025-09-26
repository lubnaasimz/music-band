// Mock data for development
export const mockShows = [
  {
    id: 1,
    title: "Rock Legends Live",
    venue: "Madison Square Garden",
    date: "2024-02-15",
    description: "An electrifying night of classic rock with legendary performances that will shake the venue to its core.",
    genre: "Rock",
    bands: [
      { id: 1, name: "Thunder Strike" },
      { id: 2, name: "Electric Dreams" }
    ]
  },
  {
    id: 2,
    title: "Jazz Under the Stars",
    venue: "Blue Note",
    date: "2024-02-20",
    description: "Smooth jazz melodies under the moonlight with world-class musicians creating magical moments.",
    genre: "Jazz",
    bands: [
      { id: 3, name: "Midnight Ensemble" }
    ]
  },
  {
    id: 3,
    title: "Electronic Pulse",
    venue: "Warehouse District",
    date: "2024-02-25",
    description: "Cutting-edge electronic music with mind-bending visuals and bass that you'll feel in your soul.",
    genre: "Electronic",
    bands: [
      { id: 4, name: "Neon Circuits" },
      { id: 5, name: "Digital Waves" }
    ]
  },
  {
    id: 4,
    title: "Indie Showcase",
    venue: "The Underground",
    date: "2024-03-01",
    description: "Discover the next big indie acts in an intimate setting with raw, authentic performances.",
    genre: "Indie",
    bands: [
      { id: 6, name: "Velvet Shadows" }
    ]
  }
];

export const mockReviews = {
  1: [
    {
      id: 1,
      rating: 5,
      comment: "Absolutely incredible! The energy was off the charts and the sound quality was perfect.",
      user_name: "Rock Fan",
      show_id: 1
    },
    {
      id: 2,
      rating: 4,
      comment: "Great show, loved Thunder Strike's performance. Could have been a bit longer though.",
      user_name: "Music Lover",
      show_id: 1
    }
  ],
  2: [
    {
      id: 3,
      rating: 5,
      comment: "Pure magic! The atmosphere was perfect and the musicians were world-class.",
      user_name: "Jazz Enthusiast",
      show_id: 2
    }
  ],
  3: [],
  4: [
    {
      id: 4,
      rating: 4,
      comment: "Loved discovering new bands. Great venue for indie music!",
      user_name: "Indie Explorer",
      show_id: 4
    }
  ]
};