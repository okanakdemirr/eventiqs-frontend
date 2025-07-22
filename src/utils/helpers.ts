import { EVENT_STATUS, USER_STATUS } from './constants';

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export const getUrgencyColors = (urgency: string): string => {
  const colors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200'
  };
  return colors[urgency as keyof typeof colors] || colors.Low;
};

export const getConfidenceColors = (confidence: string): string => {
  const colors = {
    'High match': 'bg-green-100 text-green-800',
    'Medium match': 'bg-yellow-100 text-yellow-800',
    'Low match': 'bg-gray-100 text-gray-800'
  };
  return colors[confidence as keyof typeof colors] || colors['Low match'];
};

export const getConnectionTypeIcon = (type: string): string => {
  switch (type) {
    case 'qr_scan':
      return '📱';
    case 'business_card':
      return '💳';
    case 'recommendation':
      return '🤖';
    default:
      return '👤';
  }
};

export const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export const generateProfileUrl = (name: string): string => {
  return `https://eventiqs.com/profile/${name.replace(' ', '').toLowerCase()}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};

export const shareContent = async (content: { title: string; text: string; url: string }): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share(content);
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
      return false;
    }
  }
  return copyToClipboard(content.url);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};