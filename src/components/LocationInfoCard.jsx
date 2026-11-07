import { X, Plus, Check, MapPin, Tag } from 'lucide-react';

export default function LocationInfoCard({
  location,
  onClose,
  onAddToVisitList,
  isInVisitList,
}) {
  if (!location) return null;

  const getCategoryColor = () => {
    const category = location.category?.toLowerCase() || '';
    if (category.includes('dining')) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (category.includes('facility') || category.includes('facilities')) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-natural/10 text-natural border-natural/20';
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-3xl transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gradient-to-r from-forest/5 to-natural/5">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-forest flex-shrink-0" />
            <h3 className="text-xl font-bold text-forest">{location.name}</h3>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getCategoryColor()}`}>
            <Tag size={12} />
            {location.category}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-forest hover:bg-gray-100 transition-all duration-200 p-2 rounded-full flex-shrink-0"
          title="Close details"
        >
          <X size={20} />
        </button>
      </div>

      {/* Description */}
      <div className="px-6 py-5 border-b border-gray-100">
        <p className="text-sm text-gray-700 leading-relaxed font-medium">
          {location.description || 'No description available.'}
        </p>
      </div>

      {/* Action Button */}
      {onAddToVisitList && (
        <div className="px-6 py-5 bg-gradient-to-r from-natural/5 to-forest/5">
          <button
            onClick={() => onAddToVisitList(location)}
            className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105 ${
              isInVisitList
                ? 'bg-accent text-forest hover:bg-yellow-400'
                : 'bg-forest text-white hover:bg-natural'
            }`}
          >
            {isInVisitList ? (
              <>
                <Check size={18} />
                Added to Your List
              </>
            ) : (
              <>
                <Plus size={18} />
                Add to My Itinerary
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
