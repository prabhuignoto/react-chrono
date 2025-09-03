import { keyframes, style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../../../styles/tokens/index.css';
import { sprinkles } from '../../../../styles/system/sprinkles.css';
import { animations, baseStyles, stateStyles } from '../../../../styles/system/static.css';
import { patterns } from '../../../../styles/system/recipes.css';

// Updated keyframe animations using new system
const ripple = keyframes({
  '0%': { transform: 'scale(0)', opacity: 0.8 },
  '100%': { transform: 'scale(4)', opacity: 0 },
});

const activePointPulse = keyframes({
  '0%': { 
    transform: 'scale(1.3)',
    boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}30, 0 6px 20px -4px ${tokens.semantic.color.interactive.primary}50, 0 4px 12px -2px rgba(0, 0, 0, 0.15)`,
  },
  '50%': { 
    transform: 'scale(1.35)',
    boxShadow: `0 0 0 6px ${tokens.semantic.color.interactive.primary}25, 0 8px 24px -4px ${tokens.semantic.color.interactive.primary}40, 0 6px 16px -2px rgba(0, 0, 0, 0.12)`,
  },
  '100%': { 
    transform: 'scale(1.3)',
    boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}30, 0 6px 20px -4px ${tokens.semantic.color.interactive.primary}50, 0 4px 12px -2px rgba(0, 0, 0, 0.15)`,
  },
});

// Shape wrapper using new sprinkles system
export const shapeWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }),
  baseStyles.containLayout,
  {
    width: 'auto',
    height: 'auto',
    zIndex: tokens.semantic.zIndex.timelineCard,
    flexShrink: 0,
  },
]);

// Base timeline point styles using new tokens
export const timelinePointBase = style([
  patterns.interactive({ hover: 'scale' }),
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 'full',
  }),
  baseStyles.willChange,
  {
    width: tokens.component.timeline.point.size.md,
    height: tokens.component.timeline.point.size.md,
    minWidth: tokens.component.timeline.point.size.md,
    minHeight: tokens.component.timeline.point.size.md,
    padding: 0,
    overflow: 'visible',
    border: `3px solid ${tokens.semantic.color.interactive.primary}20`,
    backgroundColor: `linear-gradient(135deg, ${tokens.semantic.color.background.elevated} 0%, ${tokens.semantic.color.interactive.primary}05 100%)`,
    transition: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.emphasized}`,
    boxShadow: `0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)`,

    // Ripple effect using new tokens
    '::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '10px',
      height: '10px',
      backgroundColor: `${tokens.semantic.color.background.elevated}80`,
      borderRadius: '50%',
      transform: 'scale(0) translate(-50%, -50%)',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      zIndex: 1,
      opacity: 0,
    },

    selectors: {
      '&:active::before': {
        animation: `${ripple} 0.6s ease-out`,
      },
      '&:hover:not(:disabled)': {
        transform: 'scale(1.2)',
        boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}15, 0 4px 16px -2px ${tokens.semantic.color.interactive.primary}35, 0 2px 8px -1px rgba(0, 0, 0, 0.15)`,
        background: `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary} 0%, ${tokens.semantic.color.interactive.primaryHover} 100%)`,
        borderColor: tokens.semantic.color.interactive.primary,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
      },
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        transform: 'none',
      },
    },

    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none !important',
        transition: 'none',
      },
    },
  },
]);

