import { useState } from 'react';
import { X, ExternalLink, Share2, Plus, Check, MapPin, Tag } from 'lucide-react';
import { copyToClipboard } from '../utils/shareHelpers';
import { generateShareUrl } from '../utils/mapHelpers';

export default function LocationDetails({
  location,
  onClose,
  onAddToVisitList,
  isInVisitList,
}) {
  const [copied, setCopied] = useState(false);

  if (!location) return null;

  const handleCopyShare = async () => {
    const url = generateShareUrl(location.id);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b-2 border-gray-100 bg-gradient-to-r from-forest to-natural">
        <h2 className="text-lg font-bold text-white">{location.name}</h2>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 transition-colors p-1 rounded-full"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {location.category && (
          <div className="flex items-center gap-2 bg-natural/10 px-3 py-2 rounded-lg border-l-4 border-natural">
            <Tag size={16} className="text-natural" />
            <div>
              <p className="text-xs text-gray-600 font-semibold">CATEGORY</p>
              <p className="text-xs font-bold text-forest capitalize">{location.category}</p>
            </div>
          </div>
        )}

        <div>
          <p className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Description</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {location.description || 'No description available.'}
          </p>
        </div>
      </div>

      <div className="border-t-2 border-gray-100 p-4 bg-light-bg space-y-2">
        {location.officialUrl && (
          <a
            href={location.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-forest text-white px-3 py-2 rounded-lg hover:bg-opacity-90 transition-all font-bold text-sm shadow-md hover:shadow-lg"
          >
            <ExternalLink size={16} />
            Learn More
          </a>
        )}

        <button
          onClick={handleCopyShare}
          className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold transition-all text-sm ${
            copied
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-gray-100 text-forest hover:bg-gray-200 border-2 border-gray-200'
          }`}
        >
          {copied ? (
            <>
              <Check size={16} />
              Link Copied!
            </>
          ) : (
            <>
              <Share2 size={16} />
              Share
            </>
          )}
        </button>

        {onAddToVisitList && (
          <button
            onClick={() => onAddToVisitList(location)}
            className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold transition-all text-sm shadow-md ${
              isInVisitList
                ? 'bg-accent text-forest hover:bg-opacity-90'
                : 'bg-natural text-white hover:bg-opacity-90'
            }`}
          >
            {isInVisitList ? (
              <>
                <Check size={16} />
                Added
              </>
            ) : (
              <>
                <Plus size={16} />
                Add to List
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
}
