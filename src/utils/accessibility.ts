/**
 * Accessibility utilities for React Chrono
 * Provides helper functions for common accessibility patterns
 */

/**
 * Generates unique IDs for accessibility attributes
 * @param prefix - The prefix for the ID
 * @param suffix - Optional suffix for the ID
 * @returns A unique ID string
 */
export const generateAccessibilityId = (prefix: string, suffix?: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}${suffix ? `-${suffix}` : ''}`;
};

/**
 * Creates an accessible announcement for screen readers
 * @param message - The message to announce
 * @param priority - The priority level ('polite' | 'assertive')
 * @returns A function that creates and removes the announcement element
 */
export const announceToScreenReader = (
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('role', 'status');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Standard keyboard event handler for buttons and interactive elements
 * @param event - The keyboard event
 * @param callback - The function to call when Enter or Space is pressed
 */
export const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

/**
 * Standard keyboard event handler for Escape key
 * @param event - The keyboard event
 * @param callback - The function to call when Escape is pressed
 */
export const handleEscapeKey = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

/**
 * Gets accessible text from a ReactNode
 * @param content - The ReactNode to extract text from
 * @returns A string representation of the content
 */
export const getAccessibleText = (content: React.ReactNode): string => {
  if (content === null || content === undefined) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
  if (typeof content === 'number' || typeof content === 'boolean') {
    return String(content);
  }
  // For complex React nodes, we'll just return empty string
  // In a real implementation, you might want to traverse the tree
  return '';
};

/**
 * Focus management utility for timeline navigation
 * @param element - The element to focus
 * @param options - Focus options
 */
export const manageFocus = (
  element: HTMLElement | null, 
  options: {
    preventScroll?: boolean;
    announceChange?: boolean;
    announcement?: string;
  } = {}
): void => {
  if (!element) return;
  
  const { preventScroll = false, announceChange = false, announcement } = options;
  
  element.focus({ preventScroll });
  
  if (announceChange && announcement) {
    announceToScreenReader(announcement);
  }
};

/**
 * Reduces motion check for accessibility
 * @returns true if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * High contrast mode detection
 * @returns true if high contrast mode is enabled
 */
export const isHighContrastMode = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Creates accessible navigation announcements
 * @param current - Current item number (1-based)
 * @param total - Total number of items
 * @param itemType - Type of items (e.g., "timeline item", "search result")
 * @returns Formatted announcement string
 */
export const createNavigationAnnouncement = (
  current: number,
  total: number,
  itemType: string = 'item'
): string => {
  return `${itemType} ${current} of ${total}`;
};

/**
 * ARIA attributes for timeline components
 */
export const ARIA_ATTRIBUTES = {
  TIMELINE_MAIN: {
    role: 'main',
    'aria-label': 'Timeline content',
  },
  TIMELINE_LIST: {
    role: 'list',
    'aria-label': 'Timeline items',
  },
  TIMELINE_ITEM: {
    role: 'listitem',
  },
  TIMELINE_POINT: {
    role: 'button',
  },
  TIMELINE_CARD: {
    role: 'region',
  },
  NAVIGATION_TOOLBAR: {
    role: 'toolbar',
    'aria-orientation': 'horizontal',
    'aria-label': 'Timeline navigation controls',
  },
  POPOVER_TRIGGER: {
    role: 'button',
    'aria-haspopup': 'menu',
  },
  POPOVER_CONTENT: {
    role: 'menu',
  },
} as const;

export default {
  generateAccessibilityId,
  announceToScreenReader,
  handleKeyboardActivation,
  handleEscapeKey,
  getAccessibleText,
  manageFocus,
  prefersReducedMotion,
  isHighContrastMode,
  createNavigationAnnouncement,
  ARIA_ATTRIBUTES,
};
