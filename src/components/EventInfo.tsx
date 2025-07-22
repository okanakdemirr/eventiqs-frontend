import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Wifi, Car, Coffee, Info } from 'lucide-react';
import { EventService } from '../services/eventService';

interface EventInfoProps {
  onNavigate: (screen: string) => void;
}

const EventInfo: React.FC<EventInfoProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const currentEvent = EventService.getCurrentEvent();

  if (!currentEvent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Event Selected</h2>
          <button
            onClick={() => onNavigate('my-events')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Select Event
          </button>
        </div>
      </div>
    );
  }

  const schedule = [
    {
      time: '9:00 AM',
      title: 'Registration & Welcome Coffee',
      location: 'Main Lobby',
      type: 'registration'
    },
    {
      time: '10:00 AM',
      title: 'Opening Keynote: Future of Tourism',
      location: 'Main Auditorium',
      type: 'keynote'
    },
    {
      time: '11:30 AM',
      title: 'Panel: Digital Transformation in Travel',
      location: 'Conference Room A',
      type: 'panel'
    },
    {
      time: '1:00 PM',
      title: 'Networking Lunch',
      location: 'Exhibition Hall',
      type: 'networking'
    },
    {
      time: '2:30 PM',
      title: 'Workshop: Sustainable Tourism Practices',
      location: 'Workshop Room B',
      type: 'workshop'
    },
    {
      time: '4:00 PM',
      title: 'Exhibitor Showcase',
      location: 'Main Exhibition Hall',
      type: 'exhibition'
    },
    {
      time: '6:00 PM',
      title: 'Closing Reception',
      location: 'VIP Lounge',
      type: 'reception'
    }
  ];

  const services = [
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'High-speed internet throughout the venue',
      details: 'Network: EMITT2025 | Password: tourism2025'
    },
    {
      icon: Car,
      title: 'Parking',
      description: 'Complimentary parking for attendees',
      details: 'Levels P1-P3 available, entrance via Gate A'
    },
    {
      icon: Coffee,
      title: 'Food & Beverage',
      description: 'Multiple dining options available',
      details: 'Food court on Level 2, coffee stations throughout'
    },
    {
      icon: Users,
      title: 'Concierge Service',
      description: '24/7 assistance and information',
      details: 'Located at registration desk and information booths'
    }
  ];

  const getEventTypeColor = (type: string) => {
    const colors = {
      registration: 'bg-blue-100 text-blue-800',
      keynote: 'bg-purple-100 text-purple-800',
      panel: 'bg-green-100 text-green-800',
      networking: 'bg-orange-100 text-orange-800',
      workshop: 'bg-indigo-100 text-indigo-800',
      exhibition: 'bg-pink-100 text-pink-800',
      reception: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Event Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{currentEvent.dates}</p>
              <p className="text-sm text-gray-600">3 days of networking and learning</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">{currentEvent.location}</p>
              <p className="text-sm text-gray-600">Istanbul, Turkey</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-gray-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">50,000+ Attendees</p>
              <p className="text-sm text-gray-600">From 100+ countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About EMITT 2025</h3>
        <p className="text-gray-700 mb-4">
          The East Mediterranean International Tourism & Travel Exhibition is one of the most important tourism fairs in the region, bringing together industry professionals, destinations, and service providers.
        </p>
        <p className="text-gray-700">
          This year's theme focuses on sustainable tourism, digital transformation, and post-pandemic recovery strategies for the travel industry.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">500+</div>
          <div className="text-sm text-gray-600">Exhibitors</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">100+</div>
          <div className="text-sm text-gray-600">Countries</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">50+</div>
          <div className="text-sm text-gray-600">Sessions</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">25+</div>
          <div className="text-sm text-gray-600">Workshops</div>
        </div>
      </div>
    </div>
  );

  const ScheduleTab = () => (
    <div className="space-y-4">
      {schedule.map((item, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
                {item.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ServicesTab = () => (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <service.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm text-gray-500">{service.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info, component: OverviewTab },
    { id: 'schedule', label: 'Schedule', icon: Calendar, component: ScheduleTab },
    { id: 'services', label: 'Services', icon: Users, component: ServicesTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || OverviewTab;

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
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{currentEvent.name}</h1>
              <p className="text-sm text-gray-600">{currentEvent.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default EventInfo;