import { Event, Visitor, Connection, PerfectMatch, Meeting, QRScan, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'Sarah Johnson',
  title: 'Sales Director',
  company: 'TechCorp Solutions',
  bio: 'Experienced sales leader focused on B2B technology solutions and strategic partnerships.',
  email: 'sarah.johnson@techcorp.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/sarahjohnson',
  website: 'techcorp.com',
  profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
  interests: ['Enterprise Software', 'AI & Machine Learning', 'Digital Transformation'],
  currentEvents: ['emitt-2025']
};

export const mockEvents: Event[] = [
  {
    id: 'emitt-2025',
    name: 'EMITT 2025',
    subtitle: '28th East Mediterranean International Tourism & Travel Exhibition',
    dates: 'Feb 5-7, 2025',
    location: 'Tüyap Fair and Congress Center, Istanbul',
    image: '/Emitt_2025.png',
    status: 'active',
    attendeesOnline: 50000,
    stats: {
      connections: 47,
      leads: 42,
      meetings: 8
    }
  },
  {
    id: 'tech-expo-2024',
    name: 'Tech Expo 2024',
    subtitle: 'Innovation & Digital Transformation',
    dates: 'Jan 15-17, 2024',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    status: 'completed',
    finalStats: {
      connections: 89,
      leads: 76,
      meetings: 15
    }
  },
  {
    id: 'startup-week-2024',
    name: 'Startup Week 2024',
    subtitle: 'Entrepreneurship & Innovation',
    dates: 'Mar 22-26, 2024',
    location: 'Austin, TX',
    image: 'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    status: 'upcoming',
    countdown: {
      days: 45,
      hours: 12
    }
  }
];

export const mockVisitors: Visitor[] = [
  {
    id: 1,
    name: 'Michael Chen',
    title: 'CTO',
    company: 'DataFlow Inc',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    confidence: 'High match',
    location: 'Booth A12',
    interests: ['Cloud Computing', 'Data Analytics', 'AI'],
    status: 'online',
    lastActivity: '2 min ago',
    buyerTags: ['Decision Maker', 'Budget Authority'],
    aiInsight: 'Looking for enterprise data solutions, actively evaluating vendors',
    engagementActivity: 'Visited 3 vendor booths, downloaded 2 whitepapers',
    urgency: 'High',
    decisionStage: 'Evaluation Phase',
    isConnected: false
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    title: 'VP of Engineering',
    company: 'NextGen Systems',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    confidence: 'High match',
    location: 'Conference Room B',
    interests: ['DevOps', 'Cloud Architecture', 'Security'],
    status: 'away',
    lastActivity: '15 min ago',
    buyerTags: ['Technical Decision Maker', 'Influencer'],
    aiInsight: 'Seeking cloud migration solutions for enterprise applications',
    engagementActivity: 'Attended 2 tech talks, connected with 5 vendors',
    urgency: 'Medium',
    decisionStage: 'Research Phase',
    isConnected: true
  },
  {
    id: 3,
    name: 'David Kim',
    title: 'Product Manager',
    company: 'InnovateLab',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    confidence: 'Medium match',
    location: 'Main Hall',
    interests: ['Product Analytics', 'UX Design', 'Mobile Tech'],
    status: 'online',
    lastActivity: 'Just now',
    buyerTags: ['Evaluator', 'End User'],
    aiInsight: 'Interested in analytics tools for product optimization',
    engagementActivity: 'Viewed demo presentations, asked technical questions',
    urgency: 'Low',
    decisionStage: 'Discovery Phase',
    isConnected: false
  },
  {
    id: 4,
    name: 'Sarah Williams',
    title: 'Chief Digital Officer',
    company: 'Global Enterprises',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    confidence: 'High match',
    location: 'VIP Lounge',
    interests: ['Digital Transformation', 'Enterprise Software', 'AI'],
    status: 'online',
    lastActivity: '5 min ago',
    buyerTags: ['C-Level', 'Strategic Decision Maker'],
    aiInsight: 'Leading digital transformation initiative, $5M budget approved',
    engagementActivity: 'Scheduled 4 vendor meetings, attending keynote sessions',
    urgency: 'High',
    decisionStage: 'Vendor Selection',
    isConnected: false
  },
  {
    id: 5,
    name: 'James Thompson',
    title: 'IT Director',
    company: 'Manufacturing Corp',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    confidence: 'Medium match',
    location: 'Tech Theater',
    interests: ['Infrastructure', 'Security', 'Automation'],
    status: 'away',
    lastActivity: '30 min ago',
    buyerTags: ['Technical Evaluator', 'Implementation Lead'],
    aiInsight: 'Modernizing legacy systems, evaluating cloud solutions',
    engagementActivity: 'Attended security workshops, downloaded compliance guides',
    urgency: 'Medium',
    decisionStage: 'Technical Evaluation',
    isConnected: false
  }
];

