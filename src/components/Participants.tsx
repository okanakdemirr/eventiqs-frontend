import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Star, MessageCircle, Users, Building2 } from 'lucide-react';
import { ParticipantService } from '../services/participantService';
import { getUrgencyColors, getConfidenceColors } from '../utils/helpers';

interface ParticipantsProps {
  onNavigate: (screen: string, params?: any) => void;
  initialTab?: string;
}

const Participants: React.FC<ParticipantsProps> = ({ onNavigate, initialTab = 'recommendations' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  const perfectMatches = ParticipantService.getPerfectMatches();
  const visitors = ParticipantService.getAllVisitors();
  const exhibitors = ParticipantService.getExhibitors();

  const filteredVisitors = visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExhibitors = exhibitors.filter(exhibitor =>
    exhibitor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exhibitor.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RecommendationsTab = () => (
    <div className="space-y-4">
      {perfectMatches.map((match) => (
        <div key={match.id} className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={match.photo}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                match.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{match.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColors(match.urgency)}`}>
                  {match.urgency}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{match.title} at {match.company}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {match.buyerTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-3">{match.aiInsight}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('chat', {
                    name: match.name,
                    title: match.title,
                    company: match.company,
                    photo: match.photo,
                    type: 'perfect-match'
                  })}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Connect
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

  const VisitorsTab = () => (
    <div className="space-y-4">
      {filteredVisitors.map((visitor) => (
        <div key={visitor.id} className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={visitor.photo}
                alt={visitor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                visitor.status === 'online' ? 'bg-green-400' : 
                visitor.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
              }`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{visitor.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColors(visitor.confidence)}`}>
                  {visitor.confidence}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{visitor.title} at {visitor.company}</p>
              <p className="text-xs text-gray-500 mb-2">{visitor.location} • {visitor.lastActivity}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {visitor.interests.slice(0, 3).map((interest, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('chat', {
                    name: visitor.name,
                    title: visitor.title,
                    company: visitor.company,
                    photo: visitor.photo,
                    type: 'visitor'
                  })}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Connect
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

  const ExhibitorsTab = () => (
    <div className="space-y-4">
      {filteredExhibitors.map((exhibitor) => (
        <div
          key={exhibitor.id}
          onClick={() => onNavigate('exhibitor-detail', { exhibitorId: exhibitor.id })}
          className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{exhibitor.companyName}</h3>
              <p className="text-sm text-gray-600 mb-2">{exhibitor.industry}</p>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Building2 className="w-3 h-3 mr-1" />
                {exhibitor.boothLocation}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-blue-600">{exhibitor.relevanceScore}%</div>
              <div className="text-xs text-gray-500">Match</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{exhibitor.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {exhibitor.representatives.slice(0, 3).map((rep, index) => (
                <img
                  key={index}
                  src={rep.photo}
                  alt={rep.name}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
              ))}
              {exhibitor.representatives.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{exhibitor.representatives.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-blue-600 font-medium">View Details →</span>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'recommendations', label: 'AI Matches', icon: Star, component: RecommendationsTab },
    { id: 'visitors', label: 'Visitors', icon: Users, component: VisitorsTab },
    { id: 'exhibitors', label: 'Exhibitors', icon: Building2, component: ExhibitorsTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || RecommendationsTab;

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
            <h1 className="text-xl font-semibold text-gray-900">Participants</h1>
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
              placeholder="Search participants..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
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

export default Participants;