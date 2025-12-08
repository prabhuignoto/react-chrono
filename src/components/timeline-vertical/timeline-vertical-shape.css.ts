import { globalStyle, style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens/index.css';

// Wrapper for the vertical timeline point and connecting lines
export const timelinePointWrapper = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  height: '100%',
  // minHeight: '8rem', // Ensure minimum height matches container for proper line visibility
  selectors: {
    '&.left': { order: 2 },
    '&.right': { order: 2 },
  },
});

// Extended connector line to previous item - bridges the gap between timeline items
globalStyle(`${timelinePointWrapper}::before`, {
  content: '',
  position: 'absolute',
  width: '4px',
  height: '4rem', // Extended to bridge the increased spacing between items
  background: 'currentColor',
  left: '50%',
  top: '-4rem',
  transform: 'translateX(-50%)',
  zIndex: 0,
});

// Main connector line - full height of container
globalStyle(`${timelinePointWrapper}::after`, {
  content: '',
  position: 'absolute',
  left: '50%',
  width: '4px',
  top: '0',
  bottom: '0',
  height: '100%',
  background: 'currentColor',
  transform: 'translateX(-50%)',
  zIndex: 0,
});

// Button container for the point (circle/square/diamond)
export const timelinePointContainer = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 3,
  background: 'none',
  border: 0,
  padding: 0,
  cursor: 'pointer',
  transition: `transform ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  selectors: {
    '&:hover:not(:disabled)': {
      transform: 'translate(-50%, -50%) scale(1.05)',
    },
    '&:active:not(:disabled)': {
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
    '&:disabled': { cursor: 'default', opacity: 0.6 },
    // Focus styles removed: Timeline point is not focusable (tabIndex={-1})
    // Focus is managed by the timeline row container instead
  },
});

// Shape (visual point). Use CSS var for dimension to allow inline style overrides
export const shape = style({
  cursor: 'pointer',
  height: '1.25rem',
  width: '1.25rem',
  transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  position: 'relative',
  background: tokens.semantic.color.interactive.primary,
  border: `2px solid ${tokens.semantic.color.interactive.primary}`,
  borderRadius: '50%',
  padding: 0,
  zIndex: 2,
  // Icon support
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&.diamond': {
      transform: 'rotate(45deg)',
      borderRadius: '0',
    },
    '&.using-icon': {
      overflow: 'visible', // Allow icons to be visible
      background: 'var(--icon-bg-color)',
    },
    '&.active.using-icon': {
      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
      transform: 'scale(1.1)',
    },
    '&.active:not(.using-icon)': {
      boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)',
      transform: 'scale(1.1)',
    },
    '&:hover:not(:disabled):not(.active)': {
      transform: 'scale(1.05)',
    },
    '&:active:not(:disabled)': {
      transform: 'scale(0.95)',
    },
  },
});

// Ripple effect pseudo for press feedback - only for non-icon shapes
globalStyle(`${shape}:not(.using-icon)::before`, {
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

// Icon image styling
globalStyle(`${shape}.using-icon img`, {
  maxWidth: '70%',
  maxHeight: '70%',
  objectFit: 'contain',
});

// Icon SVG styling
globalStyle(`${shape}.using-icon svg`, {
  width: '70%',
  height: '70%',
  fill: 'currentColor',
});

// Diamond shape icon adjustments
globalStyle(
  `${shape}.diamond.using-icon svg, ${shape}.diamond.using-icon img`,
  {
    transform: 'rotate(-45deg)', // Counter-rotate the icon inside rotated diamond
  },
);

export const timelinePointTitleWrapper = style({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 4,
  // border: `1px solid ${tokens.semantic.color.border.default}`,
  padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.sm}`,
  borderRadius: tokens.semantic.borderRadius.md,
  background: tokens.semantic.color.background.elevated,
  // border: `1px solid ${tokens.semantic.color.border.default}`,
  // boxShadow: tokens.semantic.shadow.card,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  fontSize: tokens.semantic.typography.fontSize.body,
  '@media': {
    '(max-width: 768px)': {
      padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.xs}`,
      fontSize: tokens.semantic.typography.fontSize.sm,
    },
    '(max-width: 480px)': {
      padding: `${tokens.semantic.spacing.xs} ${tokens.semantic.spacing.xs}`,
      fontSize: tokens.semantic.typography.fontSize.caption,
    },
  },
});
