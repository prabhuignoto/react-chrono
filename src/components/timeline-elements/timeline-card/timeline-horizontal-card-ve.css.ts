import { style, globalStyle, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';

// Keyframe animations
const show = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const ripple = keyframes({
  '0%': {
    transform: 'scale(0)',
    opacity: 0.8,
  },
  '100%': {
    transform: 'scale(4)',
    opacity: 0,
  },
});

const pulse = keyframes({
  '0%': {
    boxShadow: '0 0 0 0 rgba(0, 123, 255, 0.6)',
  },
  '70%': {
    boxShadow: '0 0 0 12px rgba(0, 123, 255, 0)',
  },
  '100%': {
    boxShadow: '0 0 0 0 rgba(0, 123, 255, 0)',
  },
});

// Base wrapper
export const wrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }),
  {
    border: '1px solid transparent',
    position: 'relative',
    height: '100%',
  },
]);

globalStyle(`${wrapper}.vertical`, {
  justifyContent: 'flex-start',
});

// Item wrapper
export const item = style({});

// Shape wrapper
export const shapeWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  {
    width: '5em',
    zIndex: '2',
    position: 'relative',
  },
]);

// Shape border utility function converted to variants
const getShapeBorder = (shape: string) => {
  switch (shape) {
    case 'circle':
      return { borderRadius: '50%' };
    case 'square':
      return { borderRadius: '2px' };
    case 'diamond':
      return { borderRadius: '0' };
    default:
      return { borderRadius: '50%' };
  }
};

// Base shape styles
const baseShape = style({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  border: `2px solid #3b82f6`,
  background: `#3b82f6`,
  padding: '0',
  zIndex: '2',
});

// Shape recipe
export const shape = recipe({
  base: baseShape,
  variants: {
    timelinePointShape: {
      circle: { borderRadius: '50%' },
      square: { borderRadius: '2px' },
      diamond: { 
        borderRadius: '0',
        transform: 'rotate(45deg)',
      },
    },
    active: {
      true: {},
      false: {},
    },
    usingIcon: {
      true: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3b82f6',
      },
      false: {
        background: `#3b82f6`,
      },
    },
    disabled: {
      true: {
        opacity: '0.6',
        cursor: 'default',
      },
      false: {},
    },
    size: {
      small: { width: '20px', height: '20px' },
      medium: { width: '24px', height: '24px' },
      large: { width: '32px', height: '32px' },
      custom: {}, // Will be overridden by dimension prop
    },
  },
  defaultVariants: {
    timelinePointShape: 'circle',
    active: false,
    usingIcon: false,
    disabled: false,
    size: 'medium',
  },
  compoundVariants: [
    // Active states for icons
    {
      variants: { active: true, usingIcon: true },
      style: {
        animation: `${pulse} 1.5s infinite`,
      },
    },
    // Active states for non-icons
    {
      variants: { active: true, usingIcon: false },
      style: {
        background: '#3b82f6',
        border: '3px solid #3b82f6',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        animation: `${pulse} 1.5s infinite`,
      },
    },
    // Diamond transform adjustments for active state
    {
      variants: { timelinePointShape: 'diamond', active: true, usingIcon: true },
      style: {
        transform: 'rotate(45deg) scale(1.1)',
      },
    },
    {
      variants: { timelinePointShape: 'diamond', active: true, usingIcon: false },
      style: {
        transform: 'rotate(45deg)',
      },
    },
  ],
});

// Ripple effect pseudo-element
globalStyle(`${shape}::before`, {
  content: '',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '10px',
  height: '10px',
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%',
  transform: 'scale(0) translate(-50%, -50%)',
  transformOrigin: 'top left',
  pointerEvents: 'none',
  zIndex: 100 + 1,
  opacity: '0',
});

globalStyle(`${shape}:active::before`, {
  animation: `${ripple} 0.6s ease-out`,
});

// Focus styles
globalStyle(`${shape}:focus-visible`, {
  outline: '3px solid transparent',
  outlineOffset: '2px',
});

globalStyle(`[data-keyboard-focus='true'] ${shape}:focus-visible`, {
  outlineColor: `#3b82f6`,
});

globalStyle(`[data-toolbar-navigation='true'] ${shape}:focus-visible`, {
  outlineColor: 'transparent',
});

// Hover effects
globalStyle(`${shape}:hover:not(:disabled)`, {
  transform: 'scale(1.12)',
  boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.13)',
});

globalStyle(`${shape}.diamond:hover:not(:disabled)`, {
  transform: 'rotate(45deg) scale(1.12)',
});

globalStyle(`${shape}:active:not(:disabled)`, {
  transform: 'scale(0.98)',
  transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
});

