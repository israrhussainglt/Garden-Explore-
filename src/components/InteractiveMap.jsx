import { useRef, useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import MapMarker from './MapMarker';

export default function InteractiveMap({
  locations,
  facilities,
  dining,
  selectedLocation,
  onLocationSelect,
  scale = 1,
  onScaleChange,
  panX = 0,
  panY = 0,
  onPanChange,
}) {
  const mapContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.5, Math.min(3, scale * delta));
    onScaleChange(newScale);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    onPanChange(
      e.clientX - dragStart.x,
      e.clientY - dragStart.y
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panX,
        y: e.touches[0].clientY - panY,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    onPanChange(
      e.touches[0].clientX - dragStart.x,
      e.touches[0].clientY - dragStart.y
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleResetMap = () => {
    onScaleChange(1);
    onPanChange(0, 0);
  };

  const zoom = (factor) => {
    const newScale = Math.max(0.5, Math.min(3, scale * factor));
    onScaleChange(newScale);
  };

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full h-full bg-light-bg overflow-hidden rounded-lg border border-gray-200"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="w-full h-full transition-transform duration-75"
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-green-100">
          <img
            src="/assets/map/gardens-map.jpg"
            alt="Gardens by the Bay Map"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          {locations.map(location => (
            <MapMarker
              key={location.id}
              location={location}
              isSelected={selectedLocation?.id === location.id}
              onSelect={() => onLocationSelect(location)}
              type="attraction"
            />
          ))}

          {facilities.map(facility => (
            <MapMarker
              key={facility.id}
              location={facility}
              isSelected={selectedLocation?.id === facility.id}
              onSelect={() => onLocationSelect(facility)}
              type="facility"
            />
          ))}

          {dining.map(diningSpot => (
            <MapMarker
              key={diningSpot.id}
              location={diningSpot}
              isSelected={selectedLocation?.id === diningSpot.id}
              onSelect={() => onLocationSelect(diningSpot)}
              type="dining"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2">
        <button
          onClick={() => zoom(1.2)}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn size={20} className="text-forest" />
        </button>
        <button
          onClick={() => zoom(0.8)}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut size={20} className="text-forest" />
        </button>
        <button
          onClick={handleResetMap}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Reset Map"
        >
          <RotateCcw size={20} className="text-forest" />
        </button>
      </div>
    </div>
  );
}
