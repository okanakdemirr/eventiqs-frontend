// Core data models and interfaces for the Eventiqs app

export interface UserProfile {
  name: string;
  title: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  profilePicture: string;
  interests: string[];
  currentEvents: string[];
}

export interface Visitor {
  id: number;
  name: string;
  title: string;
  company: string;
  photo: string;
  confidence: 'High match' | 'Medium match' | 'Low match';
  location: string;
  interests: string[];
  status: 'online' | 'away' | 'offline';
  lastActivity: string;
  buyerTags: string[];
  aiInsight: string;
  engagementActivity: string;
  urgency: 'High' | 'Medium' | 'Low';
  decisionStage: string;
  isConnected?: boolean;
}

export interface Connection {
  id: number;
  name: string;
  title: string;
  company: string;
  email: string | null;
  phone: string | null;
  connectedAt: string;
  connectionType: 'qr_scan' | 'business_card' | 'recommendation';
  meetingScheduled: boolean;
  lastMessage: string | null;
  photo: string;
  notes: string;
  hasFullAccess: boolean;
}

export interface Event {
  id: string;
  name: string;
  subtitle: string;
  dates: string;
  location: string;
  image: string;
  status: 'active' | 'completed' | 'upcoming';
  attendeesOnline?: number;
  stats?: {
    connections: number;
    leads: number;
    meetings: number;
  };
  finalStats?: {
    connections: number;
    leads: number;
    meetings: number;
  };
  countdown?: {
    days: number;
    hours: number;
  };
}

export interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
  meetingRequest?: {
    date: string;
    time: string;
    location: string;
  };
  isSystemMessage?: boolean;
}

export interface PerfectMatch {
  id: number;
  name: string;
  title: string;
  company: string;
  photo: string;
  status: 'online' | 'away';
  urgency: 'High' | 'Medium' | 'Low';
  buyerTags: string[];
  personalizedMessage: string;
  aiInsight: string;
  engagementActivity: string;
  lastEngagement: string;
  decisionStage: string;
}

export interface Meeting {
  id: number;
  contactName: string;
  contactTitle: string;
  contactCompany: string;
  contactPhoto: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Exhibitor {
  id: number;
  companyName: string;
  industry: string;
  boothLocation: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  relevanceScore: number;
  representatives: {
    name: string;
    role: string;
    photo: string;
  }[];
  availableSlots: string[];
}

export type Screen = 
  | 'login'
  | 'my-events'
  | 'dashboard'
  | 'qr-connect'
  | 'participants'
  | 'connections'
  | 'calendar'
  | 'analytics'
  | 'chat'
  | 'profile'
  | 'meeting-request'
  | 'exhibitor-detail'
  | 'venue-map'
  | 'event-info'
  | 'availability-settings'
  | 'profile-viewers-list'
  | 'total-meeting-requests-list'
  | 'accepted-meetings-list';

export interface QRScan {
  id: number;
  name: string;
  title: string;
  company: string;
  photo: string;
  scannedAt: string;
  connectionStatus: 'connected' | 'pending' | 'declined';
}

export interface AnalyticsData {
  totalConnections: number;
  meetingsScheduled: number;
  leadsGenerated: number;
  engagementRate: number;
  topInterests: string[];
  dailyActivity: { date: string; connections: number; meetings: number }[];
  connectionsByType: { type: string; count: number }[];
  meetingConversionRate: number;
}