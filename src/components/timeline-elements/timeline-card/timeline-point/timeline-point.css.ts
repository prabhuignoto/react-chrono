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
    transform: 'scale(1)',
    boxShadow: `0 0 0 0 ${tokens.semantic.color.interactive.primary}60`,
  },
  '70%': { 
    transform: 'scale(1.05)',
    boxShadow: `0 0 0 12px ${tokens.semantic.color.interactive.primary}00`,
  },
  '100%': { 
    transform: 'scale(1)',
    boxShadow: `0 0 0 0 ${tokens.semantic.color.interactive.primary}00`,
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
    border: `2px solid ${tokens.semantic.color.background.elevated}`,
    backgroundColor: tokens.component.timeline.point.color.inactive,
    transition: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
    boxShadow: tokens.semantic.shadow.card,

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
        transform: 'scale(1.1)',
        boxShadow: tokens.semantic.shadow.cardHover,
        backgroundColor: tokens.component.timeline.point.color.hover,
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
        backgroundColor: tokens.component.timeline.point.color.inactive,
        borderColor: tokens.semantic.color.background.elevated,
      },
      active: [
        {
          backgroundColor: tokens.component.timeline.point.color.active,
          borderColor: tokens.component.timeline.point.color.active,
          transform: 'scale(1.2)',
          boxShadow: `0 0 0 4px ${tokens.semantic.color.interactive.primary}20`,
          animation: `${activePointPulse} 2s infinite`,
        },
      ],
      hover: {
        backgroundColor: tokens.component.timeline.point.color.hover,
        borderColor: tokens.component.timeline.point.color.hover,
      },
    },
    interactive: {
      true: [
        patterns.interactive({ hover: 'scale' }),
        {
          selectors: {
            '&:hover:not(:disabled)': {
              transform: 'scale(1.15)',
            },
            '&:active:not(:disabled)': {
              transform: 'scale(0.95)',
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