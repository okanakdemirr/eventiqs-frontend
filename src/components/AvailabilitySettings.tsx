import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Save, Plus, X } from 'lucide-react';

interface AvailabilitySettingsProps {
  onNavigate: (screen: string) => void;
}

const AvailabilitySettings: React.FC<AvailabilitySettingsProps> = ({ onNavigate }) => {
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '10:00', end: '16:00' },
    sunday: { enabled: false, start: '10:00', end: '16:00' }
  });

  const [breaks, setBreaks] = useState([
    { id: 1, start: '12:00', end: '13:00', label: 'Lunch Break' },
    { id: 2, start: '15:00', end: '15:15', label: 'Coffee Break' }
  ]);

  const [meetingDuration, setMeetingDuration] = useState('30');
  const [bufferTime, setBufferTime] = useState('15');

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        enabled: !prev[day as keyof typeof prev].enabled
      }
    }));
  };

  const handleTimeChange = (day: string, field: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addBreak = () => {
    const newBreak = {
      id: Date.now(),
      start: '14:00',
      end: '14:15',
      label: 'Break'
    };
    setBreaks([...breaks, newBreak]);
  };

  const removeBreak = (id: number) => {
    setBreaks(breaks.filter(b => b.id !== id));
  };

  const updateBreak = (id: number, field: string, value: string) => {
    setBreaks(breaks.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const handleSave = () => {
    // Save availability settings
    console.log('Saving availability settings:', {
      availability,
      breaks,
      meetingDuration,
      bufferTime
    });
    onNavigate('calendar');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('calendar')}
                className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Availability Settings</h1>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Weekly Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
          <div className="space-y-4">
            {Object.entries(availability).map(([day, settings]) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-20">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.enabled}
                      onChange={() => handleDayToggle(day)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {dayNames[day as keyof typeof dayNames]}
                    </span>
                  </label>
                </div>
                
                {settings.enabled && (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="time"
                      value={settings.start}
                      onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={settings.end}
                      onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Breaks */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Breaks</h2>
            <button
              onClick={addBreak}
              className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Break
            </button>
          </div>
          
          <div className="space-y-3">
            {breaks.map((breakItem) => (
              <div key={breakItem.id} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={breakItem.label}
                  onChange={(e) => updateBreak(breakItem.id, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Break name"
                />
                <input
                  type="time"
                  value={breakItem.start}
                  onChange={(e) => updateBreak(breakItem.id, 'start', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={breakItem.end}
                  onChange={(e) => updateBreak(breakItem.id, 'end', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeBreak(breakItem.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Meeting Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Meeting Duration
              </label>
              <select
                value={meetingDuration}
                onChange={(e) => setMeetingDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buffer Time Between Meetings
              </label>
              <select
                value={bufferTime}
                onChange={(e) => setBufferTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="0">No buffer</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Presets</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">Business Hours</div>
              <div className="text-sm text-gray-600">Mon-Fri, 9AM-5PM</div>
            </button>
            
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">Event Days Only</div>
              <div className="text-sm text-gray-600">Feb 5-7, 10AM-6PM</div>
            </button>
            
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">Flexible</div>
              <div className="text-sm text-gray-600">All days, 8AM-8PM</div>
            </button>
            
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="font-medium text-gray-900">Limited</div>
              <div className="text-sm text-gray-600">Mornings only</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySettings;