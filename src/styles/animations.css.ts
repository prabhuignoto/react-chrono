import { keyframes, style } from '@vanilla-extract/css';
import { tokens } from './tokens/index.css';

// Centralized keyframe animations
export const keyframeAnimations = {
  // Visibility animations
  fadeIn: keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),

  fadeOut: keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
  }),

  slideInFromLeft: keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(-24px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),

  slideInFromRight: keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(24px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),

  slideInFromTop: keyframes({
    from: {
      opacity: 0,
      transform: 'translateY(-16px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),

  // Interactive animations
  scaleIn: keyframes({
    from: { transform: 'scale(0.95)' },
    to: { transform: 'scale(1)' },
  }),

  pulse: keyframes({
    '0%': { boxShadow: `0 0 0 0 ${tokens.semantic.color.primary}40` },
    '70%': { boxShadow: `0 0 0 12px ${tokens.semantic.color.primary}00` },
    '100%': { boxShadow: `0 0 0 0 ${tokens.semantic.color.primary}00` },
  }),

  // Button micro-animations
  buttonPress: keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.96)' },
    '100%': { transform: 'scale(1)' },
  }),

  iconSpin: keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  }),

  iconBounce: keyframes({
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-2px)' },
  }),

  glowPulse: keyframes({
    '0%': {
      boxShadow: `0 0 4px ${tokens.semantic.color.primary}20`,
      borderColor: 'transparent',
    },
    '50%': {
      boxShadow: `0 0 12px ${tokens.semantic.color.primary}40, 0 0 20px ${tokens.semantic.color.primary}10`,
      borderColor: `${tokens.semantic.color.primary}30`,
    },
    '100%': {
      boxShadow: `0 0 4px ${tokens.semantic.color.primary}20`,
      borderColor: 'transparent',
    },
  }),
};

// Animation utility classes
export const animationUtils = {
  // Entrance animations
  entranceLeft: style({
    animationName: keyframeAnimations.slideInFromLeft,
    animationDuration: tokens.semantic.motion.duration.normal,
    animationTimingFunction: tokens.semantic.motion.easing.easeOut,
    animationFillMode: 'both',
  }),

  entranceRight: style({
    animationName: keyframeAnimations.slideInFromRight,
    animationDuration: tokens.semantic.motion.duration.normal,
    animationTimingFunction: tokens.semantic.motion.easing.easeOut,
    animationFillMode: 'both',
  }),

  entranceTop: style({
    animationName: keyframeAnimations.slideInFromTop,
    animationDuration: tokens.semantic.motion.duration.normal,
    animationTimingFunction: tokens.semantic.motion.easing.easeOut,
    animationFillMode: 'both',
  }),

  fadeIn: style({
    animationName: keyframeAnimations.fadeIn,
    animationDuration: tokens.semantic.motion.duration.normal,
    animationTimingFunction: tokens.semantic.motion.easing.standard,
    animationFillMode: 'both',
  }),

  // Reduced motion support
  respectsReducedMotion: style({
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animationDuration: '0.01ms',
        animationIterationCount: 1,
        transitionDuration: '0.01ms',
      },
    },
  }),

  // Button micro-animations
  buttonPressAnimation: style({
    selectors: {
      '&:active': {
        animationName: keyframeAnimations.buttonPress,
        animationDuration: tokens.semantic.motion.duration.fast,
        animationTimingFunction: tokens.semantic.motion.easing.easeInOut,
      },
    },
  }),

  iconBounceOnHover: style({
    selectors: {
      '&:hover': {
        animationName: keyframeAnimations.iconBounce,
        animationDuration: '0.4s',
        animationTimingFunction: tokens.semantic.motion.easing.easeOut,
      },
    },
  }),

  glowOnFocus: style({
    selectors: {
      '&:focus-visible': {
        animationName: keyframeAnimations.glowPulse,
        animationDuration: '1.5s',
        animationTimingFunction: tokens.semantic.motion.easing.standard,
        animationIterationCount: 'infinite',
      },
    },
  }),
};

// Common transition presets
export const transitions = {
  fast: `all ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.easeInOut}`,
  normal: `all ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut}`,
  slow: `all ${tokens.semantic.motion.duration.slow} ${tokens.semantic.motion.easing.easeInOut}`,
};
