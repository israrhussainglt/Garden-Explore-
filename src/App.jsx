import { useState, useEffect } from 'react';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import InteractiveMap from './components/InteractiveMap';
import LocationInfoCard from './components/LocationInfoCard';
import LocationList from './components/LocationList';
import QRCodePanel from './components/QRCodePanel';
import VisitList from './components/VisitList';
import { getLocationIdFromUrl, getVisitListFromUrl } from './utils/mapHelpers';

import locationsData from './data/locations.json';
import facilitiesData from './data/facilities.json';
import diningData from './data/dining.json';
import categoriesData from './data/categories.json';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scale, setScale] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [visitList, setVisitList] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const locationId = getLocationIdFromUrl();
    if (locationId) {
      const location = [...locationsData, ...facilitiesData, ...diningData].find(
        l => l.id === locationId
      );
      if (location) {
        setShowWelcome(false);
        setSelectedLocation(location);
      }
    }

    const visitListIds = getVisitListFromUrl();
    if (visitListIds.length > 0) {
      const visitLocations = [...locationsData, ...facilitiesData, ...diningData].filter(
        l => visitListIds.includes(l.id)
      );
      setVisitList(visitLocations);
      setShowWelcome(false);
    }
  }, []);

  const allLocations = [...locationsData, ...facilitiesData, ...diningData];

  const getFilteredLocations = () => {
    if (selectedCategory === 'all') {
      return allLocations;
    }
    return allLocations.filter(loc => loc.category === selectedCategory);
  };

  const filteredLocations = getFilteredLocations();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchOpen(false);
  };

  const handleAddToVisitList = (location) => {
    setVisitList(prev => {
      const exists = prev.find(l => l.id === location.id);
      if (exists) {
        return prev.filter(l => l.id !== location.id);
      }
      return [...prev, location];
    });
  };

  const isInVisitList = selectedLocation
    ? visitList.some(l => l.id === selectedLocation.id)
    : false;

  return (
    <div className="h-screen flex flex-col bg-light-bg">
      <Header />

      {showWelcome && <WelcomeScreen onStart={() => setShowWelcome(false)} />}

      {!showWelcome && (
        <>
          {/* Top bar with search and filters */}
          <div className="bg-white border-b-2 border-gray-100 shadow-md sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <SearchBar
                locations={allLocations}
                onLocationSelect={handleLocationSelect}
                onClose={() => setSearchOpen(false)}
              />
              <CategoryFilter
                categories={categoriesData}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-hidden flex gap-4 p-4">
            {/* Map Section */}
            <div className="flex-1 relative flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <InteractiveMap
                  locations={locationsData}
                  facilities={facilitiesData}
                  dining={diningData}
                  selectedLocation={selectedLocation}
                  onLocationSelect={handleLocationSelect}
                  scale={scale}
                  onScaleChange={setScale}
                  panX={panX}
                  panY={panY}
                  onPanChange={(x, y) => {
                    setPanX(x);
                    setPanY(y);
                  }}
                />
              </div>

              {/* Location Info Card at Bottom */}
              {selectedLocation && (
                <div className="mt-4 flex-shrink-0">
                  <LocationInfoCard
                    location={selectedLocation}
                    onClose={() => setSelectedLocation(null)}
                    onAddToVisitList={handleAddToVisitList}
                    isInVisitList={isInVisitList}
                  />
                </div>
              )}
            </div>

            {/* Sidebar Panel - Hidden when location selected */}
            {!selectedLocation && (
              <div className="w-96 bg-white rounded-xl shadow-lg border-2 border-gray-100 flex flex-col overflow-hidden">
                <div className="flex-1 min-h-0 overflow-y-auto border-b-2 border-gray-200">
                  <LocationList
                    locations={filteredLocations}
                    selectedLocationId={selectedLocation?.id}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
                <div className="border-b-2 border-gray-200 p-4">
                  <QRCodePanel />
                </div>
                <div className="p-4 overflow-y-auto">
                  <VisitList
                    locations={visitList}
                    onRemove={(id) => setVisitList(prev => prev.filter(l => l.id !== id))}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
