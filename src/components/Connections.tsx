import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Calendar, Star, Users, Bookmark, TrendingUp } from 'lucide-react';
import { mockConnections, mockQRScans } from '../data/mockData';
import { formatRelativeTime } from '../utils/formatters';

interface ConnectionsProps {
  onNavigate: (screen: string, params?: any) => void;
}

const Connections: React.FC<ConnectionsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = mockConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ConnectionsTab = () => (
    <div className="space-y-4">
      {filteredConnections.map((connection) => (
        <div key={connection.id} className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <img
              src={connection.photo}
              alt={connection.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{connection.name}</h3>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(connection.connectedAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{connection.title} at {connection.company}</p>
              
              <div className="flex items-center mb-2">
                <span className="text-xs text-gray-500 mr-2">
                  Connected via {connection.connectionType.replace('_', ' ')}
                </span>
                {connection.meetingScheduled && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Meeting Scheduled
                  </span>
                )}
              </div>

              {connection.lastMessage && (
                <p className="text-sm text-gray-500 mb-3 italic">"{connection.lastMessage}"</p>
              )}

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('chat', {
                    name: connection.name,
                    title: connection.title,
                    company: connection.company,
                    photo: connection.photo,
                    type: 'connection'
                  })}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </button>
                <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </button>
                <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Star className="w-3 h-3 mr-1" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const BookmarksTab = () => (
    <div className="space-y-4">
      <div className="text-center py-12">
        <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookmarks Yet</h3>
        <p className="text-gray-600 mb-4">
          Save interesting participants to easily find them later
        </p>
        <button
          onClick={() => onNavigate('participants')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Participants
        </button>
      </div>
    </div>
  );

  const LeadsTab = () => (
    <div className="space-y-4">
      {filteredConnections.slice(0, 3).map((connection) => (
        <div key={connection.id} className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <img
              src={connection.photo}
              alt={connection.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{connection.name}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Hot Lead
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{connection.title} at {connection.company}</p>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-3">
                <div className="flex items-center mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-blue-900">Lead Score: 85%</span>
                </div>
                <p className="text-xs text-blue-700">
                  High engagement, decision maker, budget confirmed
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('chat', {
                    name: connection.name,
                    title: connection.title,
                    company: connection.company,
                    photo: connection.photo,
                    type: 'lead'
                  })}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Follow Up
                </button>
                <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'connections', label: 'Connections', icon: Users, component: ConnectionsTab },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, component: BookmarksTab },
    { id: 'leads', label: 'Leads', icon: TrendingUp, component: LeadsTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ConnectionsTab;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
            <h1 className="text-xl font-semibold text-gray-900">My Network</h1>
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
              placeholder="Search connections..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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

export default Connections;