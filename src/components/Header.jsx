import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-forest to-natural shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
              <Leaf className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Garden Explorer</h1>
              <p className="text-xs text-white/80 font-medium">Gardens by the Bay</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-white/90 text-sm font-medium">41 Locations • Interactive Explore</p>
          </div>
        </div>
      </div>
    </header>
  );
}
