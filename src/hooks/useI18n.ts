import { useMemo } from 'react';
import { 
  TimelineI18nConfig, 
  mergeI18nConfig, 
  interpolateString 
} from '../models/TimelineI18n';

/**
 * Hook for managing internationalization in the timeline component
 */
export function useI18n(i18nConfig?: TimelineI18nConfig) {
  // Merge user configuration with defaults
  const texts = useMemo(() => mergeI18nConfig(i18nConfig), [i18nConfig]);

  // Helper function to get text with interpolation support
  const getText = useMemo(() => {
    return <K extends keyof typeof texts>(
      category: K,
      key: keyof typeof texts[K],
      variables?: Record<string, string | number>
    ): string => {
      const text = texts[category][key] as string;
      if (!text) return '';
      
      if (variables) {
        return interpolateString(text, variables);
      }
      
      return text;
    };
  }, [texts]);

  // Shorthand functions for common text categories
  const navigation = useMemo(() => ({
    first: () => getText('navigation', 'first'),
    last: () => getText('navigation', 'last'),
    next: () => getText('navigation', 'next'),
    previous: () => getText('navigation', 'previous'),
    play: () => getText('navigation', 'play'),
    stop: () => getText('navigation', 'stop'),
    pause: () => getText('navigation', 'pause'),
    resume: () => getText('navigation', 'resume'),
  }), [getText]);

  const search = useMemo(() => ({
    placeholder: () => getText('search', 'placeholder'),
    ariaLabel: () => getText('search', 'ariaLabel'),
    clearLabel: () => getText('search', 'clearLabel'),
    nextMatch: () => getText('search', 'nextMatch'),
    previousMatch: () => getText('search', 'previousMatch'),
    resultsCount: (current: number, total: number) => 
      getText('search', 'resultsCount', { current, total }),
    noResults: () => getText('search', 'noResults'),
    navigationLabel: () => getText('search', 'navigationLabel'),
  }), [getText]);

  const theme = useMemo(() => ({
    darkMode: () => getText('theme', 'darkMode'),
    lightMode: () => getText('theme', 'lightMode'),
    toggleTheme: () => getText('theme', 'toggleTheme'),
  }), [getText]);

  const layout = useMemo(() => ({
    vertical: () => getText('layout', 'vertical'),
    horizontal: () => getText('layout', 'horizontal'),
    alternating: () => getText('layout', 'alternating'),
    horizontalAll: () => getText('layout', 'horizontalAll'),
    switchLayout: () => getText('layout', 'switchLayout'),
    layoutSelection: () => getText('layout', 'layoutSelection'),
  }), [getText]);

  const fullscreen = useMemo(() => ({
    enterFullscreen: () => getText('fullscreen', 'enterFullscreen'),
    exitFullscreen: () => getText('fullscreen', 'exitFullscreen'),
    notSupported: () => getText('fullscreen', 'notSupported'),
    errorMessage: () => getText('fullscreen', 'errorMessage'),
  }), [getText]);

  const quickJump = useMemo(() => ({
    jumpTo: () => getText('quickJump', 'jumpTo'),
    jumpToAriaLabel: () => getText('quickJump', 'jumpToAriaLabel'),
    itemTemplate: (index: number, title: string) => 
      getText('quickJump', 'itemTemplate', { index, title }),
  }), [getText]);

  const content = useMemo(() => ({
    readMore: () => getText('content', 'readMore'),
    showLess: () => getText('content', 'showLess'),
    expand: () => getText('content', 'expand'),
    collapse: () => getText('content', 'collapse'),
    cardInteraction: () => getText('content', 'cardInteraction'),
  }), [getText]);

  const status = useMemo(() => ({
    loading: () => getText('status', 'loading'),
    error: () => getText('status', 'error'),
    noItems: () => getText('status', 'noItems'),
    empty: () => getText('status', 'empty'),
  }), [getText]);

  const accessibility = useMemo(() => ({
    timelineNavigation: () => getText('accessibility', 'timelineNavigation'),
    timelineContainer: () => getText('accessibility', 'timelineContainer'),
    timelineItem: () => getText('accessibility', 'timelineItem'),
    activeItem: () => getText('accessibility', 'activeItem'),
    timelinePoint: () => getText('accessibility', 'timelinePoint'),
    timelineCard: () => getText('accessibility', 'timelineCard'),
    nestedItems: () => getText('accessibility', 'nestedItems'),
    itemPosition: (current: number, total: number) => 
      getText('accessibility', 'itemPosition', { current, total }),
  }), [getText]);

  const view = useMemo(() => ({
    compact: () => getText('view', 'compact'),
    detailed: () => getText('view', 'detailed'),
    toggleDensity: () => getText('view', 'toggleDensity'),
    densitySelection: () => getText('view', 'densitySelection'),
  }), [getText]);

  const keyboard = useMemo(() => ({
    arrowKeys: () => getText('keyboard', 'arrowKeys'),
    homeKey: () => getText('keyboard', 'homeKey'),
    endKey: () => getText('keyboard', 'endKey'),
    enterKey: () => getText('keyboard', 'enterKey'),
    escapeKey: () => getText('keyboard', 'escapeKey'),
    tabNavigation: () => getText('keyboard', 'tabNavigation'),
    keyboardHelp: () => getText('keyboard', 'keyboardHelp'),
  }), [getText]);

  return {
    // Raw text configuration
    texts,
    // Generic text getter with interpolation
    getText,
    // Category-specific helpers
    navigation,
    search,
    theme,
    layout,
    fullscreen,
    quickJump,
    content,
    status,
    accessibility,
    view,
    keyboard,
  };
}

/**
 * Legacy compatibility helper - maps new i18n structure to old buttonTexts format
 */
export function mapI18nToButtonTexts(i18nConfig?: TimelineI18nConfig) {
  const { navigation, search, theme } = useI18n(i18nConfig);
  
  return {
    first: navigation.first(),
    last: navigation.last(),
    next: navigation.next(),
    previous: navigation.previous(),
    play: navigation.play(),
    stop: navigation.stop(),
    searchPlaceholder: search.placeholder(),
    searchAriaLabel: search.ariaLabel(),
    clearSearch: search.clearLabel(),
    nextMatch: search.nextMatch(),
    previousMatch: search.previousMatch(),
    dark: theme.darkMode(),
    light: theme.lightMode(),
  };
}