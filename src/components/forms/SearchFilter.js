import React from 'react';

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedVenue,
  setSelectedVenue,
  sortBy,
  setSortBy,
  genres,
  venues,
  totalShows,
  filteredCount
}) => {
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedVenue('');
    setSortBy('date');
  };

  return (
    <div className="search-filter-section">
      <div className="filter-header">
        <h3>Find Your Perfect Show</h3>
        <div className="results-count">
          Showing {filteredCount} of {totalShows} shows
        </div>
      </div>

      <div className="filter-controls">
        <div className="search-box">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search shows, descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="filter-dropdowns">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="filter-select"
          >
            <option value="">All Venues</option>
            {venues.map(venue => (
              <option key={venue} value={venue}>{venue}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;