globalStyle(`${shape}.diamond:active:not(:disabled)`, {
  transform: 'rotate(45deg) scale(0.98)',
});

// Active state after element
globalStyle(`${shape}.active::after`, {
  content: '',
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
  zIndex: 100 - 1,
  transition: 'all 0.3s ease-in-out',
  width: '20px',
  height: '20px',
});

globalStyle(`${shape}.active.circle::after`, {
  borderRadius: '50%',
});

globalStyle(`${shape}.active.square::after`, {
  borderRadius: '2px',
});

// Icon image styles
globalStyle(`${shape} img`, {
  maxWidth: '90%',
  maxHeight: '90%',
});

// Timeline title container
export const timelineTitleContainer = recipe({
  base: style([
    sprinkles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
  ]),
  variants: {
    mode: {
      vertical: {
        marginBottom: '1em',
      },
      horizontal: {
        position: 'absolute',
        top: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        zIndex: '3',
      },
      horizontal_all: {
        position: 'absolute',
        top: '-2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        zIndex: '3',
      },
      tree: {
        marginBottom: '1em',
      },
    },
  },
  defaultVariants: {
    mode: 'vertical',
  },
});

// Base timeline content container
const baseTimelineContentContainer = style([
  sprinkles({
    alignItems: 'flex-start',
  }),
  {
    animation: `${show} 0.25s ease-in`,
    outline: '2px solid transparent',
    outlineOffset: '2px',
    borderRadius: '12px',
    margin: '1rem',
  },
]);

// Timeline content container recipe
export const timelineContentContainer = recipe({
  base: baseTimelineContentContainer,
  variants: {
    active: {
      true: {},
      false: {},
    },
    cardWidth: {
      auto: {},
      custom: {}, // Will be overridden by minWidth
    },
    highlight: {
      true: {},
      false: {},
    },
    position: {
      top: {},
      bottom: {},
      left: {},
      right: {},
    },
    mode: {
      vertical: {
        width: 'calc(100% - 5em)',
        marginLeft: 'auto',
        flexDirection: 'column',
      },
      horizontal: {},
      horizontal_all: {},
      tree: {
        width: 'calc(100% - 5em)',
        marginLeft: 'auto',
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    active: false,
    cardWidth: 'auto',
    highlight: false,
    position: 'right',
    mode: 'vertical',
  },
  compoundVariants: [
    // Highlight active cards in horizontal_all mode
    {
      variants: { highlight: true, active: true },
      style: {
        border: '2px solid #3b82f6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.13)',
      },
    },
  ],
});

// Keyboard focus outline
globalStyle(`[data-keyboard-focus='true'] ${timelineContentContainer}`, {
  outlineColor: '#3b82f6',
});

globalStyle(`[data-toolbar-navigation='true'] ${timelineContentContainer}`, {
  outlineColor: 'transparent',
});

// Responsive styles
globalStyle(`${timelineContentContainer}`, {
  '@media': {
    '(max-width: 768px)': {
      margin: '0.5rem',
      outlineWidth: '1px',
    },
  },
});

globalStyle(`${timelineContentContainer}.horizontal`, {
  '@media': {
    '(max-width: 768px)': {
      minWidth: 'auto',
      width: '100%',
    },
  },
});

globalStyle(`${timelineContentContainer}.vertical`, {
  '@media': {
    '(max-width: 768px)': {
      width: 'calc(100% - 3.5em)',
    },
  },
});

// Card container with improved cross-browser support
export const cardContainer = style({
  position: 'relative',
  display: 'flex',
  WebkitBoxOrient: 'vertical',
  WebkitBoxDirection: 'normal',
  msFlexDirection: 'column',
  flexDirection: 'column',
  minWidth: '250px',
  maxWidth: '350px',
  margin: '0.5rem',
  padding: '1.5rem',
  background: '#ffffff',
  borderRadius: '12px',
  WebkitBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08)',
  WebkitTransition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
});

globalStyle(`${cardContainer}:hover`, {
  WebkitTransform: 'translateY(-4px)',
  transform: 'translateY(-4px)',
  WebkitBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08), 0 12px 24px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.08)',
});

globalStyle(`${cardContainer}`, {
  '@media': {
    '(max-width: 768px)': {
      minWidth: '200px',
      maxWidth: '100%',
      margin: '0.25rem',
      padding: '1rem',
      borderRadius: '8px',
    },
  },
});

globalStyle(`${cardContainer}:hover`, {
  '@media': {
    '(max-width: 768px)': {
      transform: 'none',
      WebkitTransform: 'none',
    },
  },
});