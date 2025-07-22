import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Navigation, Zap } from 'lucide-react';

interface VenueMapProps {
  onNavigate: (screen: string) => void;
}

const VenueMap: React.FC<VenueMapProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    { id: 'main-hall', name: 'Main Exhibition Hall', type: 'hall', floor: 1 },
    { id: 'conference-a', name: 'Conference Room A', type: 'conference', floor: 1 },
    { id: 'conference-b', name: 'Conference Room B', type: 'conference', floor: 1 },
    { id: 'networking-lounge', name: 'Networking Lounge', type: 'lounge', floor: 1 },
    { id: 'registration', name: 'Registration Desk', type: 'service', floor: 1 },
    { id: 'food-court', name: 'Food Court', type: 'dining', floor: 2 },
    { id: 'vip-lounge', name: 'VIP Lounge', type: 'lounge', floor: 2 },
    { id: 'tech-theater', name: 'Tech Theater', type: 'theater', floor: 2 }
  ];

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'hall': return '🏢';
      case 'conference': return '🏛️';
      case 'lounge': return '🛋️';
      case 'service': return '🎫';
      case 'dining': return '🍽️';
      case 'theater': return '🎭';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            <h1 className="text-xl font-semibold text-gray-900">Venue Map</h1>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Interactive Map Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Venue Map</h3>
              <p className="text-gray-600 mb-4">
                Navigate through the venue with our interactive floor plan
              </p>
              <div className="flex justify-center space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Floor 1
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Floor 2
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              Quick Route
            </button>
          </div>
        </div>

        {/* Location List */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Locations</h2>
          <div className="space-y-3">
            {filteredLocations.map((location) => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`bg-white p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedLocation === location.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getLocationIcon(location.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-600">Floor {location.floor}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      <Navigation className="w-3 h-3 mr-1" />
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">🚻</div>
              <h3 className="font-semibold text-gray-900 mb-1">Restrooms</h3>
              <p className="text-sm text-gray-600">Find nearest facilities</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">🚗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Parking</h3>
              <p className="text-sm text-gray-600">Locate parking areas</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">🏧</div>
              <h3 className="font-semibold text-gray-900 mb-1">ATM</h3>
              <p className="text-sm text-gray-600">Find cash machines</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left">
              <div className="text-2xl mb-2">📶</div>
              <h3 className="font-semibold text-gray-900 mb-1">WiFi Zones</h3>
              <p className="text-sm text-gray-600">High-speed internet</p>
            </button>
          </div>
        </div>

        {/* Emergency Info */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-900 mb-2">Emergency Information</h3>
          <div className="space-y-2 text-sm text-red-800">
            <div className="flex items-center">
              <span className="font-medium mr-2">Emergency Exits:</span>
              <span>Located at each corner of the building</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">First Aid:</span>
              <span>Registration desk and Floor 2 information booth</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Security:</span>
              <span>Call ext. 911 or approach any staff member</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueMap;