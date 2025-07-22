import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, QrCode, Scan, Share2, Download, Copy, Check } from 'lucide-react';
import QRCodeLib from 'qrcode';
import { currentUser } from '../data/mockData';

interface QRScreenProps {
  onNavigate: (screen: string) => void;
}

const QRScreen: React.FC<QRScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'share'>('share');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    try {
      const profileData = {
        name: currentUser.name,
        title: currentUser.title,
        company: currentUser.company,
        email: currentUser.email,
        phone: currentUser.phone,
        linkedin: currentUser.linkedin,
        profileUrl: `https://eventiqs.com/profile/${currentUser.name.replace(' ', '').toLowerCase()}`
      };

      const qrString = JSON.stringify(profileData);
      const url = await QRCodeLib.toDataURL(qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleCopyProfile = async () => {
    const profileUrl = `https://eventiqs.com/profile/${currentUser.name.replace(' ', '').toLowerCase()}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    const profileUrl = `https://eventiqs.com/profile/${currentUser.name.replace(' ', '').toLowerCase()}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentUser.name} - ${currentUser.title}`,
          text: `Connect with me at the event!`,
          url: profileUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyProfile();
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `${currentUser.name.replace(' ', '_')}_QR_Code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const ScanTab = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mb-6">
        <div className="text-center">
          <Scan className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Position QR code within frame</p>
        </div>
      </div>
      
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Start Scanning
      </button>
      
      <p className="text-gray-500 text-sm mt-4 text-center">
        Scan attendee QR codes to instantly connect and exchange contact information
      </p>
    </div>
  );

  const ShareTab = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-64 h-64 object-contain"
          />
        )}
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentUser.name}</h3>
        <p className="text-gray-600">{currentUser.title}</p>
        <p className="text-gray-600">{currentUser.company}</p>
      </div>

      <div className="flex space-x-3 mb-4">
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
        
        <button
          onClick={handleCopyProfile}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center">
        Others can scan this code to instantly get your contact information
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">QR Connect</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'share'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <QrCode className="w-5 h-5 mx-auto mb-1" />
            Share QR
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'scan'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Scan className="w-5 h-5 mx-auto mb-1" />
            Scan QR
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'scan' ? <ScanTab /> : <ShareTab />}
    </div>
  );
};

export default QRScreen;