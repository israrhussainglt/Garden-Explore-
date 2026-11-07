import { ChevronRight, MapPin, Users, Zap } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-light-bg to-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-natural/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Logo and Header */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-forest to-natural rounded-2xl mb-8 shadow-xl">
            <span className="text-6xl">🌿</span>
          </div>
          <h1 className="text-6xl font-bold text-forest mb-3">Garden Explorer</h1>
          <p className="text-2xl text-natural font-semibold mb-3">Gardens by the Bay</p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-forest to-natural mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl p-10 md:p-14 mb-10 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <p className="text-lg md:text-xl leading-relaxed mb-6 text-dark-text font-light">
            Discover the wonders of Gardens by the Bay through an interactive digital experience.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-10">
            Explore 41 attractions, gardens, dining, and visitor facilities at your own pace.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="p-4 bg-forest/5 rounded-xl border border-forest/10 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm font-bold text-forest">Interactive Map</p>
            </div>
            <div className="p-4 bg-natural/5 rounded-xl border border-natural/10 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-2">📍</div>
              <p className="text-sm font-bold text-natural">41 Locations</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-xl border border-accent/20 hover:shadow-md transition-all duration-300">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-sm font-bold text-amber-700">Mobile Ready</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <MapPin size={18} className="text-forest flex-shrink-0" />
              <span>Zoom and pan the map to explore specific areas</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <Users size={18} className="text-natural flex-shrink-0" />
              <span>Create personalized visit itineraries</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <Zap size={18} className="text-accent flex-shrink-0" />
              <span>Share your plans via QR code or link</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-forest to-natural hover:from-forest/90 hover:to-natural/90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
        >
          Start Exploring
          <ChevronRight size={24} />
        </button>

        {/* Footer text */}
        <p className="text-xs text-gray-500 mt-8">
          An interactive experience brought to you by Gardens by the Bay
        </p>
      </div>
    </div>
  );
}
