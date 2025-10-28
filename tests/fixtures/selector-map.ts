/**
 * Centralized selector mapping for Playwright tests
 *
 * This file contains all selectors used across test files to ensure consistency
 * and easy updates when the app structure changes.
 *
 * Selectors are ordered by priority:
 * 1. data-testid attributes (most stable)
 * 2. ARIA attributes (semantic and accessible)
 * 3. Class names (fallback, may be dynamic with Vanilla Extract)
 */

export const SELECTORS = {
  // Timeline Container & Wrapper
  TIMELINE_WRAPPER: '[data-keyboard-navigation], .timeline-wrapper, [class*="wrapper"]',
  TIMELINE_MAIN: '.timeline-main-wrapper, [class*="timeline"]',

  // Demo Page Layout (new wrapper in redesigned demo)
  DEMO_PAGE_LAYOUT: '.demo-page-layout, [class*="demoPageLayout"]',
  DEMO_CONTENT_WRAPPER: '[class*="contentWrapper"]',

  // Timeline Items (Vertical Mode)
  VERTICAL_ITEM: '[data-testid="vertical-item-row"], .vertical-item-row',
  VERTICAL_ITEM_ROW: '.vertical-item-row',
  VERTICAL_ITEM_CONTENT: '[class*="vertical-item-row"]',

  // Timeline Items (Horizontal Mode)
  HORIZONTAL_ITEM: '.timeline-horz-item-container, [class*="timeline-horz-item"]',
  HORIZONTAL_ITEM_CONTAINER: '.timeline-horz-item-container',

  // Timeline Points/Circles
  TIMELINE_POINT: '[data-testid="timeline-circle"], .timeline-circle, [class*="circle"]',
  TIMELINE_CIRCLE: '[data-testid="timeline-circle"]',

  // Timeline Cards
  TIMELINE_CARD: '.timeline-card-content, [data-testid="timeline-card"], [class*="card"]',
  CARD_CONTENT: '[data-testid="timeline-card-content"], .timeline-card-content',
  CARD_TITLE: '.card-title, [class*="cardTitle"]',
  CARD_SUBTITLE: '.card-sub-title, [class*="cardSubTitle"]',
  CARD_DESCRIPTION: '.card-description, [class*="cardDescription"]',

  // Media Elements
  MEDIA_WRAPPER: '[data-testid="media-wrapper"], .timeline-card-media',
  CARD_MEDIA: '.timeline-card-media, [class*="cardMedia"]',
  CARD_IMAGE: '.card-media-wrapper img, [data-testid="timeline-image"]',
  CARD_VIDEO: '.card-media-wrapper video, [data-testid="timeline-video"]',
  YOUTUBE_VIDEO: 'iframe[src*="youtube"]',

  // Toolbar & Controls
  TOOLBAR: '.timeline-toolbar, [class*="toolbar"]',
  TOOLBAR_WRAPPER: '[class*="toolbarWrapper"]',

  // Navigation Buttons (ARIA-based for accessibility)
  BTN_NEXT: '[aria-label*="Next"], button:has-text("Next")',
  BTN_PREVIOUS: '[aria-label*="Previous"], [aria-label*="Prev"], button:has-text("Previous")',
  BTN_FIRST: '[aria-label*="First"], [aria-label*="Jump to first"], button:has-text("First")',
  BTN_LAST: '[aria-label*="Last"], [aria-label*="Jump to last"], button:has-text("Last")',
  BTN_PLAY: '[aria-label*="Play"], button:has-text("Play")',
  BTN_PAUSE: '[aria-label*="Pause"], button:has-text("Pause")',

  // Mode Switcher
  MODE_SWITCHER: '.mode-switcher, [class*="modeSwitcher"]',
  MODE_OPTION: '[role="option"], .mode-option',

  // Theme Controls
  THEME_TOGGLE: '[aria-label*="theme"], button[class*="theme"]',
  DARK_MODE_TOGGLE: '[aria-label*="Dark mode"], [aria-label*="Toggle theme"]',

  // Search
  SEARCH_INPUT: 'input[type="search"], input[placeholder*="Search"]',
  SEARCH_RESULTS: '.search-results, [class*="searchResults"]',

  // Nested Timeline
  NESTED_TIMELINE: '[data-nested-timeline], .nested-timeline',
  NESTED_ITEM: '[data-nested-item], .nested-timeline-item',
  NESTED_EXPAND_BTN: '[aria-label*="Expand"], button[class*="expand"]',

  // Active States
  ACTIVE_ITEM: '[class*="active"], [aria-current], [data-active="true"]',
  SELECTED_ITEM: '[aria-selected="true"]',

  // Focus States
  FOCUSED_ELEMENT: ':focus, :focus-visible',

  // Accessibility
  SKIP_LINK: '[href="#main-content"], a[class*="skipLink"]',
  LANDMARK_MAIN: 'main, [role="main"]',
  LANDMARK_NAVIGATION: 'nav, [role="navigation"]',

  // Loading States
  LOADING_SPINNER: '[role="progressbar"], .loading, [class*="loading"]',

  // Error States
  ERROR_MESSAGE: '[role="alert"], .error-message, [class*="error"]',
} as const;

/**
 * Helper function to combine multiple selectors with fallback
 * Example: getCombinedSelector(['[data-testid="item"]', '.item', '.fallback-item'])
 */
export function getCombinedSelector(selectors: string[]): string {
  return selectors.join(', ');
}

/**
 * Mode-specific selector helper
 */
export function getTimelineItemSelector(mode: 'vertical' | 'horizontal' | 'alternating'): string {
  switch (mode) {
    case 'horizontal':
      return SELECTORS.HORIZONTAL_ITEM;
    case 'vertical':
    case 'alternating':
    default:
      return SELECTORS.VERTICAL_ITEM;
  }
}

/**
 * Navigation button selector helper
 */
export function getNavigationButtonSelector(type: 'next' | 'previous' | 'first' | 'last' | 'play' | 'pause'): string {
  switch (type) {
    case 'next':
      return SELECTORS.BTN_NEXT;
    case 'previous':
      return SELECTORS.BTN_PREVIOUS;
    case 'first':
      return SELECTORS.BTN_FIRST;
    case 'last':
      return SELECTORS.BTN_LAST;
    case 'play':
      return SELECTORS.BTN_PLAY;
    case 'pause':
      return SELECTORS.BTN_PAUSE;
  }
}
