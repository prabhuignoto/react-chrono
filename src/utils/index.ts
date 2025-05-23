import {
  ButtonTexts,
  SlideShowType,
  TimelineMode,
} from '@models/TimelineModel';
import xss from 'xss';
import { darkTheme, defaultTheme } from '../components/common/themes';

// Constants to avoid creating new objects on every function call
const DEFAULT_CLASS_NAMES = Object.freeze({
  card: 'rc-card',
  cardMedia: 'rc-card-media',
  cardSubTitle: 'rc-card-subtitle',
  cardText: 'rc-card-text',
  cardTitle: 'rc-card-title',
  controls: 'rc-controls',
  title: 'rc-title',
} as const);

const DEFAULT_BUTTON_TEXTS: Readonly<ButtonTexts> = Object.freeze({
  changeDensity: 'Change density',
  changeDensityOptions: Object.freeze({
    high: Object.freeze({
      helpText: 'Show more items at once',
      text: 'High',
    }),
    low: Object.freeze({
      helpText: 'Show fewer items at once',
      text: 'Low',
    }),
  }),
  changeLayout: 'Change layout',
  changeLayoutOptions: Object.freeze({
    alternating: Object.freeze({
      helpText: 'Show cards in a vertical layout with alternating fashion',
      text: 'Alternating',
    }),
    horizontal: Object.freeze({
      helpText: 'Show cards in a horizontal layout',
      text: 'Horizontal',
    }),
    horizontal_all: Object.freeze({
      helpText: 'Show all cards in a horizontal layout',
      text: 'Show all cards',
    }),
    vertical: Object.freeze({
      helpText: 'Show cards in a vertical layout',
      text: 'Vertical',
    }),
  }),
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

// Pre-compiled regex for hex validation
const HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

// Character set for ID generation
const ID_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const ID_LENGTH = 7;

/**
 * Converts hex color to RGBA format
 * @param hex - Hex color code (e.g. #FFFFFF)
 * @param alpha - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export const hexToRGBA = (hex: string, alpha: number): string => {
  // Input validation
  if (typeof hex !== 'string' || typeof alpha !== 'number') {
    return `rgba(0, 0, 0, ${Math.max(0, Math.min(1, alpha || 0))})`;
  }

  // Validate hex format using regex (more efficient than manual checks)
  if (!HEX_COLOR_REGEX.test(hex)) {
    console.warn('Invalid hex color provided:', hex);
    return `rgba(0, 0, 0, ${Math.max(0, Math.min(1, alpha))})`;
  }

  // Extract RGB values directly with bit shifting (more efficient)
  const hexValue = parseInt(hex.slice(1), 16);
  const r = (hexValue >> 16) & 255;
  const g = (hexValue >> 8) & 255;
  const b = hexValue & 255;

  // Clamp alpha value between 0 and 1
  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
};

/**
 * Returns the appropriate theme based on dark mode preference
 * @param isDark - Whether dark mode is enabled
 * @returns Theme object
 */
export const getDefaultThemeOrDark = (isDark?: boolean) =>
  isDark ? darkTheme : defaultTheme;

/**
 * Returns default class names for timeline components
 * @returns Object of default CSS class names
 */
export const getDefaultClassNames = () => DEFAULT_CLASS_NAMES;

/**
 * Returns default button text translations
 * @returns Object containing all button text strings
 */
export const getDefaultButtonTexts = (): ButtonTexts => DEFAULT_BUTTON_TEXTS;

/**
 * Determines slideshow type based on timeline mode
 * @param mode - Timeline display mode
 * @returns Appropriate slideshow animation type
 */
export const getSlideShowType = (mode: TimelineMode): SlideShowType => {
  switch (mode) {
    case 'VERTICAL_ALTERNATING':
      return 'slide_from_sides';
    case 'HORIZONTAL':
    case 'VERTICAL':
    default:
      return 'reveal';
  }
};

/**
 * Type guard to check if text is an array of strings
 * @param text - Text string or array of strings
 * @returns Boolean indicating if input is string array
 */
export const isTextArray = (text: string | string[]): text is string[] =>
  Array.isArray(text);

/**
 * Sanitizes HTML text to prevent XSS attacks
 * @param text - Text string or array of strings to sanitize
 * @returns Sanitized text string or array
 */
export const sanitizeHtmlText = (
  text: string | string[],
): string | string[] => {
  if (!text) return '';

  try {
    return isTextArray(text) ? text.map((t) => xss(t || '')) : xss(text);
  } catch (error) {
    console.error('Error sanitizing HTML text:', error);
    return isTextArray(text) ? [] : '';
  }
};

/**
 * Generates a cryptographically secure random ID
 * @returns Unique string ID
 */
export const getUniqueID = (): string => {
  // Use crypto API if available (modern browsers)
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    try {
      const randomValues = new Uint8Array(ID_LENGTH);
      window.crypto.getRandomValues(randomValues);

      return Array.from(
        randomValues,
        (byte) => ID_CHARS[byte % ID_CHARS.length],
      ).join('');
    } catch (error) {
      console.error('Error generating unique ID:', error);
    }
  }

  // Fallback for environments without crypto API
  // Using a combination of timestamp and a more robust random generation
  const timestamp = Date.now().toString(36);

  // Use performance.now() for additional entropy if available
  const performanceTime =
    typeof performance !== 'undefined' && performance.now
      ? performance.now().toString().replace('.', '')
      : Date.now().toString();

  // Generate random part using timestamp-based seed for better distribution
  const seed = parseInt(performanceTime.slice(-6), 10);
  const randomPart = Array.from({ length: 8 }, (_, index) => {
    // Simple LCG algorithm for better distribution than Math.random
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    const value = (a * (seed + index) + c) % m;
    return ID_CHARS[value % ID_CHARS.length];
  }).join('');

  return `id-${timestamp}-${randomPart}`;
};
