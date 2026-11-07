import { useState } from 'react';
import { Trash2, Share2, Check, MapPin } from 'lucide-react';
import { copyToClipboard } from '../utils/shareHelpers';

export default function VisitList({ locations, onRemove }) {
  const [copied, setCopied] = useState(false);

  const handleCopyShare = async () => {
    if (locations.length === 0) return;
    
    const locationIds = locations.map(l => l.id).join(',');
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/?visitList=${locationIds}`;
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-none shadow-sm border-t-2 border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-forest to-natural">
        <h3 className="font-bold text-lg text-white mb-1">My Visit List</h3>
        <p className="text-white/90 text-sm font-semibold">{locations.length} attraction{locations.length !== 1 ? 's' : ''}</p>
      </div>

      {locations.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {locations.map(location => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 bg-light-bg rounded-lg border-2 border-gray-200 hover:border-forest transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <MapPin size={18} className="text-forest flex-shrink-0" />
                  <div>
                    <p className="font-bold text-forest group-hover:text-natural transition-colors">{location.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{location.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(location.id)}
                  className="text-red-400/60 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-200 p-6 bg-light-bg">
            <button
              onClick={handleCopyShare}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all shadow-md ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-forest text-white hover:bg-natural hover:shadow-lg'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  List Copied!
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  Share My List
                </>
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <MapPin size={48} className="text-gray-300 mb-4" />
          <p className="text-gray-700 font-bold mb-2">No attractions added yet</p>
          <p className="text-sm text-gray-500">
            Click locations to add them to your visit plan
          </p>
        </div>
      )}
    </div>
  );
}
