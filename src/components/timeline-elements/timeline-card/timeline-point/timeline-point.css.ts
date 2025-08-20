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
    flexDirection: 'column',
    width: '100%', // Changed from '5em' to '100%' to ensure visibility in horizontal mode
    minWidth: '3rem', // Ensure minimum width for the timeline point
    zIndex: 10, // Ensure timeline points appear above cards and other elements
    position: 'relative',
    paddingTop: '0.5rem', // Add some padding to separate from card content
    paddingBottom: '0.5rem',
  },
]);

export const timelinePointBase = style({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  overflow: 'visible', // Changed from 'hidden' to 'visible' to ensure icon visibility
  padding: 0,
  zIndex: 11, // Higher z-index than wrapper to ensure visibility
  width: '2rem', // Ensure minimum size
  height: '2rem',
  minWidth: '2rem',
  minHeight: '2rem',

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
        transform: 'scale(1.2)',
        transition: 'all 0.3s ease-in-out',
        selectors: {
          '&.using-icon': {
            animation: `${pulse} 1.5s infinite`,
          },
          '&:not(.using-icon)': {
            boxShadow: '0 0 12px rgba(0, 123, 255, 0.6)',
            animation: `${pulse} 1.5s infinite`,
          },
        },
      },
      false: {
        transform: 'scale(1)',
        transition: 'all 0.3s ease-in-out',
        // Add visible background to ensure timeline points are always visible
        backgroundColor: 'currentColor',
        border: '2px solid white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
