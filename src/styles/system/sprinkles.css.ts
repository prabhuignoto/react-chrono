import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { tokens } from '../tokens/index.css';

// Define responsive breakpoints
const responsiveConditions = {
  mobile: {},
  tablet: { '@media': 'screen and (min-width: 768px)' },
  desktop: { '@media': 'screen and (min-width: 1024px)' },
} as const;

// Responsive properties - most commonly used responsive utilities
const responsiveProperties = defineProperties({
  conditions: responsiveConditions,
  defaultCondition: 'mobile',
  properties: {
    // Layout & Display
    display: [
      'none',
      'block', 
      'flex', 
      'inline-flex', 
      'grid',
      'inline-block'
    ],
    position: [
      'relative', 
      'absolute', 
      'fixed', 
      'sticky'
    ],
    
    // Flexbox (most used)
    flexDirection: ['row', 'column'],
    alignItems: [
      'center', 
      'flex-start', 
      'flex-end', 
      'stretch'
    ],
    justifyContent: [
      'center',
      'flex-start', 
      'flex-end',
      'space-between',
      'space-around'
    ],
    flexWrap: ['nowrap', 'wrap'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    
    // Spacing (responsive)
    gap: tokens.semantic.spacing,
    padding: tokens.semantic.spacing,
    paddingX: tokens.semantic.spacing,
    paddingY: tokens.semantic.spacing,
    margin: {
      ...tokens.semantic.spacing,
      auto: 'auto',
    },
    marginX: {
      ...tokens.semantic.spacing,
      auto: 'auto',
    },
    marginY: {
      ...tokens.semantic.spacing,
      auto: 'auto',
    },
    
    // Sizing
    width: {
      auto: 'auto',
      full: '100%',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '3/4': '75%',
    },
    height: {
      auto: 'auto',
      full: '100%',
      screen: '100vh',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    maxWidth: {
      none: 'none',
      full: '100%',
      screen: '100vw',
    },
    
    // Visual
    borderRadius: tokens.semantic.borderRadius,
    opacity: {
      0: '0',
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1',
    },
    
    // Typography
    fontSize: tokens.semantic.typography.fontSize,
    fontWeight: tokens.semantic.typography.fontWeight,
    textAlign: ['left', 'center', 'right'],
    
    // Z-index
    zIndex: tokens.semantic.zIndex,
    
    // Overflow
    overflow: ['visible', 'hidden', 'scroll', 'auto'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],
  },
  
  // Shorthand properties for common patterns
  shorthands: {
    p: ['padding'],
    px: ['paddingX'], 
    py: ['paddingY'],
    m: ['margin'],
    mx: ['marginX'],
    my: ['marginY'],
    placeItems: ['alignItems', 'justifyContent'],
  },
});

// Static properties - don't need responsive variants
const staticProperties = defineProperties({
  properties: {
    // Interaction
    cursor: [
      'auto',
      'pointer',
      'not-allowed',
      'text'
    ],
    pointerEvents: ['auto', 'none'],
    userSelect: ['none', 'text', 'all'],
    
    // Border
    borderWidth: {
      0: '0',
      1: '1px',
      2: '2px',
    },
    borderStyle: ['solid', 'dashed', 'dotted', 'none'],
    
    // Background
    backgroundSize: ['auto', 'cover', 'contain'],
    backgroundRepeat: ['repeat', 'no-repeat'],
    
    // List
    listStyleType: ['none', 'disc', 'decimal'],
    
    // Animation/Transition
    transitionProperty: [
      'none',
      'all', 
      'colors',
      'opacity',
      'transform'
    ],
    transitionDuration: tokens.semantic.motion.duration,
    transitionTimingFunction: tokens.semantic.motion.easing,
    
    // Transform (common ones)
    transform: {
      none: 'none',
      scale95: 'scale(0.95)',
      scale102: 'scale(1.02)',
      translateY1: 'translateY(-1px)',
      translateY2: 'translateY(-2px)',
    },
    
    // Visibility
    visibility: ['visible', 'hidden'],
    
    // Grid (basic)
    gridTemplateColumns: {
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
    },
  },
});

// Create optimized sprinkles
export const sprinkles = createSprinkles(
  responsiveProperties,
  staticProperties
);

// Export types
export type Sprinkles = Parameters<typeof sprinkles>[0];

// Utility function helpers for common patterns
export const sprinkleUtils = {
  // Centering
  center: sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  
  // Stack (flex column with gap)
  stack: (gap: keyof typeof tokens.semantic.spacing = 'md') =>
    sprinkles({
      display: 'flex',
      flexDirection: 'column',
      gap,
    }),
    
  // Inline (flex row with gap)
  inline: (gap: keyof typeof tokens.semantic.spacing = 'sm') =>
    sprinkles({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap,
    }),
    
  // Reset button
  resetButton: sprinkles({
    cursor: 'pointer',
    borderWidth: 0,
  }),
  
  // Reset list
  resetList: sprinkles({
    listStyleType: 'none',
    padding: 'xs', // Use smallest value instead of 0
    margin: 'xs',
  }),
  
  // Full size
  fullSize: sprinkles({
    width: 'full',
    height: 'full',
  }),
  
  // Absolute positioning
  absoluteFull: sprinkles({
    position: 'absolute',
    width: 'full',
    height: 'full',
  }),
  
  // Interactive element
  interactive: sprinkles({
    cursor: 'pointer',
    userSelect: 'none',
  }),
  
  // Hidden
  hidden: sprinkles({
    display: 'none',
  }),
  
  // Visually hidden (accessible)
  visuallyHidden: sprinkles({
    position: 'absolute',
    overflow: 'hidden',
  }),
};

// Responsive utility functions
export const responsive = {
  only: {
    mobile: <T extends Sprinkles>(styles: T) => 
      Object.fromEntries(
        Object.entries(styles).map(([key, value]) => [
          key, 
          { mobile: value, tablet: undefined, desktop: undefined }
        ])
      ) as T,
    tablet: <T extends Sprinkles>(styles: T) => 
      Object.fromEntries(
        Object.entries(styles).map(([key, value]) => [
          key, 
          { mobile: undefined, tablet: value, desktop: undefined }
        ])
      ) as T,
    desktop: <T extends Sprinkles>(styles: T) => 
      Object.fromEntries(
        Object.entries(styles).map(([key, value]) => [
          key, 
          { mobile: undefined, tablet: undefined, desktop: value }
        ])
      ) as T,
  },
};