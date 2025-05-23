import {
  ButtonTexts,
  SlideShowType,
  TimelineMode,
} from '@models/TimelineModel';
import xss from 'xss';
import { darkTheme, defaultTheme } from '../components/common/themes';

/**
 * Converts hex color to RGBA format
 * @param hex - Hex color code (e.g. #FFFFFF)
 * @param alpha - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export const hexToRGBA = (hex: string, alpha: number): string => {
  if (!hex || !hex.startsWith('#') || hex.length !== 7) {
    console.warn('Invalid hex color provided:', hex);
    return `rgba(0, 0, 0, ${alpha})`;
  }

  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return `rgba(0, 0, 0, ${alpha})`;
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (error) {
    console.error('Error converting hex to RGBA:', error);
    return `rgba(0, 0, 0, ${alpha})`;
  }
};

/**
 * Returns the appropriate theme based on dark mode preference
 * @param isDark - Whether dark mode is enabled
 * @returns Theme object
 */
export const getDefaultThemeOrDark = (isDark?: boolean) => {
  if (isDark) {
    return darkTheme;
  }
  return defaultTheme;
};

/**
 * Returns default class names for timeline components
 * @returns Object of default CSS class names
 */
export const getDefaultClassNames = () => ({
  card: 'rc-card',
  cardMedia: 'rc-card-media',
  cardSubTitle: 'rc-card-subtitle',
  cardText: 'rc-card-text',
  cardTitle: 'rc-card-title',
  controls: 'rc-controls',
  title: 'rc-title',
});

/**
 * Returns default button text translations
 * @returns Object containing all button text strings
 */
export const getDefaultButtonTexts: () => ButtonTexts = () => ({
  changeDensity: 'Change density',
  changeDensityOptions: {
    high: {
      helpText: 'Show more items at once',
      text: 'High',
    },
    low: {
      helpText: 'Show fewer items at once',
      text: 'Low',
    },
  },
  changeLayout: 'Change layout',
  changeLayoutOptions: {
    alternating: {
      helpText: 'Show cards in a vertical layout with alternating fashion',
      text: 'Alternating',
    },
    horizontal: {
      helpText: 'Show cards in a horizontal layout',
      text: 'Horizontal',
    },
    horizontal_all: {
      helpText: 'Show all cards in a horizontal layout',
      text: 'Show all cards',
    },
    vertical: {
      helpText: 'Show cards in a vertical layout',
      text: 'Vertical',
    },
  },
  dark: 'Switch to Dark Mode',
  first: 'Go to First',
  jumpTo: 'Jump to',
  last: 'Go to Last',
  light: 'Switch to Light Mode',
  next: 'Next',
  play: 'Play Slideshow',
  previous: 'Previous',
  stop: 'Stop Slideshow',
  searchPlaceholder: 'Search Timeline',
  searchAriaLabel: 'Search timeline content',
  clearSearch: 'Clear Search',
  previousMatch: 'Previous Match',
  nextMatch: 'Next Match',
  timelinePoint: 'Timeline point',
});

/**
 * Determines slideshow type based on timeline mode
 * @param mode - Timeline display mode
 * @returns Appropriate slideshow animation type
 */
export const getSlideShowType = (mode: TimelineMode): SlideShowType => {
  if (!mode) {
    return 'reveal';
  }

  if (mode === 'HORIZONTAL' || mode === 'VERTICAL') {
    return 'reveal';
  }

  if (mode === 'VERTICAL_ALTERNATING') {
    return 'slide_from_sides';
  }

  return 'reveal';
};

/**
 * Type guard to check if text is an array of strings
 * @param text - Text string or array of strings
 * @returns Boolean indicating if input is string array
 */
export const isTextArray = (text: string | string[]): text is string[] => {
  return Array.isArray(text);
};

/**
 * Sanitizes HTML text to prevent XSS attacks
 * @param text - Text string or array of strings to sanitize
 * @returns Sanitized text string or array
 */
export const sanitizeHtmlText = (text: string | string[]) => {
  if (!text) return '';

  try {
    if (isTextArray(text)) {
      return text.map((t) => xss(t || ''));
    }
    return xss(text);
  } catch (error) {
    console.error('Error sanitizing HTML text:', error);
    return '';
  }
};

/**
 * Generates a cryptographically secure random ID
 * @returns Unique string ID
 */
export const getUniqueID = (): string => {
  if (typeof window === 'undefined' || !window.crypto) {
    console.warn('Crypto API not available, using fallback ID method');
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  try {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let autoId = '';
    const randomValues = new Uint32Array(7);

    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < randomValues.length; i++) {
      autoId += chars[randomValues[i] % chars.length];
    }

    return autoId;
  } catch (error) {
    console.error('Error generating unique ID:', error);
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};
