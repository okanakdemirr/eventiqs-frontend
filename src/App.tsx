import React, { useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import MyEvents from './components/MyEvents';
import Dashboard from './components/Dashboard';
import QRScreen from './components/QRScreen';
import Participants from './components/Participants';
import Connections from './components/Connections';
import Calendar from './components/Calendar';
import Analytics from './components/Analytics';
import ChatScreen from './components/ChatScreen';
import ExhibitorDetail from './components/ExhibitorDetail';
import VenueMap from './components/VenueMap';
import EventInfo from './components/EventInfo';
import AvailabilitySettings from './components/AvailabilitySettings';
import ProfileViewersList from './components/ProfileViewersList';
import BottomNavigation from './components/BottomNavigation';
import { useAuth } from './hooks/useAuth';
import { useNavigation } from './hooks/useNavigation';
import { EventService } from './services/eventService';
import { ParticipantService } from './services/participantService';
import { STORAGE_KEYS } from './utils/constants';
import { resetScrollPosition } from './utils/scrollHelpers';

function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const { currentScreen, navigationParams, navigate, setCurrentScreen } = useNavigation();

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('dashboard');
    }
  }, [isAuthenticated, setCurrentScreen]);

  const handleLogin = (email: string) => {
    login(email);
    resetScrollPosition();
    navigate('my-events');
  };

  const handleEventSelect = (eventId: string) => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_EVENT, eventId);
    resetScrollPosition();
    navigate('dashboard');
  };

  const handleLogout = () => {
    logout();
    resetScrollPosition();
    setCurrentScreen('login');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'my-events':
        return (
          <MyEvents
            onSelectEvent={handleEventSelect}
            onBack={() => navigate('login')}
          />
        );
      
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      
      case 'qr-connect':
        return <QRScreen onNavigate={navigate} />;
      
      case 'participants':
        return (
          <Participants
            onNavigate={navigate}
            initialTab={navigationParams.tab}
          />
        );
      
      case 'connections':
        return <Connections onNavigate={navigate} />;
      
      case 'calendar':
        return <Calendar onNavigate={navigate} />;
      
      case 'analytics':
        return <Analytics onNavigate={navigate} />;
      
      case 'venue-map':
        return <VenueMap onNavigate={navigate} />;
      
      case 'event-info':
        return <EventInfo onNavigate={navigate} />;
      
      case 'availability-settings':
        return <AvailabilitySettings onNavigate={navigate} />;
      
      case 'profile-viewers-list':
        return <ProfileViewersList onNavigate={navigate} />;
      
      case 'total-meeting-requests-list':
        // Placeholder for future implementation
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Total Meeting Requests</h2>
            <p className="text-gray-600">This feature will be implemented soon.</p>
            <button 
              onClick={() => navigate('analytics')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Analytics
            </button>
          </div>
        </div>;
      
      case 'accepted-meetings-list':
        // Placeholder for future implementation
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Accepted Meetings</h2>
            <p className="text-gray-600">This feature will be implemented soon.</p>
            <button 
              onClick={() => navigate('analytics')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Analytics
            </button>
          </div>
        </div>;
      
      case 'chat':
        return (
          <ChatScreen
            onNavigate={navigate}
            contactInfo={{
              name: navigationParams.name || 'Unknown',
              title: navigationParams.title || 'Unknown',
              company: navigationParams.company || 'Unknown',
              photo: navigationParams.photo || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
              type: navigationParams.type || 'message'
            }}
          />
        );
      
      case 'exhibitor-detail':
        const exhibitor = ParticipantService.getExhibitorById(navigationParams.exhibitorId || 0);
        return exhibitor ? (
          <ExhibitorDetail
            onNavigate={navigate}
            exhibitor={exhibitor}
          />
        ) : (
          <Dashboard onNavigate={navigate} />
        );
      
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  const showBottomNavigation = isAuthenticated && 
    !['login', 'my-events', 'chat', 'meeting-request', 'exhibitor-detail', 'venue-map', 'event-info', 'availability-settings'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentScreen()}
      
      {showBottomNavigation && (
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

export default App;