
import React, { useState, useEffect } from 'react';
import { QrCode, Camera } from 'lucide-react';

interface QRScannerProps {
  onScan: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate a successful scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      onScan();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl text-center border-t-8 border-pink-200">
      <div className="mb-6 relative mx-auto w-48 h-48 bg-gray-50 rounded-2xl flex items-center justify-center border-4 border-dashed border-blue-200 overflow-hidden">
        {isScanning ? (
          <div className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center">
            <div className="w-full h-1 bg-blue-400 animate-bounce absolute top-1/2"></div>
            <Camera className="w-12 h-12 text-blue-400 animate-pulse" />
            <p className="text-xs text-blue-500 mt-2 font-bold uppercase tracking-widest">Scanning...</p>
          </div>
        ) : (
          <QrCode className="w-24 h-24 text-pink-200" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Login to Celebate</h2>
      <p className="text-gray-500 mb-8">Scan the event QR code to join the party!</p>
      
      <button
        onClick={handleStartScan}
        disabled={isScanning}
        className="w-full py-4 px-6 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
      >
        {isScanning ? "Please Wait..." : "Scan Invitation QR"}
      </button>

      <div className="mt-6 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-pink-300"></div>
        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
        <div className="w-2 h-2 rounded-full bg-pink-300"></div>
      </div>
    </div>
  );
};

export default QRScanner;
