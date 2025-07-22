import React from 'react';
import { QrCode, Users, Calendar, BarChart3, MessageCircle, MapPin, Info, Settings } from 'lucide-react';
import { EventService } from '../services/eventService';
import { ParticipantService } from '../services/participantService';

interface DashboardProps {
  onNavigate: (screen: string, params?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const currentEvent = EventService.getCurrentEvent();
  const perfectMatches = ParticipantService.getPerfectMatches();

  const quickActions = [
    {
      icon: QrCode,
      label: 'QR Connect',
      description: 'Scan or share QR codes',
      color: 'bg-blue-500',
      screen: 'qr-connect'
    },
    {
      icon: Users,
      label: 'Participants',
      description: 'Browse attendees',
      color: 'bg-green-500',
      screen: 'participants'
    },
    {
      icon: Calendar,
      label: 'Calendar',
      description: 'Manage meetings',
      color: 'bg-purple-500',
      screen: 'calendar'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'View insights',
      color: 'bg-orange-500',
      screen: 'analytics'
    }
  ];

  const eventActions = [
    {
      icon: MapPin,
      label: 'Venue Map',
      screen: 'venue-map'
    },
    {
      icon: Info,
      label: 'Event Info',
      screen: 'event-info'
    },
    {
      icon: Settings,
      label: 'Availability',
      screen: 'availability-settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              {currentEvent && (
                <p className="text-sm text-gray-600 mt-1">{currentEvent.name}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {eventActions.map((action) => (
                <button
                  key={action.screen}
                  onClick={() => onNavigate(action.screen)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <action.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.screen}
                onClick={() => onNavigate(action.screen)}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Perfect Matches */}
        {perfectMatches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Perfect Matches</h2>
              <button
                onClick={() => onNavigate('participants', { tab: 'recommendations' })}
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {perfectMatches.slice(0, 3).map((match) => (
                <div key={match.id} className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <img
                      src={match.photo}
                      alt={match.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{match.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.urgency === 'High' ? 'bg-red-100 text-red-800' :
                          match.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {match.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{match.title} at {match.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{match.aiInsight}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => onNavigate('chat', {
                            name: match.name,
                            title: match.title,
                            company: match.company,
                            photo: match.photo,
                            type: 'perfect-match'
                          })}
                          className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Stats */}
        {currentEvent?.stats && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-blue-600">{currentEvent.stats.connections}</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-green-600">{currentEvent.stats.leads}</div>
                <div className="text-sm text-gray-600">Leads</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-purple-600">{currentEvent.stats.meetings}</div>
                <div className="text-sm text-gray-600">Meetings</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;