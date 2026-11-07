import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ locations, onLocationSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = locations.filter(loc =>
        loc.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelectLocation = (location) => {
    onLocationSelect(location);
    setSearchTerm('');
    setResults([]);
    onClose();
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-3 items-center">
        {/* Search Icon - In Front */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-natural/10 border-2 border-natural/20">
            <Search size={20} className="text-natural" />
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search attractions, gardens, dining..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-natural focus:border-transparent transition-all text-gray-700 font-medium shadow-sm hover:shadow-md"
          />
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setResults([]);
            }}
            className="flex-shrink-0 p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            title="Clear search"
          >
            <X size={20} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelectLocation(location)}
              className="w-full text-left px-6 py-3 hover:bg-light-bg border-b border-gray-100 last:border-b-0 transition-all duration-200 group"
            >
              <p className="font-bold text-forest group-hover:text-natural transition-colors">
                {location.name}
              </p>
              <p className="text-xs text-gray-600 capitalize mt-0.5">{location.category}</p>
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchTerm && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white border-2 border-gray-200 rounded-lg p-6 shadow-xl z-50 text-center">
          <p className="text-gray-600 font-medium">No locations found for "{searchTerm}"</p>
          <p className="text-sm text-gray-400 mt-2">Try searching for attractions, gardens, or facilities</p>
        </div>
      )}
    </div>
  );
}
