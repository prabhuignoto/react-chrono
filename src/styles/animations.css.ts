import { keyframes, style } from '@vanilla-extract/css';
import { designTokens } from './design-system.css';

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
    '0%': { boxShadow: `0 0 0 0 ${designTokens.color.primary}40` },
    '70%': { boxShadow: `0 0 0 12px ${designTokens.color.primary}00` },
    '100%': { boxShadow: `0 0 0 0 ${designTokens.color.primary}00` },
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
      boxShadow: `0 0 4px ${designTokens.color.primary}20`,
      borderColor: 'transparent',
    },
    '50%': {
      boxShadow: `0 0 12px ${designTokens.color.primary}40, 0 0 20px ${designTokens.color.primary}10`,
      borderColor: `${designTokens.color.primary}30`,
    },
    '100%': {
      boxShadow: `0 0 4px ${designTokens.color.primary}20`,
      borderColor: 'transparent',
    },
  }),
};

// Animation utility classes
export const animationUtils = {
  // Entrance animations
  entranceLeft: style({
    animationName: keyframeAnimations.slideInFromLeft,
    animationDuration: designTokens.animation.duration.normal,
    animationTimingFunction: designTokens.animation.easing.easeOut,
    animationFillMode: 'both',
  }),

  entranceRight: style({
    animationName: keyframeAnimations.slideInFromRight,
    animationDuration: designTokens.animation.duration.normal,
    animationTimingFunction: designTokens.animation.easing.easeOut,
    animationFillMode: 'both',
  }),

  entranceTop: style({
    animationName: keyframeAnimations.slideInFromTop,
    animationDuration: designTokens.animation.duration.normal,
    animationTimingFunction: designTokens.animation.easing.easeOut,
    animationFillMode: 'both',
  }),

  fadeIn: style({
    animationName: keyframeAnimations.fadeIn,
    animationDuration: designTokens.animation.duration.normal,
    animationTimingFunction: designTokens.animation.easing.ease,
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
        animationDuration: designTokens.animation.duration.fast,
        animationTimingFunction: designTokens.animation.easing.easeInOut,
      },
    },
  }),

  iconBounceOnHover: style({
    selectors: {
      '&:hover': {
        animationName: keyframeAnimations.iconBounce,
        animationDuration: '0.4s',
        animationTimingFunction: designTokens.animation.easing.easeOut,
      },
    },
  }),

  glowOnFocus: style({
    selectors: {
      '&:focus-visible': {
        animationName: keyframeAnimations.glowPulse,
        animationDuration: '1.5s',
        animationTimingFunction: designTokens.animation.easing.ease,
        animationIterationCount: 'infinite',
      },
    },
  }),
};

// Common transition presets
export const transitions = {
  fast: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.easeInOut}`,
  normal: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.easeInOut}`,
  slow: `all ${designTokens.animation.duration.slow} ${designTokens.animation.easing.easeInOut}`,
};
