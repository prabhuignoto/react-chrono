/**
 * Accessibility Hooks
 *
 * This module provides a collection of composable hooks for implementing
 * WCAG 2.1 Level AA compliant keyboard navigation and screen reader support.
 *
 * Main hooks:
 * - useRovingTabIndex: Manages roving tabindex pattern for composite widgets
 * - useAriaLiveRegion: Creates accessible screen reader announcements
 * - useAccessibleDialog: Complete dialog pattern with focus/escape management
 * - usePrefersReducedMotion: Detects user's motion preference
 * - useKeyboardNavigationContext: Global keyboard navigation state
 *
 * WCAG References:
 * - 2.1.1 Keyboard (Level A)
 * - 2.1.2 No Keyboard Trap (Level A)
 * - 2.4.3 Focus Order (Level A)
 * - 2.4.7 Focus Visible (Level AA)
 * - 4.1.2 Name, Role, Value (Level A)
 * - 4.1.3 Status Messages (Level A)
 *
 * ARIA References:
 * - WAI-ARIA 1.2 Authoring Practices Guide
 * - https://www.w3.org/WAI/ARIA/apg/
 * @public
 */

/** @public */
export { useRovingTabIndex } from './useRovingTabIndex';
export type {
  UseRovingTabIndexOptions,
  UseRovingTabIndexReturn,
} from './useRovingTabIndex';

export { useAriaLiveRegion } from './useAriaLiveRegion';
export type {
  UseAriaLiveRegionOptions,
  UseAriaLiveRegionReturn,
} from './useAriaLiveRegion';

export { useAccessibleDialog } from './useAccessibleDialog';
export type {
  UseAccessibleDialogOptions,
  UseAccessibleDialogReturn,
} from './useAccessibleDialog';

export { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Future exports (to be implemented)
// export { useKeyboardNavigationContext, KeyboardNavigationProvider } from './useKeyboardNavigationContext';
