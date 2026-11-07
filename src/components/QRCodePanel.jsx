import * as QRCode from 'qrcode.react';
import { Smartphone, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { copyToClipboard } from '../utils/shareHelpers';

export default function QRCodePanel() {
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState(window.location.origin);

  useEffect(() => {
    // For mobile access, we need to use the IP address instead of localhost
    // When running locally: http://192.168.1.17:5174
    // When deployed: uses the deployed URL
    
    // Check if we're on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // For local development, construct the full URL with protocol and port
      const protocol = window.location.protocol; // http: or https:
      const port = window.location.port; // 5174
      
      // Get local IP from window if available, otherwise use current origin
      // The user will need to manually update this with their IP, or we can provide instructions
      const localUrl = `${protocol}//192.168.1.17:${port}/`;
      setQrUrl(localUrl);
    } else {
      // For production, use the current origin
      setQrUrl(window.location.origin);
    }
  }, []);

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(qrUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-natural/10 to-forest/10 rounded-lg shadow-md p-6 text-center border-2 border-natural/20">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Smartphone className="text-forest" size={24} />
        <h3 className="font-bold text-base text-forest">Mobile Access</h3>
      </div>
      
      <p className="text-natural text-xs mb-4 font-medium">
        Scan to explore on mobile
      </p>

      {/* QR Code */}
      <div className="flex justify-center mb-6 bg-white p-3 rounded-lg inline-block mx-auto border-2 border-gray-100">
        <QRCode.QRCodeSVG value={qrUrl} size={150} level="H" fgColor="#1b4332" bgColor="#ffffff" />
      </div>

      {/* URL Display Box - ENLARGED */}
      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-natural/30 w-full">
        <p className="text-sm text-gray-800 font-mono break-all leading-relaxed whitespace-normal">
          {qrUrl}
        </p>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopyUrl}
        className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
          copied
            ? 'bg-green-500 text-white shadow-md'
            : 'bg-accent text-forest hover:bg-opacity-90 shadow-md hover:shadow-lg'
        }`}
      >
        <Copy size={16} />
        {copied ? 'URL Copied!' : 'Copy URL'}
      </button>

      <p className="text-xs text-gray-500 mt-3 font-medium">
        Garden Explorer
      </p>
    </div>
  );
}
