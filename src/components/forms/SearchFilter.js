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

  const hasActiveFilters = searchTerm || selectedGenre || selectedVenue || sortBy !== 'date';

  return (
    <div className="glass p-6 mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="mr-3">🔍</span>
          Search & Filter
        </h3>
        <div className="bg-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
          Showing {filteredCount} of {totalShows} shows
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border-0 bg-white/20 text-white placeholder-white/70 focus:bg-white/30 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-3 rounded-xl border-0 bg-white/20 text-white focus:bg-white/30 transition-all duration-200"
        >
          <option value="" className="text-gray-900">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre} className="text-gray-900">
              {genre}
            </option>
          ))}
        </select>

        {/* Venue Filter */}
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="px-4 py-3 rounded-xl border-0 bg-white/20 text-white focus:bg-white/30 transition-all duration-200"
        >
          <option value="" className="text-gray-900">All Venues</option>
          {venues.map(venue => (
            <option key={venue} value={venue} className="text-gray-900">
              {venue}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl border-0 bg-white/20 text-white focus:bg-white/30 transition-all duration-200"
        >
          <option value="date" className="text-gray-900">📅 Sort by Date</option>
          <option value="title" className="text-gray-900">🔤 Sort by Title</option>
          <option value="price" className="text-gray-900">💰 Sort by Price</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-center">
          <button
            onClick={clearFilters}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;