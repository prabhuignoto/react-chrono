import { globalFontFace, globalStyle } from '@vanilla-extract/css';
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
  fontDisplay: 'swap',
  // Prevent layout shifts during font loading
  fontOpticalSizing: 'auto',
});

globalStyle('body', {
  backgroundColor: tokens.semantic.color.background.primary,
  color: tokens.semantic.color.text.primary,
  fontFamily: 'Inter, system-ui, ui-sans-serif, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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

globalStyle(':focus-visible', {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
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
globalStyle('@media print', {
  '*': {
    background: 'transparent !important',
    boxShadow: 'none !important',
    textShadow: 'none !important',
  },
  'body': {
    fontSize: '12pt',
    lineHeight: 1.5,
  },
});

// Focus management for timeline components
globalStyle('[data-timeline-wrapper]', {
  isolation: 'isolate',
});

globalStyle('[data-timeline-wrapper]:focus', {
  outline: 0,
});

globalStyle('[data-timeline-wrapper]:not([data-keyboard-navigation="true"]) :focus', {
  outline: 0,
});

globalStyle('[data-timeline-wrapper][data-keyboard-navigation="true"] :focus-visible', {
  outline: `2px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '2px',
  borderRadius: tokens.semantic.borderRadius.sm,
});

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
  fontFamily: 'ui-monospace, SFMono-Regular, "Roboto Mono", "Cascadia Code", "Liberation Mono", Menlo, Monaco, Consolas, monospace',
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
globalStyle('@keyframes skeleton-loading', {
  '0%': {
    backgroundColor: tokens.semantic.color.background.secondary,
  },
  '100%': {
    backgroundColor: tokens.semantic.color.border.muted,
  },
});

globalStyle('[data-loading="skeleton"]', {
  animation: 'skeleton-loading 1s ease-in-out infinite alternate',
});