import { globalFontFace, globalStyle, keyframes } from '@vanilla-extract/css';
import { lightTheme, darkTheme } from '../tokens/themes.css';
import { tokens } from '../tokens/index.css';

// Font face declarations
globalFontFace('Inter', {
  src: 'local(Inter)',
  fontDisplay: 'swap',
  fontStyle: 'normal',
  fontWeight: '400 700',
});

// CSS Reset and base styles
globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html, body, #root', {
  margin: 0,
  padding: 0,
  height: '100%',
});

globalStyle('html', {
  scrollPaddingTop: '2rem',
  // Prevent layout shifts during font loading
  fontOpticalSizing: 'auto',
});

globalStyle('body', {
  backgroundColor: tokens.semantic.color.background.primary,
  color: tokens.semantic.color.text.primary,
  fontFamily: `var(--timeline-font-family, 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif')`,
  fontSize: tokens.semantic.typography.fontSize.body,
  lineHeight: tokens.semantic.typography.lineHeight.normal,
  fontWeight: tokens.semantic.typography.fontWeight.normal,
  overflowX: 'hidden',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  // Prevent iOS zoom on input focus
  WebkitTextSizeAdjust: '100%',
});

// Theme class setup - simplified
globalStyle(`:root, .${lightTheme}`, {
  colorScheme: 'light',
});

globalStyle(`.${darkTheme}`, {
  colorScheme: 'dark',
});

// Accessibility improvements
globalStyle('[tabindex="-1"]:focus', {
  outline: 'none !important',
});

// Enhanced focus-visible styles for WCAG 2.4.11 (Focus Appearance - Level AA)
// Requires 3:1 contrast ratio and at least 2px thick indicator
globalStyle(':focus-visible', {
  outline: `3px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
  // Add box-shadow as secondary indicator for better visibility
  boxShadow: `0 0 0 1px ${tokens.semantic.color.border.interactive}40`,
});

// Reduced motion support
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      transition: 'none !important',
    },
  },
});

// High contrast mode support
globalStyle('*', {
  '@media': {
    '(prefers-contrast: high)': {
      filter: 'none !important',
      backdropFilter: 'none !important',
    },
  },
});

// Print styles
globalStyle('*', {
  '@media': {
    print: {
      background: 'transparent !important',
      boxShadow: 'none !important',
      textShadow: 'none !important',
    },
  },
});

globalStyle('body', {
  '@media': {
    print: {
      fontSize: '12pt',
      lineHeight: 1.5,
    },
  },
});

// Focus management for timeline components
globalStyle('[data-timeline-wrapper]', {
  isolation: 'isolate',
});

globalStyle(
  '[data-timeline-wrapper][data-keyboard-navigation="true"] :focus-visible',
  {
    outline: `3px solid ${tokens.semantic.color.border.interactive}`,
    outlineOffset: '2px',
    borderRadius: tokens.semantic.borderRadius.sm,
    boxShadow: `0 0 0 1px ${tokens.semantic.color.border.interactive}40`,
  },
);

// Dark mode specific focus colors for better contrast
globalStyle(`.${darkTheme} :focus-visible`, {
  outline: '3px solid #58A6FF',
  boxShadow: '0 0 0 1px #58A6FF40',
});

globalStyle(
  `.${darkTheme} [data-timeline-wrapper][data-keyboard-navigation="true"] :focus-visible`,
  {
    outline: '3px solid #58A6FF',
    boxShadow: '0 0 0 1px #58A6FF40',
  },
);

// Scrollbar styling for webkit browsers
globalStyle('::-webkit-scrollbar', {
  width: '8px',
  height: '8px',
});

globalStyle('::-webkit-scrollbar-track', {
  background: tokens.semantic.color.background.secondary,
});

globalStyle('::-webkit-scrollbar-thumb', {
  background: tokens.semantic.color.border.default,
  borderRadius: tokens.semantic.borderRadius.full,
});

globalStyle('::-webkit-scrollbar-thumb:hover', {
  background: tokens.semantic.color.border.emphasis,
});

// Firefox scrollbar
globalStyle('*', {
  scrollbarWidth: 'thin',
  scrollbarColor: `${tokens.semantic.color.border.default} ${tokens.semantic.color.background.secondary}`,
});

// Remove default button styles
globalStyle('button', {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  cursor: 'pointer',
});

// Remove default list styles
globalStyle('ul, ol', {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

// Image optimization
globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});

// Form element consistency
globalStyle('input, textarea, select', {
  font: 'inherit',
  color: 'inherit',
});

globalStyle('input:focus, textarea:focus, select:focus', {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
});

// Link styles
globalStyle('a', {
  color: tokens.semantic.color.interactive.primary,
  textDecoration: 'none',
});

globalStyle('a:hover', {
  textDecoration: 'underline',
});

globalStyle('a:focus-visible', {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
  borderRadius: tokens.semantic.borderRadius.sm,
});

// Table styles
globalStyle('table', {
  borderCollapse: 'collapse',
  width: '100%',
});

globalStyle('th, td', {
  textAlign: 'left',
  padding: tokens.semantic.spacing.sm,
  borderBottom: `1px solid ${tokens.semantic.color.border.default}`,
});

// Code styles
globalStyle('code, pre', {
  fontFamily:
    'ui-monospace, SFMono-Regular, "Roboto Mono", "Cascadia Code", "Liberation Mono", Menlo, Monaco, Consolas, monospace',
  fontSize: '0.875em',
});

globalStyle('pre', {
  backgroundColor: tokens.semantic.color.background.secondary,
  padding: tokens.semantic.spacing.md,
  borderRadius: tokens.semantic.borderRadius.md,
  overflow: 'auto',
});

// Selection styles
globalStyle('::selection', {
  backgroundColor: `${tokens.semantic.color.interactive.primary}30`,
  color: tokens.semantic.color.text.primary,
});

// Placeholder styles
globalStyle('::placeholder', {
  color: tokens.semantic.color.text.muted,
  opacity: 1,
});

// Loading skeleton animation
export const skeletonLoading = keyframes({
  '0%': {
    backgroundColor: tokens.semantic.color.background.secondary,
  },
  '100%': {
    backgroundColor: tokens.semantic.color.border.muted,
  },
});

globalStyle('[data-loading="skeleton"]', {
  animation: `${skeletonLoading} 1s ease-in-out infinite alternate`,
});
