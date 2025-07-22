import { useState, useCallback } from 'react';
import { Screen } from '../types';

interface NavigationParams {
  [key: string]: any;
}

export function useNavigation() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [navigationParams, setNavigationParams] = useState<NavigationParams>({});

  const navigate = useCallback((screen: Screen, params: NavigationParams = {}) => {
    setCurrentScreen(screen);
    setNavigationParams(params);
  }, []);

  return {
    currentScreen,
    navigationParams,
    navigate,
    setCurrentScreen
  };
}