import React, { useState } from 'react';
import { ArrowLeft, Search, Eye, Clock, TrendingUp, MessageCircle, Star } from 'lucide-react';
import { mockProfileViewers } from '../data/mockData';
import { formatRelativeTime } from '../utils/formatters';

interface ProfileViewersListProps {
  onNavigate: (screen: string, params?: any) => void;
}

const ProfileViewersList: React.FC<ProfileViewersListProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const filteredViewers = mockProfileViewers
    .filter(viewer =>
      viewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viewer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viewer.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'duration':
          return parseInt(b.viewDuration) - parseInt(a.viewDuration);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('analytics')}
              className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">Profile Viewers</h1>
              <p className="text-sm text-gray-600">{filteredViewers.length} people viewed your profile</p>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search viewers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="match">Best Match</option>
              <option value="duration">Longest View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mockProfileViewers.length}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(mockProfileViewers.reduce((acc, v) => acc + v.matchPercentage, 0) / mockProfileViewers.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Match</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockProfileViewers.filter(v => v.status === 'online').length}
            </div>
            <div className="text-sm text-gray-600">Online Now</div>
          </div>
        </div>

        {/* Viewers List */}
        <div className="space-y-4">
          {filteredViewers.map((viewer) => (
            <div key={viewer.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={viewer.photo}
                    alt={viewer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(viewer.status)}`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{viewer.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(viewer.matchPercentage)}`}>
                      {viewer.matchPercentage}% match
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{viewer.title} at {viewer.company}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatRelativeTime(viewer.viewedAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {viewer.viewDuration}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onNavigate('chat', {
                        name: viewer.name,
                        title: viewer.title,
                        company: viewer.company,
                        photo: viewer.photo,
                        type: 'profile-viewer'
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

        {filteredViewers.length === 0 && (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No viewers found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'No one has viewed your profile yet'}
            </p>
          </div>
        )}

        {/* Insights */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-900">Profile Insights</h3>
          </div>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Your profile is performing well with high-quality matches</p>
            <p>• Most viewers spend over 1 minute reviewing your information</p>
            <p>• Peak viewing times are between 2-4 PM</p>
            <p>• Consider reaching out to high-match viewers for better connections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewersList;