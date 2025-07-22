import React from 'react';
import { ArrowLeft, TrendingUp, Users, Calendar, MessageSquare, Eye, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  onNavigate: (screen: string, params?: any) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const dailyActivity = [
    { date: 'Mon', connections: 12, meetings: 3 },
    { date: 'Tue', connections: 19, meetings: 5 },
    { date: 'Wed', connections: 8, meetings: 2 },
    { date: 'Thu', connections: 15, meetings: 4 },
    { date: 'Fri', connections: 22, meetings: 6 },
    { date: 'Sat', connections: 18, meetings: 4 },
    { date: 'Sun', connections: 14, meetings: 3 }
  ];

  const connectionTypes = [
    { name: 'QR Scan', value: 45, color: '#3B82F6' },
    { name: 'AI Recommendation', value: 30, color: '#10B981' },
    { name: 'Business Card', value: 25, color: '#F59E0B' }
  ];

  const stats = [
    {
      label: 'Total Connections',
      value: '47',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      clickable: false
    },
    {
      label: 'Profile Views',
      value: '156',
      change: '+8%',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      clickable: true,
      screen: 'profile-viewers-list'
    },
    {
      label: 'Meeting Requests',
      value: '23',
      change: '+15%',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      clickable: true,
      screen: 'total-meeting-requests-list'
    },
    {
      label: 'Accepted Meetings',
      value: '8',
      change: '+25%',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      clickable: true,
      screen: 'accepted-meetings-list'
    }
  ];

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
            <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                onClick={() => stat.clickable && onNavigate(stat.screen)}
                className={`bg-white p-4 rounded-xl border border-gray-200 ${
                  stat.clickable ? 'hover:shadow-md cursor-pointer' : ''
                } transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.clickable && (
                  <div className="text-xs text-blue-600 mt-1">View Details →</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="connections" fill="#3B82F6" name="Connections" />
                <Bar dataKey="meetings" fill="#10B981" name="Meetings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connection Types */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Connection Sources</h2>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={connectionTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {connectionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {connectionTypes.map((type, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Insights */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Insights</h2>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Peak Activity Time</h3>
                  <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
                </div>
                <div className="text-2xl">⏰</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Most Active Day</h3>
                  <p className="text-sm text-gray-600">Friday (22 connections)</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Response Rate</h3>
                  <p className="text-sm text-gray-600">78% within 2 hours</p>
                </div>
                <div className="text-2xl">💬</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-900">Excellent Performance!</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              You're in the top 15% of active networkers at this event. Your engagement rate is 23% above average.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-blue-700">High engagement</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                <span className="text-blue-700">Quality connections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;