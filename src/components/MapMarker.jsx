import { MapPin, Coffee, Bath } from 'lucide-react';

export default function MapMarker({ location, isSelected, onSelect, type }) {
  const getMarkerColor = () => {
    if (type === 'facility') return 'bg-blue-500';
    if (type === 'dining') return 'bg-orange-500';
    return 'bg-natural';
  };

  const getIcon = () => {
    if (type === 'dining') return Coffee;
    if (type === 'facility') return Bath;
    return MapPin;
  };

  const Icon = getIcon();
  const markerColor = getMarkerColor();

  return (
    <button
      onClick={onSelect}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
        isSelected ? 'scale-125 z-10' : 'hover:scale-110 z-5'
      }`}
      style={{
        left: `${location.mapPosition.x}%`,
        top: `${location.mapPosition.y}%`,
      }}
      title={location.name}
    >
      <div
        className={`${markerColor} ${
          isSelected ? 'ring-4 ring-yellow-300' : ''
        } rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div className={`text-xs font-semibold mt-1 px-2 py-1 rounded whitespace-nowrap ${
        isSelected ? 'bg-yellow-300 text-forest' : 'bg-white text-gray-700 opacity-0 group-hover:opacity-100'
      }`}>
        {location.name}
      </div>
    </button>
  );
}
