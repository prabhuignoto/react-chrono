import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

// Wrapper for the vertical timeline point and connecting lines
export const timelinePointWrapper = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  selectors: {
    '&.left': { order: 2 },
    '&.right': { order: 2 },
  },
});

// Top connector line
globalStyle(`${timelinePointWrapper}::before`, {
  content: '',
  position: 'absolute',
  width: '4px',
  height: '2rem',
  background: 'currentColor',
  left: '50%',
  top: '-1rem',
  transform: 'translate(-50%, -50%)',
});

// Main connector line
globalStyle(`${timelinePointWrapper}::after`, {
  content: '',
  position: 'absolute',
  left: '50%',
  width: '4px',
  height: '100%',
  background: 'currentColor',
  transform: 'translateX(-50%)',
  zIndex: 0,
});

// Button container for the point (circle/square/diamond)
export const timelinePointContainer = style({
  position: 'relative',
  zIndex: 2,
  background: 'none',
  border: 0,
  padding: 0,
  cursor: 'pointer',
  transition: `transform ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  selectors: {
    '&:hover:not(:disabled)': { transform: 'scale(1.05)' },
    '&:active:not(:disabled)': { transform: 'scale(0.95)' },
    '&:disabled': { cursor: 'default', opacity: 0.6 },
    '&:focus-visible': { outline: '3px solid transparent', outlineOffset: 3 },
  },
});

// Shape (visual point). Use CSS var for dimension to allow inline style overrides
export const shape = style({
  cursor: 'pointer',
  height: '1.25rem',
  width: '1.25rem',
  transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
  position: 'relative',
  overflow: 'hidden',
  background: vars.color.primary,
  border: `2px solid ${vars.color.primary}`,
  padding: 0,
  zIndex: 2,
  selectors: {
    '&.diamond': { transform: 'rotate(45deg)' },
    '&.active.using-icon': { boxShadow: '0 0 0 4px currentColor22' },
  },
});

// Ripple effect pseudo for press feedback
globalStyle(`${shape}::before`, {
  content: '',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
  height: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%',
  transform: 'scale(0) translate(-50%, -50%)',
  transformOrigin: 'top left',
  pointerEvents: 'none',
  opacity: 0,
});
