/**
 * Comprehensive internationalization configuration for React Chrono Timeline
 *
 * This interface provides complete localization support for all user-facing
 * text content within the timeline component, including navigation controls,
 * search functionality, accessibility labels, and interactive elements.
 */

/**
 * Navigation control text labels
 */
export interface NavigationTexts {
  /** Label for the first item button */
  first?: string;
  /** Label for the last item button */
  last?: string;
  /** Label for the next item button */
  next?: string;
  /** Label for the previous item button */
  previous?: string;
  /** Label for the play slideshow button */
  play?: string;
  /** Label for the stop/pause slideshow button */
  stop?: string;
  /** Label for the pause slideshow button */
  pause?: string;
  /** Label for the resume slideshow button */
  resume?: string;
}

/**
 * Search functionality text labels
 */
export interface SearchTexts {
  /** Placeholder text for search input field */
  placeholder?: string;
  /** ARIA label for search input field */
  ariaLabel?: string;
  /** Label for clear search button */
  clearLabel?: string;
  /** Label for next match button */
  nextMatch?: string;
  /** Label for previous match button */
  previousMatch?: string;
  /** Text template for search results count (uses {current} and {total} placeholders) */
  resultsCount?: string;
  /** Text when no search results found */
  noResults?: string;
  /** ARIA label for search navigation controls */
  navigationLabel?: string;
}

/**
 * Theme and display mode text labels
 */
export interface ThemeTexts {
  /** Label for dark mode button */
  darkMode?: string;
  /** Label for light mode button */
  lightMode?: string;
  /** Label for theme toggle button */
  toggleTheme?: string;
}

/**
 * Layout and view mode text labels
 */
export interface LayoutTexts {
  /** Label for vertical layout mode */
  vertical?: string;
  /** Label for horizontal layout mode */
  horizontal?: string;
  /** Label for alternating layout mode */
  alternating?: string;
  /** Label for horizontal-all layout mode */
  horizontalAll?: string;
  /** Label for layout switcher */
  switchLayout?: string;
  /** ARIA label for layout selection */
  layoutSelection?: string;
}

/**
 * Fullscreen functionality text labels
 */
export interface FullscreenTexts {
  /** Label for enter fullscreen button */
  enterFullscreen?: string;
  /** Label for exit fullscreen button */
  exitFullscreen?: string;
  /** Error message when fullscreen is not supported */
  notSupported?: string;
  /** Error message when fullscreen request fails */
  errorMessage?: string;
}

/**
 * Quick navigation text labels
 */
export interface QuickJumpTexts {
  /** Label for quick jump dropdown */
  jumpTo?: string;
  /** ARIA label for quick jump selection */
  jumpToAriaLabel?: string;
  /** Template for timeline item options in quick jump (uses {index} and {title} placeholders) */
  itemTemplate?: string;
}

/**
 * Content interaction text labels
 */
export interface ContentTexts {
  /** Label for read more button */
  readMore?: string;
  /** Label for show less button */
  showLess?: string;
  /** Label for expand content button */
  expand?: string;
  /** Label for collapse content button */
  collapse?: string;
  /** ARIA label for card interactions */
  cardInteraction?: string;
}

/**
 * Loading and status text labels
 */
export interface StatusTexts {
  /** Loading message */
  loading?: string;
  /** Error message for general errors */
  error?: string;
  /** Message when no items are available */
  noItems?: string;
  /** Message when timeline is empty */
  empty?: string;
}

/**
 * Accessibility text labels for screen readers
 */
export interface AccessibilityTexts {
  /** ARIA label for timeline navigation group */
  timelineNavigation?: string;
  /** ARIA label for timeline container */
  timelineContainer?: string;
  /** ARIA label for individual timeline items */
  timelineItem?: string;
  /** ARIA label for active timeline item */
  activeItem?: string;
  /** ARIA label for timeline point/marker */
  timelinePoint?: string;
  /** ARIA label for timeline card */
  timelineCard?: string;
  /** ARIA label for nested timeline items */
  nestedItems?: string;
  /** Template for item position announcement (uses {current} and {total} placeholders) */
  itemPosition?: string;
}

/**
 * Density and view options text labels
 */
export interface ViewTexts {
  /** Label for compact view */
  compact?: string;
  /** Label for detailed view */
  detailed?: string;
  /** Label for view density toggle */
  toggleDensity?: string;
  /** ARIA label for density selection */
  densitySelection?: string;
}

/**
 * Keyboard navigation help text
 */
export interface KeyboardTexts {
  /** Help text for arrow key navigation */
  arrowKeys?: string;
  /** Help text for home key */
  homeKey?: string;
  /** Help text for end key */
  endKey?: string;
  /** Help text for enter key */
  enterKey?: string;
  /** Help text for escape key */
  escapeKey?: string;
  /** Help text for tab navigation */
  tabNavigation?: string;
  /** General keyboard navigation help */
  keyboardHelp?: string;
}

/**
 * Complete internationalization configuration interface
 */
