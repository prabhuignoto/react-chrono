/**
 * Migration helper hook to use split contexts
 * This provides a bridge from the old GlobalContext to the new split contexts
 */

import { useNavigationContext } from './split/NavigationContext';
import { useThemeContext } from './split/ThemeContext';
import { useMediaContext } from './split/MediaContext';
import { useLayoutContext } from './split/LayoutContext';

export const useSplitContexts = () => {
  const navigation = useNavigationContext();
  const theme = useThemeContext();
  const media = useMediaContext();
  const layout = useLayoutContext();

  // Combine all contexts into a single object for easier migration
  return {
    // Navigation
    activeItemIndex: navigation.activeItemIndex,
    scrollable: navigation.scrollable,
    disableNavOnKey: navigation.disableNavOnKey,
    disableInteraction: navigation.disableInteraction,
    disableClickOnCircle: navigation.disableClickOnCircle,
    disableTimelinePoint: navigation.disableTimelinePoint,
    enableQuickJump: navigation.enableQuickJump,
    onScrollEnd: navigation.onScrollEnd,
    
    // Theme
    theme: theme.theme,
    isDarkMode: theme.isDarkMode,
    toggleDarkMode: theme.toggleDarkMode,
    onThemeChange: theme.onThemeChange,
    
    // Media
    mediaHeight: media.mediaHeight,
    mediaSettings: media.mediaSettings,
    mediaAlign: media.mediaAlign,
    textOverlay: media.textOverlay,
    
    // Layout
    mode: layout.mode,
    cardHeight: layout.cardHeight,
    cardWidth: layout.cardWidth,
    cardLess: layout.cardLess,
    flipLayout: layout.flipLayout,
    itemWidth: layout.itemWidth,
    lineWidth: layout.lineWidth,
    cardPositionHorizontal: layout.cardPositionHorizontal,
    toolbarPosition: layout.toolbarPosition,
    disableToolbar: layout.disableToolbar,
    borderLessCards: layout.borderLessCards,
    showAllCardsHorizontal: layout.showAllCardsHorizontal,
    updateHorizontalAllCards: layout.updateHorizontalAllCards,
    textDensity: layout.textDensity,
    updateTextContentDensity: layout.updateTextContentDensity,
    enableLayoutSwitch: layout.enableLayoutSwitch,
    highlightCardsOnHover: layout.highlightCardsOnHover,
    useReadMore: layout.useReadMore,
  };
};

// Export individual context hooks for components that only need specific data
export { useNavigationContext, useThemeContext, useMediaContext, useLayoutContext } from './split';