// Main timeline point recipe with new variant system
export const timelinePoint = recipe({
  base: timelinePointBase,
  variants: {
    size: {
      sm: {
        width: tokens.component.timeline.point.size.sm,
        height: tokens.component.timeline.point.size.sm,
        minWidth: tokens.component.timeline.point.size.sm,
        minHeight: tokens.component.timeline.point.size.sm,
      },
      md: {
        width: tokens.component.timeline.point.size.md,
        height: tokens.component.timeline.point.size.md,
        minWidth: tokens.component.timeline.point.size.md,
        minHeight: tokens.component.timeline.point.size.md,
      },
      lg: {
        width: tokens.component.timeline.point.size.lg,
        height: tokens.component.timeline.point.size.lg,
        minWidth: tokens.component.timeline.point.size.lg,
        minHeight: tokens.component.timeline.point.size.lg,
      },
    },
    shape: {
      circle: sprinkles({ borderRadius: 'full' }),
      square: sprinkles({ borderRadius: 'sm' }),
      diamond: [
        sprinkles({ borderRadius: 'sm' }),
        { transform: 'rotate(45deg)' },
      ],
    },
    state: {
      inactive: {
        background: `linear-gradient(135deg, ${tokens.semantic.color.background.elevated} 0%, ${tokens.component.timeline.point.color.inactive}40 100%)`,
        borderColor: `${tokens.component.timeline.point.color.inactive}60`,
        boxShadow: `0 1px 3px -1px rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.04)`,
      },
      active: [
        {
          background: `radial-gradient(circle at 30% 30%, ${tokens.semantic.color.interactive.primaryHover} 0%, ${tokens.semantic.color.interactive.primary} 70%, ${tokens.component.timeline.point.color.active} 100%)`,
          borderColor: tokens.semantic.color.interactive.primary,
          color: '#ffffff',
          transform: 'scale(1.3)',
          boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}30, 0 6px 20px -4px ${tokens.semantic.color.interactive.primary}50, 0 4px 12px -2px rgba(0, 0, 0, 0.15)`,
          animation: `${activePointPulse} 3s ease-in-out infinite`,
          position: 'relative',
          zIndex: 10,
        },
      ],
      hover: {
        background: `linear-gradient(135deg, ${tokens.semantic.color.interactive.primary}80 0%, ${tokens.semantic.color.interactive.primary} 100%)`,
        borderColor: tokens.semantic.color.interactive.primary,
        color: '#ffffff',
        boxShadow: `0 0 0 3px ${tokens.semantic.color.interactive.primary}25, 0 4px 12px -2px ${tokens.semantic.color.interactive.primary}40`,
        transform: 'scale(1.15)',
      },
    },
    interactive: {
      true: [
        patterns.interactive({ hover: 'scale' }),
        {
          selectors: {
            '&:hover:not(:disabled)': {
              transform: 'scale(1.25)',
            },
            '&:active:not(:disabled)': {
              transform: 'scale(1.1)',
            },
          },
        },
      ],
      false: {
        cursor: 'default',
        selectors: {
          '&:hover': {
            transform: 'none',
          },
        },
      },
    },
    hasIcon: {
      true: {
        padding: tokens.semantic.spacing.xs,
        backgroundColor: 'transparent',
        border: `2px solid ${tokens.component.timeline.point.color.active}`,
      },
      false: {},
    },
    disabled: {
      true: stateStyles.disabled,
      false: {},
    },
  },
  compoundVariants: [
    // Diamond shape specific interactions
    {
      variants: { shape: 'diamond', interactive: true },
      style: {
        selectors: {
          '&:hover:not(:disabled)': {
            transform: 'rotate(45deg) scale(1.15)',
          },
          '&:active:not(:disabled)': {
            transform: 'rotate(45deg) scale(0.95)',
          },
        },
      },
    },
    // Active diamond with icon
    {
      variants: { shape: 'diamond', state: 'active', hasIcon: true },
      style: {
        transform: 'rotate(45deg) scale(1.2)',
        animation: `${activePointPulse} 2s infinite`,
      },
    },
    // Active diamond without icon
    {
      variants: { shape: 'diamond', state: 'active', hasIcon: false },
      style: {
        transform: 'rotate(45deg) scale(1.2)',
      },
    },
    // Small size adjustments
    {
      variants: { size: 'sm', state: 'active' },
      style: {
        transform: 'scale(1.1)',
      },
    },
    // Large size adjustments
    {
      variants: { size: 'lg', state: 'active' },
      style: {
        transform: 'scale(1.25)',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    state: 'inactive',
    interactive: true,
    hasIcon: false,
    disabled: false,
  },
});

// Icon styling within timeline points
globalStyle(`${timelinePointBase} img`, {
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain',
  borderRadius: 'inherit',
});

globalStyle(`${timelinePointBase} svg`, {
  maxWidth: '80%',
  maxHeight: '80%',
  fill: 'currentColor',
});

// Enhanced focus styles for accessibility
globalStyle(`${timelinePointBase}:focus-visible`, {
  outline: `3px solid ${tokens.semantic.color.border.interactive}`,
  outlineOffset: '3px',
});

// Loading state animation
export const loadingPoint = style([
  timelinePointBase,
  {
    backgroundColor: tokens.semantic.color.background.secondary,
    animation: `${animations.pulse} 1.5s ease-in-out infinite`,
  },
]);

// Export types for new system
export type TimelinePointVariants = Parameters<typeof timelinePoint>[0];

// Utility classes for common point patterns
export const pointPatterns = {
  // Standard interactive point
  standard: timelinePoint({ 
    size: 'md', 
    shape: 'circle', 
    interactive: true 
  }),
  
  // Large active point
  featured: timelinePoint({ 
    size: 'lg', 
    shape: 'circle', 
    state: 'active' 
  }),
  
  // Small indicator point
  indicator: timelinePoint({ 
    size: 'sm', 
    shape: 'circle', 
    interactive: false 
  }),
  
  // Diamond milestone
  milestone: timelinePoint({ 
    size: 'lg', 
    shape: 'diamond', 
    state: 'active' 
  }),
};