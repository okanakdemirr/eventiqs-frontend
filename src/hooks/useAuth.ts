import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const [userEmail, setUserEmail] = useLocalStorage('userEmail', '');

  const login = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserEmail('');
    setIsAuthenticated(false);
    localStorage.removeItem('selectedEvent');
  };

  return {
    isAuthenticated,
    userEmail,
    login,
    logout
  };
}