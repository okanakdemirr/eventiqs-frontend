export const APP_CONFIG = {
  name: 'Eventiqs',
  tagline: 'Connect. Network. Succeed.',
  version: '1.0.0'
} as const;

export const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'isAuthenticated',
  USER_EMAIL: 'userEmail',
  SELECTED_EVENT: 'selectedEvent',
  PREVIOUS_SCREEN: 'previousScreen'
} as const;

export const API_ENDPOINTS = {
  PROFILE_BASE: 'https://eventiqs.com/profile/',
  MAP_EMBED: 'https://beautyistanbul2025.expofp.com/'
} as const;

export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  LINKEDIN: 'linkedin'
} as const;

export const CONNECTION_TYPES = {
  QR_SCAN: 'qr_scan',
  BUSINESS_CARD: 'business_card',
  RECOMMENDATION: 'recommendation'
} as const;

export const EVENT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  UPCOMING: 'upcoming'
} as const;

export const USER_STATUS = {
  ONLINE: 'online',
  AWAY: 'away',
  OFFLINE: 'offline'
} as const;