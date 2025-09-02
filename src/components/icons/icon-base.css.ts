import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

// Base icon styles for consistent sizing and alignment
export const iconBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '1rem',
  height: '1rem',
  color: 'currentColor',
  stroke: 'currentColor',
  fill: 'none',
  strokeWidth: '2',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  transition: `all ${vars.transition.duration.fast} ${vars.transition.easing.standard}`,
});

// Size variants
export const iconSm = style({
  width: '0.875rem', // 14px
  height: '0.875rem',
});

export const iconMd = style({
  width: '1rem', // 16px
  height: '1rem',
});

export const iconLg = style({
  width: '1.25rem', // 20px
  height: '1.25rem',
});

export const iconXl = style({
  width: '1.5rem', // 24px
  height: '1.5rem',
});

// Button-specific icon styles
export const buttonIcon = style([
  iconBase,
  {
    width: '1.25rem', // 20px - standard for buttons
    height: '1.25rem',
  },
]);

export const toolbarIcon = style([
  iconBase,
  {
    width: '1rem', // 16px - smaller for toolbar
    height: '1rem',
  },
]);

export const controlIcon = style([
  iconBase,
  {
    width: '1.5rem', // 24px - larger for controls
    height: '1.5rem',
  },
]);

// Ensure all SVGs within these containers maintain aspect ratio
globalStyle(`${iconBase} svg`, {
  width: '100%',
  height: '100%',
  display: 'block',
});

// Remove any default margin/padding on SVGs
globalStyle(`${iconBase} svg, ${buttonIcon} svg, ${toolbarIcon} svg, ${controlIcon} svg`, {
  margin: 0,
  padding: 0,
});