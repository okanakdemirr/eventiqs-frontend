export const STORAGE_KEYS = {
  SELECTED_EVENT: 'selectedEvent',
  USER_PROFILE: 'userProfile',
  AUTH_TOKEN: 'authToken',
  THEME_PREFERENCE: 'themePreference'
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

export const CONNECTION_TYPES = {
  QR_SCAN: 'qr_scan',
  BUSINESS_CARD: 'business_card',
  RECOMMENDATION: 'recommendation'
} as const;

export const MEETING_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const URGENCY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const;

export const CONFIDENCE_LEVELS = {
  HIGH: 'High match',
  MEDIUM: 'Medium match',
  LOW: 'Low match'
} as const;