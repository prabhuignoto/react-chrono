import { darkTheme, defaultTheme } from '../components/common/themes';

export const uniqueID = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 7; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};

export const hexToRGBA = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  debugger;

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

export const getDefaultButtonTexts = () => ({
  first: 'Go to First',
  last: 'Go to Last',
  next: 'Next',
  play: 'Play Slideshow',
  previous: 'Previous',
});
