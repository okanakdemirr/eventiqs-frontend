import React from 'react';
import { ArrowLeft, MapPin, Globe, Mail, Phone, Calendar, Star, MessageCircle } from 'lucide-react';

interface ExhibitorDetailProps {
  onNavigate: (screen: string, params?: any) => void;
  exhibitor: any;
}

const ExhibitorDetail: React.FC<ExhibitorDetailProps> = ({ onNavigate, exhibitor }) => {
  if (!exhibitor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Exhibitor Not Found</h2>
          <button
            onClick={() => onNavigate('participants')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Participants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('participants', { tab: 'exhibitors' })}
              className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Exhibitor Details</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{exhibitor.companyName}</h2>
              <p className="text-lg text-gray-600 mb-3">{exhibitor.industry}</p>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                {exhibitor.boothLocation}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{exhibitor.relevanceScore}%</div>
              <div className="text-sm text-gray-500">Relevance Match</div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{exhibitor.description}</p>
          
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://${exhibitor.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-4 h-4 mr-2" />
              Website
            </a>
            <a
              href={`mailto:${exhibitor.email}`}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </a>
            <a
              href={`tel:${exhibitor.phone}`}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </a>
          </div>
        </div>

        {/* Representatives */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Representatives</h3>
          <div className="space-y-4">
            {exhibitor.representatives.map((rep: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={rep.photo}
                  alt={rep.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{rep.name}</h4>
                  <p className="text-sm text-gray-600">{rep.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onNavigate('chat', {
                      name: rep.name,
                      title: rep.role,
                      company: exhibitor.companyName,
                      photo: rep.photo,
                      type: 'exhibitor-rep'
                    })}
                    className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Message
                  </button>
                  <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                    <Star className="w-3 h-3 mr-1" />
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Meeting Slots */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Meeting Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            {exhibitor.availableSlots.map((slot: string, index: number) => (
              <button
                key={index}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{slot}</span>
              </button>
            ))}
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Request Meeting
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Star className="w-4 h-4 mr-2" />
              Bookmark
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorDetail;