export const formatTime = (time: string): string => {
  return time;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

export const formatAttendeesCount = (count: number): string => {
  if (count >= 1000) {
    return `+${(count / 1000).toFixed(0)},000 attendees online`;
  }
  return `${count} attendees online`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Basic phone number formatting
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};