/**
 * Design System & Utilities Export
 */

// Core design system
export { designTokens, vars } from './design-system.css';

// Animation utilities
export {
  keyframeAnimations,
  animationUtils,
  transitions,
} from './animations.css';

// Layout utilities
export { layoutBase, container, spacing, gap } from './layout.css';

// Component systems
export * from '../components/timeline-elements/timeline-card-content/card-system.css';
export * from '../components/toolbar/toolbar-system.css';

// Legacy exports for backward compatibility
export { sprinkles } from './sprinkles/sprinkles.css';
export { scrollbarThin } from './scrollbar.css';
export { lightThemeClass, darkThemeClass } from './themes.css';
export { default as zIndex } from './z-index';

// Legacy token compatibility
export { vars as tokens } from './tokens.css';

// Theme utilities
export { computeCssVarsFromTheme } from './theme-bridge';
