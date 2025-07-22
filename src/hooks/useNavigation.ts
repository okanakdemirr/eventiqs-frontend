import { useState, useEffect } from 'react';
import { Screen } from '../types';
import { resetScrollPosition } from '../utils/scrollHelpers';

interface NavigationParams {
  tab?: string;
  name?: string;
  title?: string;
  company?: string;
  photo?: string;
  type?: string;
  exhibitorId?: number;
}

export function useNavigation() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [navigationParams, setNavigationParams] = useState<NavigationParams>({});

  const navigate = (screen: Screen, params?: NavigationParams) => {
    // Reset scroll position immediately when navigating
    resetScrollPosition();
    
    setCurrentScreen(screen);
    setNavigationParams(params || {});
    
    // Store navigation history
    localStorage.setItem('previousScreen', currentScreen);
    
    // Ensure scroll reset happens after state update and DOM render
    setTimeout(() => {
      resetScrollPosition();
    }, 0);
    
    // Additional scroll reset after a short delay to handle async content
    setTimeout(() => {
      resetScrollPosition();
    }, 100);
  };

  // Reset scroll when screen changes
  useEffect(() => {
    resetScrollPosition();
  }, [currentScreen]);

  return {
    currentScreen,
    navigationParams,
    navigate,
    setCurrentScreen
  };
}