/**
 * Modular text resolver utility for timeline components
 *
 * This utility provides a clean, maintainable way to resolve text values
 * with support for i18n, legacy buttonTexts, and fallbacks.
 */

import { ButtonTexts } from '@models/TimelineModel';
import { useI18n } from '@hooks/useI18n';

/**
 * Text resolver interface that provides type-safe text resolution
 */
export interface TextResolver {
  // Navigation texts
  firstItem(): string;
  lastItem(): string;
  nextItem(): string;
  previousItem(): string;
  playSlideshow(): string;
  stopSlideshow(): string;
  pauseSlideshow(): string;
  resumeSlideshow(): string;

  // Search texts
  searchPlaceholder(): string;
  searchAriaLabel(): string;
  clearSearch(): string;
  nextMatch(): string;
  previousMatch(): string;
  searchResults(current: number, total: number): string;
  noSearchResults(): string;
  searchNavigation(): string;

  // Theme texts
  darkMode(): string;
  lightMode(): string;
  toggleTheme(): string;

  // Layout texts
  verticalLayout(): string;
  horizontalLayout(): string;
  alternatingLayout(): string;
  horizontalAllLayout(): string;
  switchLayout(): string;

  // Fullscreen texts
  enterFullscreen(): string;
  exitFullscreen(): string;
  fullscreenNotSupported(): string;
  fullscreenError(): string;

  // Content texts
  readMore(): string;
  showLess(): string;
  expandContent(): string;
  collapseContent(): string;

  // Accessibility texts
  timelineNavigation(): string;
  timelineContainer(): string;
  timelineItem(): string;
  activeItem(): string;
  itemPosition(current: number, total: number): string;

  // Status texts
  loading(): string;
  error(): string;
  noItems(): string;
  empty(): string;
}

/**
 * Creates a text resolver that handles i18n, legacy, and default fallbacks
 */
