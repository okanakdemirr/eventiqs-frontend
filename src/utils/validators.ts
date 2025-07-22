export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const isValidCompany = (company: string): boolean => {
  return company.trim().length >= 2;
};

export const isValidTitle = (title: string): boolean => {
  return title.trim().length >= 2;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // Phone is optional
  if (!isValidPhone(phone)) return 'Please enter a valid phone number';
  return null;
};

export const validateUrl = (url: string): string | null => {
  if (!url) return null; // URL is optional
  if (!isValidUrl(url)) return 'Please enter a valid URL';
  return null;
};