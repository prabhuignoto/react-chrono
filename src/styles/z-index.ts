/**
 * Z-index hierarchy for react-chrono
 *
 * This file defines a consistent z-index layering system to prevent
 * issues with component stacking and overlapping, such as timeline points
 * appearing on top of menus.
 *
 * Lower values appear behind elements with higher values.
 *
 * When using these values, remember:
 * 1. Components that should appear "behind" should have lower z-index values
 * 2. Components that should appear "above" should have higher z-index values
 * 3. This system prevents ad-hoc z-index values that might conflict
 * 4. When creating new components, place them in the appropriate z-index range
 */

export const zIndex = {
  // Base timeline elements
  timelineLine: 0, // The connecting vertical/horizontal line
  timelinePoint: 2, // Timeline points/circles
  timelineCard: 5, // Content cards

  // Interactive elements
  controls: 10, // Playback controls, etc.
  tooltip: 20, // Tooltips

  // Overlay elements
  modal: 50, // Modal dialogs
  popover: 100, // Popovers, dropdowns, menus

  // Top level elements
  notification: 1000, // Notifications, alerts, etc.
};

export default zIndex;
