import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Plus, Video, Users } from 'lucide-react';
import { mockMeetings } from '../data/mockData';
import { formatDate, formatTime } from '../utils/formatters';

interface CalendarProps {
  onNavigate: (screen: string, params?: any) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todaysMeetings = mockMeetings.filter(meeting => meeting.date === selectedDate);
  const upcomingMeetings = mockMeetings.filter(meeting => meeting.date > selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const MeetingCard = ({ meeting }: { meeting: any }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start space-x-3">
        <img
          src={meeting.contactPhoto}
          alt={meeting.contactName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{meeting.contactName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
              {meeting.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{meeting.contactTitle} at {meeting.contactCompany}</p>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {meeting.time} ({meeting.duration} min)
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {meeting.location}
            </div>
          </div>

          {meeting.notes && (
            <p className="text-sm text-gray-500 mb-3 italic">"{meeting.notes}"</p>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('chat', {
                name: meeting.contactName,
                title: meeting.contactTitle,
                company: meeting.contactCompany,
                photo: meeting.contactPhoto,
                type: 'meeting'
              })}
              className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Users className="w-3 h-3 mr-1" />
              Message
            </button>
            <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              <Video className="w-3 h-3 mr-1" />
              Join Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
            </div>
            <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-1" />
              Schedule
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="px-4 pb-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Today's Meetings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : formatDate(selectedDate)}
            </h2>
            <span className="text-sm text-gray-600">{todaysMeetings.length} meetings</span>
          </div>
          
          {todaysMeetings.length > 0 ? (
            <div className="space-y-4">
              {todaysMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings scheduled</h3>
              <p className="text-gray-600 mb-4">
                Your calendar is free for this day
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule a Meeting
              </button>
            </div>
          )}
        </div>

        {/* Upcoming Meetings */}
        {upcomingMeetings.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              {upcomingMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <img
                      src={meeting.contactPhoto}
                      alt={meeting.contactName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{meeting.contactName}</h3>
                      <p className="text-sm text-gray-600">{meeting.contactCompany}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatDate(meeting.date)}</p>
                      <p className="text-sm text-gray-600">{meeting.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('availability-settings')}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Set Availability</h3>
              <p className="text-sm text-gray-600">Manage your schedule</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Virtual Meetings</h3>
              <p className="text-sm text-gray-600">Set up video calls</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;