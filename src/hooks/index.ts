/**
 * Centralized export file for all hooks
 * Optimized for tree-shaking - each hook is individually exported
 */

// Core utility hooks
export { useBackground } from './useBackground';
export { useMeasure, useMeasureHeight } from './useMeasureHeight';
export { useKeyHandler } from './useEscapeKey';
export { default as useEscapeKey } from './useEscapeKey';
export { default as useOutsideClick } from './useOutsideClick';
export { useWindowSize } from './useWindowSize';
export { useUIState } from './useUIState';
export type { UIStateHook } from './useUIState';

// Timeline-specific hooks
export { useTimelineNavigation } from './useTimelineNavigation';
export { useTimelineKeyboardNavigation } from './useTimelineKeyboardNavigation';
export { useTimelineItemNavigation } from './useTimelineItemNavigation';
export { useTimelineScrolling } from './useTimelineScrolling';
export { useTimelineMode } from './useTimelineMode';
export { useTimelineMedia } from './useTimelineMedia';
export { useTimelineScroll } from './useTimelineScroll';
export { useTimelineSearch } from './useTimelineSearch';

// Media and UI hooks
export { useMediaState } from './useMediaState';
export { useCardSize } from './useCardSize';
export { useSlideshowProgress } from './useSlideshowProgress';
export { useFullscreen } from './useFullscreen';

// Shared utilities (for internal use)
export {
  useStableCallback,
  useLatestRef,
  useUnmount,
  useRAFThrottle,
  detectColorFormat,
  adjustRGBOpacity,
  adjustHSLOpacity,
  HEX_COLOR_REGEX,
  RGB_COLOR_REGEX,
  RGBA_COLOR_REGEX,
  HSL_COLOR_REGEX,
  HSLA_COLOR_REGEX,
} from './utils';
export type { ColorFormat } from './utils';
