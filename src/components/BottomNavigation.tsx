import React from 'react';
import { Home, Users, MessageSquare, Calendar, BarChart3 } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home
    },
    {
      id: 'participants',
      label: 'People',
      icon: Users
    },
    {
      id: 'connections',
      label: 'Network',
      icon: MessageSquare
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3
    }
  ];

  return (
    <div className="bottom-nav">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;