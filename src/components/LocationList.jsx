import { ChevronRight, MapPin } from 'lucide-react';

export default function LocationList({ locations, selectedLocationId, onLocationSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-100 bg-gradient-to-r from-forest to-natural">
        <h3 className="font-bold text-lg text-white mb-1">Explore Locations</h3>
        <p className="text-white/90 text-sm font-medium">{locations.length} locations available</p>
      </div>

      {/* Locations List */}
      <div className="flex-1 overflow-y-auto">
        {locations.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => onLocationSelect(location)}
                className={`w-full text-left px-5 py-4 transition-all duration-200 hover:bg-natural/5 group ${
                  selectedLocationId === location.id
                    ? 'bg-natural/10 border-l-4 border-l-forest'
                    : 'hover:bg-light-bg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <MapPin size={16} className="text-forest flex-shrink-0" />
                      <p className="font-bold text-forest group-hover:text-natural transition-colors text-sm">
                        {location.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 capitalize ml-7">{location.category}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-forest transition-all duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 flex flex-col items-center justify-center h-full">
            <MapPin size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-semibold text-gray-600">No locations found</p>
            <p className="text-sm mt-2 text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
