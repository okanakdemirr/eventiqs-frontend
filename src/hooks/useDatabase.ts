import { useState, useEffect } from 'react';
import DatabaseService, { ParticipantProfile } from '../services/databaseService';

export function useDatabase() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleUpdate = () => {
      forceUpdate({});
    };

    DatabaseService.addListener(handleUpdate);
    return () => DatabaseService.removeListener(handleUpdate);
  }, []);

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-yellow-600';
    const icon = type === 'success' 
      ? '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>'
      : type === 'error'
      ? '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>'
      : '<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
    
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center`;
    toast.innerHTML = `${icon}${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3000);
  };

  // Bookmark functionality
  const toggleBookmark = (profileId: string, profileType: 'attendee' | 'company') => {
    const result = DatabaseService.toggleBookmark(profileId, profileType);
    showToast(result.message, 'success');
    return result.isBookmarked;
  };

  // Connection functionality
  const connectWithProfile = (profileId: string, profileType: 'attendee' | 'company') => {
    const result = DatabaseService.connectWithProfile(profileId, profileType);
    showToast(result.message, result.success ? 'success' : 'warning');
    return result.success;
  };

  // Disconnect functionality
  const disconnectProfile = (profileId: string, profileType: 'attendee' | 'company') => {
    const result = DatabaseService.disconnectProfile(profileId, profileType);
    showToast(result.message, result.success ? 'success' : 'warning');
    return result.success;
  };

  // QR Scan functionality
  const addQRScan = (profileData: {
    name: string;
    title: string;
    company: string;
    photo: string;
    email?: string;
    phone?: string;
    originalData?: any;
  }) => {
    const result = DatabaseService.addQRScan(profileData);
    showToast(result.message, result.success ? 'success' : 'warning');
    return result;
  };

  // QR Scan for representatives
  const addRepresentativeQRScan = (representativeData: {
    name: string;
    title: string;
    company: string;
    photo: string;
    email?: string;
    phone?: string;
    exhibitorId?: number;
    boothLocation?: string;
    originalData?: any;
  }) => {
    const result = DatabaseService.addRepresentativeQRScan(representativeData);
    showToast(result.message, result.success ? 'success' : 'warning');
    return result;
  };
  // Query functions
  const isBookmarked = (profileId: string) => DatabaseService.isBookmarked(profileId);
  const isConnected = (profileId: string) => DatabaseService.isConnected(profileId);
  const isQRScanned = (profileId: string) => DatabaseService.isQRScanned(profileId);
  const getProfile = (profileId: string) => DatabaseService.getProfile(profileId);
  const getProfileInteractionState = (profileId: string) => DatabaseService.getProfileInteractionState(profileId);

  // Data retrieval functions
  const getNetworkData = () => DatabaseService.getNetworkData();
  const getAttendeeProfiles = () => DatabaseService.getAttendeeProfiles();
  const getCompanyProfiles = () => DatabaseService.getCompanyProfiles();
  const getStats = () => DatabaseService.getStats();

  // Representative data
  const getConnectedRepresentatives = () => DatabaseService.getConnectedRepresentatives();
  const getQRScannedRepresentatives = () => DatabaseService.getQRScannedRepresentatives();
  return {
    // Actions
    toggleBookmark,
    connectWithProfile,
    disconnectProfile,
    addQRScan,
    addRepresentativeQRScan,
    showToast,
    
    // Queries
    isBookmarked,
    isConnected,
    isQRScanned,
    getProfile,
    getProfileInteractionState,
    
    // Data
    getNetworkData,
    getAttendeeProfiles,
    getCompanyProfiles,
    getStats,
    getConnectedRepresentatives,
    getQRScannedRepresentatives
  };
}