export function createTextResolver(
  i18nHelper?: ReturnType<typeof useI18n>,
  buttonTexts?: ButtonTexts,
): TextResolver {
  // Helper function to resolve text with priority: i18n > legacy > default
  const resolve = (
    i18nGetter: (() => string) | undefined,
    legacyValue: string | undefined,
    defaultValue: string,
  ): string => {
    if (i18nGetter) {
      const i18nValue = i18nGetter();
      if (i18nValue !== undefined) return i18nValue;
    }
    return legacyValue !== undefined ? legacyValue : defaultValue;
  };

  return {
    // Navigation texts
    firstItem: () =>
      resolve(
        i18nHelper?.navigation.first,
        buttonTexts?.first,
        'Go to first item',
      ),

    lastItem: () =>
      resolve(
        i18nHelper?.navigation.last,
        buttonTexts?.last,
        'Go to last item',
      ),

    nextItem: () =>
      resolve(i18nHelper?.navigation.next, buttonTexts?.next, 'Next item'),

    previousItem: () =>
      resolve(
        i18nHelper?.navigation.previous,
        buttonTexts?.previous,
        'Previous item',
      ),

    playSlideshow: () =>
      resolve(
        i18nHelper?.navigation.play,
        buttonTexts?.play,
        'Start slideshow',
      ),

    stopSlideshow: () =>
      resolve(i18nHelper?.navigation.stop, buttonTexts?.stop, 'Stop slideshow'),

    pauseSlideshow: () =>
      resolve(i18nHelper?.navigation.pause, undefined, 'Pause slideshow'),

    resumeSlideshow: () =>
      resolve(i18nHelper?.navigation.resume, undefined, 'Resume slideshow'),

    // Search texts
    searchPlaceholder: () =>
      resolve(
        i18nHelper?.search.placeholder,
        (buttonTexts as any)?.searchPlaceholder,
        'Search Timeline',
      ),

    searchAriaLabel: () =>
      resolve(
        i18nHelper?.search.ariaLabel,
        (buttonTexts as any)?.searchAriaLabel,
        'Search timeline content',
      ),

    clearSearch: () =>
      resolve(
        i18nHelper?.search.clearLabel,
        (buttonTexts as any)?.clearSearch,
        'Clear Search',
      ),

    nextMatch: () =>
      resolve(
        i18nHelper?.search.nextMatch,
        (buttonTexts as any)?.nextMatch,
        'Next Match (Enter)',
      ),

    previousMatch: () =>
      resolve(
        i18nHelper?.search.previousMatch,
        (buttonTexts as any)?.previousMatch,
        'Previous Match (Shift+Enter)',
      ),

    searchResults: (current: number, total: number) => {
      return (
        i18nHelper?.search.resultsCount(current, total) ||
        `${current} of ${total}`
      );
    },

    noSearchResults: () =>
      resolve(i18nHelper?.search.noResults, undefined, 'No results found'),

    searchNavigation: () =>
      resolve(
        i18nHelper?.search.navigationLabel,
        undefined,
        'Search navigation',
      ),

    // Theme texts
    darkMode: () =>
      resolve(
        i18nHelper?.theme.darkMode,
        (buttonTexts as any)?.dark,
        'Switch to dark mode',
      ),

    lightMode: () =>
      resolve(
        i18nHelper?.theme.lightMode,
        (buttonTexts as any)?.light,
        'Switch to light mode',
      ),

    toggleTheme: () =>
      resolve(i18nHelper?.theme.toggleTheme, undefined, 'Toggle theme'),

    // Layout texts
    verticalLayout: () =>
      resolve(i18nHelper?.layout.vertical, undefined, 'Vertical layout'),

    horizontalLayout: () =>
      resolve(i18nHelper?.layout.horizontal, undefined, 'Horizontal layout'),

    alternatingLayout: () =>
      resolve(i18nHelper?.layout.alternating, undefined, 'Alternating layout'),

    horizontalAllLayout: () =>
      resolve(
        i18nHelper?.layout.horizontalAll,
        undefined,
        'Horizontal all layout',
      ),

    switchLayout: () =>
      resolve(i18nHelper?.layout.switchLayout, undefined, 'Switch layout'),

    // Fullscreen texts
    enterFullscreen: () =>
      resolve(
        i18nHelper?.fullscreen.enterFullscreen,
        undefined,
        'Enter fullscreen',
      ),

    exitFullscreen: () =>
      resolve(
        i18nHelper?.fullscreen.exitFullscreen,
        undefined,
        'Exit fullscreen',
      ),

    fullscreenNotSupported: () =>
      resolve(
        i18nHelper?.fullscreen.notSupported,
        undefined,
        'Fullscreen not supported',
      ),

    fullscreenError: () =>
      resolve(
        i18nHelper?.fullscreen.errorMessage,
        undefined,
        'Failed to enter fullscreen mode',
      ),

    // Content texts
    readMore: () =>
      resolve(i18nHelper?.content.readMore, undefined, 'Read More'),

    showLess: () =>
      resolve(i18nHelper?.content.showLess, undefined, 'Show Less'),

    expandContent: () =>
      resolve(i18nHelper?.content.expand, undefined, 'Expand'),

    collapseContent: () =>
      resolve(i18nHelper?.content.collapse, undefined, 'Collapse'),

    // Accessibility texts
    timelineNavigation: () =>
      resolve(
        i18nHelper?.accessibility.timelineNavigation,
        undefined,
        'Timeline Navigation',
      ),

    timelineContainer: () =>
      resolve(
        i18nHelper?.accessibility.timelineContainer,
        undefined,
        'Timeline Container',
      ),

    timelineItem: () =>
      resolve(
        i18nHelper?.accessibility.timelineItem,
        undefined,
        'Timeline Item',
      ),

    activeItem: () =>
      resolve(
        i18nHelper?.accessibility.activeItem,
        undefined,
        'Active Timeline Item',
      ),

    itemPosition: (current: number, total: number) => {
      return (
        i18nHelper?.accessibility.itemPosition(current, total) ||
        `Item ${current} of ${total}`
      );
    },

    // Status texts
    loading: () =>
      resolve(i18nHelper?.status.loading, undefined, 'Loading timeline...'),

    error: () =>
      resolve(i18nHelper?.status.error, undefined, 'Error loading timeline'),

    noItems: () =>
      resolve(
        i18nHelper?.status.noItems,
        undefined,
        'No timeline items available',
      ),

    empty: () =>
      resolve(i18nHelper?.status.empty, undefined, 'Timeline is empty'),
  };
}

/**
 * Hook that provides a configured text resolver from the timeline context
 * Note: This should only be used within components that are wrapped by TimelineContextProvider
 */
export function useTextResolver(): TextResolver {
  // This will be implemented when needed, for now components can directly access textResolver from context
  // Components should use: const { textResolver } = useTimelineContext();
  throw new Error(
    'useTextResolver should be implemented when needed. Use useTimelineContext().textResolver instead.',
  );
}
