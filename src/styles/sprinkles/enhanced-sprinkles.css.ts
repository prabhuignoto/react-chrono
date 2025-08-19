import { createSprinkles } from '@vanilla-extract/sprinkles';
import { responsiveProperties, staticProperties } from './enhanced-properties.css';

// Create enhanced sprinkles system
export const sprinkles = createSprinkles(responsiveProperties, staticProperties);

// Create responsive-only sprinkles for specific use cases
export const responsiveSprinkles = createSprinkles(responsiveProperties);

// Create static-only sprinkles for performance-critical components
export const staticSprinkles = createSprinkles(staticProperties);

// Type exports for better DX
export type Sprinkles = Parameters<typeof sprinkles>[0];
export type ResponsiveSprinkles = Parameters<typeof responsiveSprinkles>[0];
export type StaticSprinkles = Parameters<typeof staticSprinkles>[0];

// Utility helpers for common patterns
export const sprinkleUtils = {
  // Center content helper
  center: sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  
  // Full size helper
  fullSize: sprinkles({
    width: 'full',
    height: 'full',
  }),
  
  // Absolute positioning helpers
  absoluteFull: sprinkles({
    position: 'absolute',
    width: 'full',
    height: 'full',
  }),
  
  // Hidden helper
  hidden: sprinkles({
    display: 'none',
  }),
  
  // Visually hidden but accessible
  srOnly: sprinkles({
    position: 'absolute',
    overflow: 'hidden',
  }),
  
  // Reset list styles
  resetList: sprinkles({
    listStyleType: 'none',
  }),
  
  // Flex column helper
  flexCol: sprinkles({
    display: 'flex',
    flexDirection: 'column',
  }),
  
  // Flex row helper
  flexRow: sprinkles({
    display: 'flex',
    flexDirection: 'row',
  }),
  
  // Grid helper
  grid: sprinkles({
    display: 'grid',
  }),
  
  // Interactive cursor
  interactive: sprinkles({
    cursor: 'pointer',
  }),
  
  // Disabled state
  disabled: sprinkles({
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 50,
  }),
};

// Responsive breakpoint helpers
export const breakpoints = {
  mobile: (styles: ResponsiveSprinkles) => sprinkles({ ...styles }),
  tablet: (styles: ResponsiveSprinkles) => sprinkles({ 
    ...Object.fromEntries(
      Object.entries(styles).map(([key, value]) => [key, { mobile: undefined, tablet: value }])
    ) 
  }),
  desktop: (styles: ResponsiveSprinkles) => sprinkles({ 
    ...Object.fromEntries(
      Object.entries(styles).map(([key, value]) => [key, { mobile: undefined, tablet: undefined, desktop: value }])
    ) 
  }),
};

// Layout composition helpers (simplified)
export const layouts = {
  // Stack layout (flex column with gap)
  stack: () => sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: 'md',
  }),
  
  // Inline layout (flex row with gap)
  inline: () => sprinkles({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 'md',
  }),
  
  // Grid layout
  gridLayout: () => sprinkles({
    display: 'grid',
    gridTemplateColumns: 1,
    gap: 'md',
  }),
  
  // Cluster layout (flex wrap with gap)
  cluster: () => sprinkles({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'md',
  }),
};

// Animation helpers (simplified)
export const animations = {
  // Quick transitions
  fastTransition: staticSprinkles({
    transitionProperty: 'all',
    transitionDuration: 150,
    transitionTimingFunction: 'ease-out',
  }),
  
  // Slow transitions
  slowTransition: staticSprinkles({
    transitionProperty: 'all',
    transitionDuration: 500,
    transitionTimingFunction: 'ease-in-out',
  }),
};

// Simple property creators
export const createProperty = {
  spacing: (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => ({ 
    padding: value 
  }),
  margin: (value: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => ({ 
    margin: value 
  }),
};