export const mockConnections: Connection[] = [
  {
    id: 1,
    name: 'Alex Thompson',
    title: 'CEO',
    company: 'StartupX',
    email: 'alex@startupx.com',
    phone: '+1 (555) 987-6543',
    connectedAt: '2024-01-15T10:30:00Z',
    connectionType: 'qr_scan',
    meetingScheduled: true,
    lastMessage: 'Looking forward to our meeting tomorrow!',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    notes: 'Interested in enterprise solutions, follow up on pricing',
    hasFullAccess: true
  },
  {
    id: 2,
    name: 'Jennifer Wu',
    title: 'Marketing Director',
    company: 'GrowthCo',
    email: null,
    phone: null,
    connectedAt: '2024-01-15T14:20:00Z',
    connectionType: 'recommendation',
    meetingScheduled: false,
    lastMessage: null,
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    notes: 'AI recommendation - high potential lead',
    hasFullAccess: false
  },
  {
    id: 3,
    name: 'Alex Thompson',
    title: 'CEO',
    company: 'StartupX',
    email: 'alex@startupx.com',
    phone: '+1 (555) 987-6543',
    connectedAt: '2024-01-15T10:30:00Z',
    connectionType: 'qr_scan',
    meetingScheduled: true,
    lastMessage: 'Looking forward to our meeting tomorrow!',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    notes: 'Interested in enterprise solutions, follow up on pricing',
    hasFullAccess: true
  },
  {
    id: 4,
    name: 'Jennifer Wu',
    title: 'Marketing Director',
    company: 'GrowthCo',
    email: null,
    phone: null,
    connectedAt: '2024-01-15T14:20:00Z',
    connectionType: 'recommendation',
    meetingScheduled: false,
    lastMessage: null,
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    notes: 'AI recommendation - high potential lead',
    hasFullAccess: false
  }
];

export const mockPerfectMatches: PerfectMatch[] = [
  {
    id: 1,
    name: 'Robert Martinez',
    title: 'VP of Technology',
    company: 'Enterprise Corp',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'online',
    urgency: 'High',
    buyerTags: ['Decision Maker', 'Budget Authority', 'Urgent Need'],
    personalizedMessage: 'Hi Robert, noticed you\'re evaluating cloud solutions. Our enterprise platform helped similar companies reduce costs by 40%.',
    aiInsight: '92% match based on company size, tech stack, and current initiatives',
    engagementActivity: 'Viewed your booth page 5 times, downloaded pricing guide',
    lastEngagement: '10 minutes ago',
    decisionStage: 'Ready to Buy'
  },
  {
    id: 2,
    name: 'Lisa Chang',
    title: 'Chief Innovation Officer',
    company: 'FutureTech Solutions',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'away',
    urgency: 'Medium',
    buyerTags: ['Influencer', 'Technical Evaluator'],
    personalizedMessage: 'Hi Lisa, saw your interest in AI innovation. Would love to show you our latest ML capabilities.',
    aiInsight: '78% match - strong alignment with innovation focus',
    engagementActivity: 'Attended your competitor analysis session',
    lastEngagement: '1 hour ago',
    decisionStage: 'Evaluation Phase'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    title: 'Director of Operations',
    company: 'Scale Dynamics',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    status: 'online',
    urgency: 'High',
    buyerTags: ['Process Owner', 'Implementation Lead'],
    personalizedMessage: 'Hi Marcus, your operational efficiency goals align perfectly with our automation solutions.',
    aiInsight: '85% match - operational challenges match our solution strengths',
    engagementActivity: 'Downloaded ROI calculator, viewed case studies',
    lastEngagement: '25 minutes ago',
    decisionStage: 'Vendor Comparison'
  }
];

