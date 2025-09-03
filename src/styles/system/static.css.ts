import { style, keyframes, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../tokens/index.css';

// Pre-computed static values to avoid runtime calculations
export const staticValues = {
  gradients: {
    cardBackground: `linear-gradient(135deg, var(--background-elevated) 0%, var(--background-elevated)f8 100%)`,
    timelineLine: `linear-gradient(to bottom, transparent 0%, var(--timeline-line-color) 20%, var(--timeline-line-color) 80%, transparent 100%)`,
    toolbarBackground: `linear-gradient(135deg, var(--toolbar-background) 0%, var(--toolbar-background)f0 100%)`,
    borderGlow: `linear-gradient(135deg, var(--border-interactive)20 0%, transparent 50%, var(--border-interactive)10 100%)`,
  },
  shadows: {
    cardElevated: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    inset: 'inset 0 1px 1px rgba(0, 0, 0, 0.05)',
    glow: '0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)',
  },
  transforms: {
    liftSm: 'translateY(-1px)',
    liftMd: 'translateY(-2px)',
    liftLg: 'translateY(-4px)',
    scaleSm: 'scale(0.95)',
    scaleLg: 'scale(1.02)',
    rotate45: 'rotate(45deg)',
    rotate90: 'rotate(90deg)',
    rotate180: 'rotate(180deg)',
  },
  filters: {
    blur: 'blur(8px)',
    blurSm: 'blur(4px)',
    blurLg: 'blur(12px)',
    grayscale: 'grayscale(0.3)',
    brightness: 'brightness(1.1)',
    contrast: 'contrast(1.1)',
  },
};

// Animation keyframes - defined once, reused everywhere
export const animations = {
  fadeIn: keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),
  
  fadeOut: keyframes({
    from: { opacity: 1 },
    to: { opacity: 0 },
  }),
  
  slideInUp: keyframes({
    from: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),
  
  slideInDown: keyframes({
    from: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),
  
  slideInLeft: keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(-10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  
  slideInRight: keyframes({
    from: {
      opacity: 0,
      transform: 'translateX(10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  }),
  
  scaleIn: keyframes({
    from: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  }),
  
  scaleOut: keyframes({
    from: {
      opacity: 1,
      transform: 'scale(1)',
    },
    to: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  }),
  
  spin: keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  }),
  
  pulse: keyframes({
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  }),
  
  bounce: keyframes({
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'none',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  }),

  ripple: keyframes({
    '0%': {
      transform: 'scale(0)',
      opacity: 0.6,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0,
    },
  }),
  
  // Timeline-specific animations
  timelineCardEnter: keyframes({
    from: {
      opacity: 0,
      transform: 'translateY(20px) scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
  }),
  
  timelineCardExit: keyframes({
    from: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(-20px) scale(0.95)',
    },
  }),
  
  timelinePointPulse: keyframes({
    '0%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)',
    },
    '70%': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)',
    },
    '100%': {
      transform: 'scale(1)',
      boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
    },
  }),
};

// Common animation styles
export const animationStyles = {
  fadeIn: style({
    animation: `${animations.fadeIn} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  fadeOut: style({
    animation: `${animations.fadeOut} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  slideInUp: style({
    animation: `${animations.slideInUp} ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  slideInDown: style({
    animation: `${animations.slideInDown} ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  slideInLeft: style({
    animation: `${animations.slideInLeft} ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  slideInRight: style({
    animation: `${animations.slideInRight} ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  scaleIn: style({
    animation: `${animations.scaleIn} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.emphasized}`,
  }),
  
  scaleOut: style({
    animation: `${animations.scaleOut} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.emphasized}`,
  }),
  
  spin: style({
    animation: `${animations.spin} 1s linear infinite`,
  }),
  
  pulse: style({
    animation: `${animations.pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  }),
  
  bounce: style({
    animation: `${animations.bounce} 1s infinite`,
  }),
  
  // Timeline-specific
  timelineCardEnter: style({
    animation: `${animations.timelineCardEnter} ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.emphasized}`,
  }),
  
  timelineCardExit: style({
    animation: `${animations.timelineCardExit} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
  }),
  
  timelinePointPulse: style({
    animation: `${animations.timelinePointPulse} 2s infinite`,
  }),
};

// Performance-optimized base styles
export const baseStyles = {
  // Hardware acceleration for animations
  willChange: style({
    willChange: 'transform, opacity',
  }),
  
  // Optimized transforms
  transform3d: style({
    transform: 'translate3d(0, 0, 0)',
  }),
  
  // GPU-accelerated opacity
  gpuAccelerated: style({
    backfaceVisibility: 'hidden',
    perspective: 1000,
    WebkitFontSmoothing: 'subpixel-antialiased',
  }),
  
  // Containment for layout performance
  containLayout: style({
    contain: 'layout',
  }),
  
  containPaint: style({
    contain: 'paint',
  }),
  
  containStrict: style({
    contain: 'strict',
  }),
  
  // Scroll optimization
  smoothScroll: style({
    scrollBehavior: 'smooth',
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        scrollBehavior: 'auto',
      },
    },
  }),
  
  // Backdrop filters for modern effects
  backdropBlur: style({
    backdropFilter: staticValues.filters.blur,
    WebkitBackdropFilter: staticValues.filters.blur,
  }),
  
  backdropBlurSm: style({
    backdropFilter: staticValues.filters.blurSm,
    WebkitBackdropFilter: staticValues.filters.blurSm,
  }),
  
  // Text rendering optimization
  optimizeText: style({
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  }),
};

// Common component states (pre-computed for performance)
export const stateStyles = {
  hover: style({
    selectors: {
      '&:hover': {
        transform: staticValues.transforms.liftSm,
        transition: `transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      },
    },
  }),
  
  active: style({
    selectors: {
      '&:active': {
        transform: staticValues.transforms.scaleSm,
        transition: `transform ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.standard}`,
      },
    },
  }),
  
  focus: style({
    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${tokens.semantic.color.border.interactive}`,
        outlineOffset: '2px',
        boxShadow: staticValues.shadows.glow,
      },
    },
  }),
  
  disabled: style({
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    filter: staticValues.filters.grayscale,
  }),
  
  loading: style({
    opacity: 0.7,
    cursor: 'wait',
    pointerEvents: 'none',
  }),
};

// Media query helpers (static)
export const mediaQueries = {
  // Responsive design
  mobile: '@media screen and (max-width: 767px)',
  tablet: '@media screen and (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media screen and (min-width: 1024px)',
  
  // Accessibility
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  highContrast: '@media (prefers-contrast: high)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
  
  // Device capabilities
  hover: '@media (hover: hover)',
  noHover: '@media (hover: none)',
  pointer: '@media (pointer: fine)',
  coarsePointer: '@media (pointer: coarse)',
  
  // Print styles
  print: '@media print',
};

// Global performance optimizations
globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  // Prevent layout shifts
  scrollPaddingTop: '2rem',
  // Optimize font loading
  fontDisplay: 'swap',
});

globalStyle('body', {
  // Prevent horizontal scroll
  overflowX: 'hidden',
  // Optimize text rendering
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

// Reduced motion support for all animations
globalStyle('*', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      transition: 'none !important',
    },
  },
});

// High contrast mode adjustments
globalStyle('*', {
  '@media': {
    '(prefers-contrast: high)': {
      filter: 'none !important',
      backdropFilter: 'none !important',
    },
  },
});

// All exports are already defined above as individual constants