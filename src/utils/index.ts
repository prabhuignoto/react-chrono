import {
  ButtonTexts,
  SlideShowType,
  TimelineMode,
} from '@models/TimelineModel';
import xss from 'xss';
import { darkTheme, defaultTheme } from '../components/common/themes';

export const hexToRGBA = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getDefaultThemeOrDark = (isDark?: boolean) => {
  if (isDark) {
    return darkTheme;
  }
  return defaultTheme;
};

export const getDefaultClassNames = () => ({
  card: 'rc-card',
  cardMedia: 'rc-card-media',
  cardSubTitle: 'rc-card-subtitle',
  cardText: 'rc-card-text',
  cardTitle: 'rc-card-title',
  controls: 'rc-controls',
  title: 'rc-title',
});

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
});

//get slidehow type based on mode

export const getSlideShowType: (mode: TimelineMode) => SlideShowType = (
  mode,
) => {
  if (mode === 'HORIZONTAL') {
    return 'reveal';
  }
  if (mode === 'VERTICAL') {
    return 'reveal';
  }

  if (mode === 'VERTICAL_ALTERNATING') {
    return 'slide_from_sides';
  }

  return 'reveal';
};

export const isTextArray = (text: string | string[]): text is string[] => {
  return Array.isArray(text);
};

export const sanitizeHtmlText = (text: string | string[]) => {
  if (isTextArray(text)) {
    return text.map((t) => xss(t));
  }
  return xss(text);
};

export const getUniqueID = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let autoId = '';

  const randomValues = new Uint32Array(7);

  window.crypto.getRandomValues(randomValues);

  for (let i = 0; i < randomValues.length; i++) {
    autoId += chars[randomValues[i] % chars.length];
  }

  return autoId;
};