export const mockExhibitors = [
  {
    id: 1,
    companyName: 'CloudTech Solutions',
    industry: 'Cloud Computing & Infrastructure',
    boothLocation: 'Hall A - Booth 101',
    description: 'Leading provider of enterprise cloud solutions and digital transformation services.',
    website: 'www.cloudtech.com',
    email: 'info@cloudtech.com',
    phone: '+1 (555) 123-4567',
    photo: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    relevanceScore: 95,
    representatives: [
      {
        name: 'John Smith',
        role: 'VP of Sales',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'Maria Garcia',
        role: 'Solutions Architect',
        photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'David Lee',
        role: 'Technical Specialist',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    ],
    availableSlots: ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM']
  },
  {
    id: 2,
    companyName: 'AI Innovations Inc',
    industry: 'Artificial Intelligence & Machine Learning',
    boothLocation: 'Hall B - Booth 205',
    description: 'Cutting-edge AI solutions for enterprise automation and intelligent decision making.',
    website: 'www.aiinnovations.com',
    email: 'contact@aiinnovations.com',
    phone: '+1 (555) 234-5678',
    photo: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    relevanceScore: 88,
    representatives: [
      {
        name: 'Dr. Sarah Chen',
        role: 'Chief Technology Officer',
        photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'Michael Rodriguez',
        role: 'AI Solutions Manager',
        photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    ],
    availableSlots: ['9:30 AM', '1:00 PM', '4:00 PM']
  },
  {
    id: 3,
    companyName: 'SecureNet Systems',
    industry: 'Cybersecurity & Data Protection',
    boothLocation: 'Hall A - Booth 150',
    description: 'Enterprise cybersecurity solutions protecting businesses from evolving digital threats.',
    website: 'www.securenet.com',
    email: 'sales@securenet.com',
    phone: '+1 (555) 345-6789',
    photo: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    relevanceScore: 82,
    representatives: [
      {
        name: 'Robert Kim',
        role: 'Security Consultant',
        photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'Jennifer Walsh',
        role: 'Product Manager',
        photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'Alex Thompson',
        role: 'Technical Sales Engineer',
        photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    ],
    availableSlots: ['10:30 AM', '12:00 PM', '2:30 PM', '4:30 PM']
  },
  {
    id: 4,
    companyName: 'DataFlow Analytics',
    industry: 'Business Intelligence & Analytics',
    boothLocation: 'Hall C - Booth 301',
    description: 'Advanced analytics platform helping businesses make data-driven decisions.',
    website: 'www.dataflow.com',
    email: 'hello@dataflow.com',
    phone: '+1 (555) 456-7890',
    photo: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    relevanceScore: 76,
    representatives: [
      {
        name: 'Lisa Park',
        role: 'Data Scientist',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'James Wilson',
        role: 'Business Development',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    ],
    availableSlots: ['11:00 AM', '1:30 PM', '3:00 PM']
  },
  {
    id: 5,
    companyName: 'Mobile First Technologies',
    industry: 'Mobile App Development',
    boothLocation: 'Hall B - Booth 180',
    description: 'Enterprise mobile solutions and cross-platform application development.',
    website: 'www.mobilefirst.com',
    email: 'info@mobilefirst.com',
    phone: '+1 (555) 567-8901',
    photo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    relevanceScore: 65,
    representatives: [
      {
        name: 'Emma Davis',
        role: 'Mobile Solutions Lead',
        photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      },
      {
        name: 'Carlos Martinez',
        role: 'UX/UI Designer',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
      }
    ],
    availableSlots: ['9:00 AM', '12:30 PM', '4:00 PM']
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: 1,
    contactName: 'Alex Thompson',
    contactTitle: 'CEO',
    contactCompany: 'StartupX',
    contactPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    date: '2024-01-16',
    time: '10:00 AM',
    duration: 30,
    location: 'Meeting Room A3',
    status: 'scheduled',
    notes: 'Discuss enterprise pricing and implementation timeline'
  },
  {
    id: 2,
    contactName: 'Michael Chen',
    contactTitle: 'CTO',
    contactCompany: 'DataFlow Inc',
    contactPhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    date: '2024-01-16',
    time: '2:30 PM',
    duration: 45,
    location: 'Booth B12',
    status: 'scheduled'
  }
];

export const mockQRScans: QRScan[] = [
  {
    id: 1,
    name: 'Jessica Adams',
    title: 'Product Manager',
    company: 'TechFlow',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    scannedAt: '2024-01-15T16:45:00Z',
    connectionStatus: 'connected'
  },
  {
    id: 2,
    name: 'Mark Johnson',
    title: 'Sales Director',
    company: 'CloudSoft',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    scannedAt: '2024-01-15T14:20:00Z',
    connectionStatus: 'pending'
  }
];

// Mock profile viewers data
export const mockProfileViewers = [
  {
    id: 1,
    name: 'Robert Martinez',
    title: 'VP of Technology',
    company: 'Enterprise Corp',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-16T14:30:00Z',
    viewDuration: '45 seconds',
    matchPercentage: 92,
    status: 'online'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    title: 'Solutions Architect',
    company: 'Tech Innovations',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-16T12:15:00Z',
    viewDuration: '1 minute 20 seconds',
    matchPercentage: 88,
    status: 'away'
  },
  {
    id: 3,
    name: 'David Chen',
    title: 'Business Development',
    company: 'Global Systems',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-15T16:45:00Z',
    viewDuration: '2 minutes 10 seconds',
    matchPercentage: 85,
    status: 'offline'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    title: 'Marketing Director',
    company: 'Digital Solutions',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-14T10:20:00Z',
    viewDuration: '55 seconds',
    matchPercentage: 79,
    status: 'online'
  },
  {
    id: 5,
    name: 'Michael Rodriguez',
    title: 'Chief Technology Officer',
    company: 'Innovation Labs',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-14T09:30:00Z',
    viewDuration: '3 minutes 5 seconds',
    matchPercentage: 94,
    status: 'online'
  },
  {
    id: 6,
    name: 'Jennifer Walsh',
    title: 'VP of Engineering',
    company: 'TechStart Inc',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-14T08:45:00Z',
    viewDuration: '1 minute 45 seconds',
    matchPercentage: 87,
    status: 'away'
  },
  {
    id: 7,
    name: 'Alex Thompson',
    title: 'Product Manager',
    company: 'Future Tech',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T17:20:00Z',
    viewDuration: '40 seconds',
    matchPercentage: 76,
    status: 'offline'
  },
  {
    id: 8,
    name: 'Lisa Park',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T15:10:00Z',
    viewDuration: '2 minutes 30 seconds',
    matchPercentage: 82,
    status: 'online'
  },
  {
    id: 9,
    name: 'James Wilson',
    title: 'Business Development',
    company: 'Growth Partners',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T14:25:00Z',
    viewDuration: '1 minute 15 seconds',
    matchPercentage: 73,
    status: 'away'
  },
  {
    id: 10,
    name: 'Emma Davis',
    title: 'Mobile Solutions Lead',
    company: 'App Innovations',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T13:40:00Z',
    viewDuration: '50 seconds',
    matchPercentage: 78,
    status: 'online'
  },
  {
    id: 11,
    name: 'Carlos Martinez',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T12:55:00Z',
    viewDuration: '1 minute 35 seconds',
    matchPercentage: 71,
    status: 'offline'
  },
  {
    id: 12,
    name: 'Dr. Sarah Chen',
    title: 'Chief Technology Officer',
    company: 'AI Research Labs',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T11:30:00Z',
    viewDuration: '4 minutes 20 seconds',
    matchPercentage: 96,
    status: 'online'
  },
  {
    id: 13,
    name: 'Kevin Brown',
    title: 'Sales Director',
    company: 'Revenue Growth Co',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T10:15:00Z',
    viewDuration: '1 minute 10 seconds',
    matchPercentage: 84,
    status: 'away'
  },
  {
    id: 14,
    name: 'Amanda Foster',
    title: 'Operations Manager',
    company: 'Efficiency Systems',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-13T09:45:00Z',
    viewDuration: '2 minutes 45 seconds',
    matchPercentage: 80,
    status: 'online'
  },
  {
    id: 15,
    name: 'Ryan Cooper',
    title: 'Technical Lead',
    company: 'Code Masters',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T16:30:00Z',
    viewDuration: '1 minute 55 seconds',
    matchPercentage: 89,
    status: 'offline'
  },
  {
    id: 16,
    name: 'Nicole Turner',
    title: 'Product Strategy',
    company: 'Strategy First',
    photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T15:20:00Z',
    viewDuration: '3 minutes 15 seconds',
    matchPercentage: 91,
    status: 'online'
  },
  {
    id: 17,
    name: 'Daniel Kim',
    title: 'Security Consultant',
    company: 'SecureNet Pro',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T14:10:00Z',
    viewDuration: '1 minute 25 seconds',
    matchPercentage: 77,
    status: 'away'
  },
  {
    id: 18,
    name: 'Rachel Green',
    title: 'Marketing Specialist',
    company: 'Brand Builders',
    photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T13:35:00Z',
    viewDuration: '45 seconds',
    matchPercentage: 74,
    status: 'online'
  },
  {
    id: 19,
    name: 'Mark Johnson',
    title: 'IT Director',
    company: 'Tech Solutions Inc',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T12:50:00Z',
    viewDuration: '2 minutes 5 seconds',
    matchPercentage: 86,
    status: 'offline'
  },
  {
    id: 20,
    name: 'Sophie Anderson',
    title: 'Business Analyst',
    company: 'Data Insights Co',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T11:40:00Z',
    viewDuration: '1 minute 30 seconds',
    matchPercentage: 83,
    status: 'online'
  },
  {
    id: 21,
    name: 'Thomas Lee',
    title: 'DevOps Engineer',
    company: 'Cloud Native Systems',
    photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T10:25:00Z',
    viewDuration: '3 minutes 40 seconds',
    matchPercentage: 90,
    status: 'away'
  },
  {
    id: 22,
    name: 'Jessica White',
    title: 'Project Manager',
    company: 'Agile Solutions',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T09:15:00Z',
    viewDuration: '1 minute 50 seconds',
    matchPercentage: 75,
    status: 'online'
  },
  {
    id: 23,
    name: 'Andrew Miller',
    title: 'Software Architect',
    company: 'Architecture Plus',
    photo: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    viewedAt: '2024-01-12T08:30:00Z',
    viewDuration: '2 minutes 20 seconds',
    matchPercentage: 88,
    status: 'offline'
  }
];