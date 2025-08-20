import { keyframes, style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../../../styles/tokens.css';
import { sprinkles } from '../../../../styles/sprinkles/sprinkles.css';

// Keyframe animations
const ripple = keyframes({
  '0%': { transform: 'scale(0)', opacity: 0.8 },
  '100%': { transform: 'scale(4)', opacity: 0 },
});

const pulse = keyframes({
  '0%': { boxShadow: '0 0 0 0 rgba(0, 123, 255, 0.6)' },
  '70%': { boxShadow: '0 0 0 12px rgba(0, 123, 255, 0)' },
  '100%': { boxShadow: '0 0 0 0 rgba(0, 123, 255, 0)' },
});

export const shapeWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    width: 'auto', // Let content determine width
    height: 'auto', // Let content determine height
    position: 'relative',
    // Simplified - no complex z-index or excessive padding
    flexShrink: 0,
  },
]);

export const timelinePointBase = style({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  overflow: 'visible',
  padding: 0,
  width: '1.5rem', // Smaller size for horizontal modes
  height: '1.5rem',
  minWidth: '1.5rem',
  minHeight: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // Ripple effect
  '::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '10px',
    height: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '50%',
    transform: 'scale(0) translate(-50%, -50%)',
    transformOrigin: 'top left',
    pointerEvents: 'none',
    zIndex: 3,
    opacity: 0,
  },

  selectors: {
    '&:active::before': {
      animation: `${ripple} 0.6s ease-out`,
    },
    '&:focus-visible': {
      outline: '3px solid transparent',
      outlineOffset: '2px',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'default',
    },
  },

  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
    },
  },
});

export const timelinePoint = recipe({
  base: timelinePointBase,
  variants: {
    shape: {
      circle: {
        borderRadius: '50%',
        // Ensure circle shape is always visible
        backgroundColor: 'currentColor',
        border: '2px solid white',
      },
      square: {
        borderRadius: '2px',
        backgroundColor: 'currentColor',
        border: '2px solid white',
      },
      diamond: {
        borderRadius: '0',
        transform: 'rotate(45deg)',
        backgroundColor: 'currentColor',
        border: '2px solid white',
      },
    },
    usingIcon: {
      true: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      false: {},
    },
    active: {
      true: {
        transform: 'scale(1.2)', // Slightly smaller scale for smaller points
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'currentColor',
        border: '2px solid white',
        boxShadow: '0 3px 10px rgba(0, 123, 255, 0.4)',
        selectors: {
          '&.using-icon': {
            animation: `${pulse} 1.5s infinite`,
          },
          '&:not(.using-icon)': {
            boxShadow: '0 0 10px rgba(0, 123, 255, 0.6)',
            animation: `${pulse} 1.5s infinite`,
          },
        },
      },
      false: {
        transform: 'scale(1)',
        transition: 'all 0.3s ease-in-out',
        // Ensure timeline points are always visible with strong styling
        backgroundColor: 'currentColor',
        border: '2px solid white',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
        // Add hover effect for non-active points
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'scale(1.15)',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.6,
        cursor: 'default',
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { shape: 'diamond', active: false },
      style: {
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'rotate(45deg) scale(1.12)',
          },
          '&:active:not(:disabled)': {
            transform: 'rotate(45deg) scale(0.98)',
          },
        },
      },
    },
    {
      variants: { shape: 'diamond', active: true, usingIcon: true },
      style: {
        transform: 'rotate(45deg) scale(1.1)',
      },
    },
    {
      variants: { shape: 'diamond', active: true, usingIcon: false },
      style: {
        transform: 'rotate(45deg)',
      },
    },
  ],
  defaultVariants: {
    shape: 'circle',
    usingIcon: false,
    active: false,
    disabled: false,
  },
});

// Global styles for icon images
globalStyle(`${timelinePointBase}.using-icon img`, {
  maxWidth: '90%',
  maxHeight: '90%',
});
