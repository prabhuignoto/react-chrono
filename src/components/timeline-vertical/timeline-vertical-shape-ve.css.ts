import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

// Base timeline point wrapper
const baseTimelinePointWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    position: 'relative',
  },
]);

// Timeline point wrapper recipe
export const timelinePointWrapper = recipe({
  base: baseTimelinePointWrapper,
  variants: {
    cardLess: {
      true: {},
      false: {},
    },
    isMobile: {
      true: { width: '25%' },
      false: { width: '10%' },
    },
    side: {
      left: { order: '2' },
      right: { order: '1' },
    },
  },
  defaultVariants: {
    cardLess: false,
    isMobile: false,
    side: 'right',
  },
});

// Remove individual line segments to allow for continuous line from wrapper
// The continuous line is now handled by the timelineVerticalWrapper::before pseudo-element

// Base timeline point container (button)
const baseTimelinePointContainer = style({
  position: 'relative',
  zIndex: 100,
  background: 'none',
  border: '0',
  padding: '0',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
});

// Timeline point container recipe
export const timelinePointContainer = recipe({
  base: baseTimelinePointContainer,
  variants: {
    hide: {
      true: { visibility: 'hidden' },
      false: { visibility: 'visible' },
    },
    disabled: {
      true: {
        cursor: 'default',
        opacity: '0.6',
      },
      false: {},
    },
    hover: {
      true: { transform: 'scale(1.05)' },
      false: {},
    },
    active: {
      true: { transform: 'scale(0.95)' },
      false: {},
    },
    focusVisible: {
      true: {
        outline: '3px solid transparent',
        outlineOffset: '3px',
      },
      false: {},
    },
  },
  defaultVariants: {
    hide: false,
    disabled: false,
    hover: false,
    active: false,
    focusVisible: false,
  },
});

// Hover effects
globalStyle(`${timelinePointContainer}:hover:not(:disabled)`, {
  transform: 'scale(1.05)',
});

globalStyle(`${timelinePointContainer}:active:not(:disabled)`, {
  transform: 'scale(0.95)',
});

// Focus styles
globalStyle(`${timelinePointContainer}:focus-visible`, {
  outline: '3px solid transparent',
  outlineOffset: '3px',
});

// Keyboard navigation focus
globalStyle(`[data-keyboard-focus='true'] ${timelinePointContainer}:focus-visible`, {
  outlineColor: `#3b82f6`,
});

// Toolbar navigation focus (hidden)
globalStyle(`[data-toolbar-navigation='true'] ${timelinePointContainer}:focus-visible`, {
  outlineColor: 'transparent',
});

// Disabled state
globalStyle(`${timelinePointContainer}:disabled`, {
  cursor: 'default',
  opacity: '0.6',
});