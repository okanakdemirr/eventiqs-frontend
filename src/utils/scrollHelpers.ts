// Scroll utility functions for navigation
export const scrollToTop = (behavior: 'auto' | 'smooth' = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

export const resetScrollPosition = () => {
  // Immediate scroll reset for instant navigation
  window.scrollTo(0, 0);
  
  // Also reset any scrollable containers
  const scrollableElements = document.querySelectorAll('[data-scrollable]');
  scrollableElements.forEach(element => {
    element.scrollTop = 0;
  });
  
  // Reset body scroll position as well
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Hook for scroll reset on navigation
export const useScrollReset = () => {
  const resetScroll = (smooth = false) => {
    if (smooth) {
      smoothScrollToTop();
    } else {
      resetScrollPosition();
    }
  };

  return { resetScroll };
};

// Enhanced scroll reset for React components
export const resetScrollOnMount = () => {
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    resetScrollPosition();
  });
};