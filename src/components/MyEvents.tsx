import React from 'react';
import { ArrowLeft, Calendar, MapPin, Users, TrendingUp, Clock } from 'lucide-react';
import { EventService } from '../services/eventService';

interface MyEventsProps {
  onSelectEvent: (eventId: string) => void;
  onBack: () => void;
}

const MyEvents: React.FC<MyEventsProps> = ({ onSelectEvent, onBack }) => {
  const events = EventService.getAllEvents();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            Live
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Completed
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  const renderEventStats = (event: any) => {
    if (event.status === 'active' && event.stats) {
      return (
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {event.stats.connections} connections
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {event.stats.leads} leads
          </div>
        </div>
      );
    }

    if (event.status === 'completed' && event.finalStats) {
      return (
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {event.finalStats.connections} connections
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {event.finalStats.leads} leads
          </div>
        </div>
      );
    }

    if (event.status === 'upcoming' && event.countdown) {
      return (
        <div className="flex items-center text-sm text-blue-600 mt-3">
          <Clock className="w-4 h-4 mr-1" />
          Starts in {event.countdown.days} days, {event.countdown.hours} hours
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">My Events</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onSelectEvent(event.id)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
          >
            <div className="aspect-video relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                {getStatusBadge(event.status)}
              </div>
              {event.status === 'active' && event.attendeesOnline && (
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-xs">
                  {event.attendeesOnline.toLocaleString()} attendees online
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {event.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {event.subtitle}
              </p>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {event.dates}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>

              {renderEventStats(event)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;