export interface TimelineI18nConfig {
  /** Navigation control labels */
  navigation?: NavigationTexts;
  /** Search functionality labels */
  search?: SearchTexts;
  /** Theme and display mode labels */
  theme?: ThemeTexts;
  /** Layout and view mode labels */
  layout?: LayoutTexts;
  /** Fullscreen functionality labels */
  fullscreen?: FullscreenTexts;
  /** Quick navigation labels */
  quickJump?: QuickJumpTexts;
  /** Content interaction labels */
  content?: ContentTexts;
  /** Loading and status labels */
  status?: StatusTexts;
  /** Accessibility labels for screen readers */
  accessibility?: AccessibilityTexts;
  /** Density and view options labels */
  view?: ViewTexts;
  /** Keyboard navigation help text */
  keyboard?: KeyboardTexts;
}

/**
 * Default English text values for all internationalization strings
 */
export const defaultI18nTexts: Required<TimelineI18nConfig> = {
  navigation: {
    first: 'Go to first item',
    last: 'Go to last item',
    next: 'Next item',
    previous: 'Previous item',
    play: 'Start slideshow',
    stop: 'Stop slideshow',
    pause: 'Pause slideshow',
    resume: 'Resume slideshow',
  },
  search: {
    placeholder: 'Search Timeline',
    ariaLabel: 'Search timeline content',
    clearLabel: 'Clear Search',
    nextMatch: 'Next Match (Enter)',
    previousMatch: 'Previous Match (Shift+Enter)',
    resultsCount: '{current} of {total}',
    noResults: 'No results found',
    navigationLabel: 'Search navigation',
  },
  theme: {
    darkMode: 'Switch to dark mode',
    lightMode: 'Switch to light mode',
    toggleTheme: 'Toggle theme',
  },
  layout: {
    vertical: 'Vertical layout',
    horizontal: 'Horizontal layout',
    alternating: 'Alternating layout',
    horizontalAll: 'Horizontal all layout',
    switchLayout: 'Switch layout',
    layoutSelection: 'Layout selection',
  },
  fullscreen: {
    enterFullscreen: 'Enter fullscreen',
    exitFullscreen: 'Exit fullscreen',
    notSupported: 'Fullscreen not supported',
    errorMessage: 'Failed to enter fullscreen mode',
  },
  quickJump: {
    jumpTo: 'Jump to item',
    jumpToAriaLabel: 'Quick navigation to timeline items',
    itemTemplate: '{index}: {title}',
  },
  content: {
    readMore: 'Read More',
    showLess: 'Show Less',
    expand: 'Expand',
    collapse: 'Collapse',
    cardInteraction: 'Timeline card content',
  },
  status: {
    loading: 'Loading timeline...',
    error: 'Error loading timeline',
    noItems: 'No timeline items available',
    empty: 'Timeline is empty',
  },
  accessibility: {
    timelineNavigation: 'Timeline Navigation',
    timelineContainer: 'Timeline Container',
    timelineItem: 'Timeline Item',
    activeItem: 'Active Timeline Item',
    timelinePoint: 'Timeline Point',
    timelineCard: 'Timeline Card',
    nestedItems: 'Nested Timeline Items',
    itemPosition: 'Item {current} of {total}',
  },
  view: {
    compact: 'Compact view',
    detailed: 'Detailed view',
    toggleDensity: 'Toggle view density',
    densitySelection: 'View density selection',
  },
  keyboard: {
    arrowKeys: 'Use arrow keys to navigate between items',
    homeKey: 'Press Home to go to first item',
    endKey: 'Press End to go to last item',
    enterKey: 'Press Enter to select item',
    escapeKey: 'Press Escape to exit fullscreen or pause slideshow',
    tabNavigation: 'Use Tab to navigate controls',
    keyboardHelp: 'Keyboard navigation available',
  },
};

/**
 * Utility function to merge user-provided i18n config with defaults
 */
export function mergeI18nConfig(
  userConfig?: TimelineI18nConfig,
): Required<TimelineI18nConfig> {
  if (!userConfig) return defaultI18nTexts;

  return {
    navigation: { ...defaultI18nTexts.navigation, ...userConfig.navigation },
    search: { ...defaultI18nTexts.search, ...userConfig.search },
    theme: { ...defaultI18nTexts.theme, ...userConfig.theme },
    layout: { ...defaultI18nTexts.layout, ...userConfig.layout },
    fullscreen: { ...defaultI18nTexts.fullscreen, ...userConfig.fullscreen },
    quickJump: { ...defaultI18nTexts.quickJump, ...userConfig.quickJump },
    content: { ...defaultI18nTexts.content, ...userConfig.content },
    status: { ...defaultI18nTexts.status, ...userConfig.status },
    accessibility: {
      ...defaultI18nTexts.accessibility,
      ...userConfig.accessibility,
    },
    view: { ...defaultI18nTexts.view, ...userConfig.view },
    keyboard: { ...defaultI18nTexts.keyboard, ...userConfig.keyboard },
  };
}

/**
 * Utility function to interpolate template strings with variables
 * Example: interpolateString('{current} of {total}', { current: 1, total: 5 }) => '1 of 5'
 */
export function interpolateString(
  template: string,
  variables: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = variables[key];
    return value !== undefined && value !== null ? value.toString() : match;
  });
}
