/**
 * Migration Context Provider - Provides both old GlobalContext and new split contexts
 * This allows gradual migration of components from GlobalContext to split contexts
 */

import React, { useMemo, useState, useCallback } from 'react';
import { TimelineProps, TextDensity } from '@models/TimelineModel';
import { getDefaultButtonTexts, getDefaultClassNames, getDefaultThemeOrDark, getSlideShowType } from '@utils/index';
import { CombinedContextProvider } from './split';
import GlobalContextProvider from '../GlobalContext';
import { useMatchMedia } from '../effects/useMatchMedia';

interface MigrationContextProviderProps extends Partial<TimelineProps> {
  children: React.ReactNode;
}

/**
 * This provider wraps both the old GlobalContext and new split contexts
 * Components can gradually migrate from GlobalContext to split contexts
 */
export const MigrationContextProvider: React.FC<MigrationContextProviderProps> = (props) => {
  const {
    children,
    mode,
    items = [],
    theme,
    darkMode,
    onThemeChange,
    cardHeight = 200,
    cardWidth,
    cardLess = false,
    mediaHeight = 200,
    mediaSettings,
    flipLayout,
    itemWidth = 200,
    lineWidth = 3,
    cardPositionHorizontal,
    disableNavOnKey,
    scrollable = true,
    onScrollEnd,
    toolbarPosition = 'top',
    disableToolbar = false,
    borderLessCards,
    disableInteraction,
    disableClickOnCircle,
    disableTimelinePoint,
    enableQuickJump = true,
    enableLayoutSwitch = true,
    highlightCardsOnHover,
    useReadMore = true,
    showAllCardsHorizontal = false,
    textDensity = 'HIGH',
    responsiveBreakPoint = 1024,
    enableBreakPoint,
    activeItemIndex = 0,
    slideItemDuration = 2000,
    buttonTexts,
    classNames,
    fontSizes,
    textOverlay,
    slideShow,
    showOverallSlideshowProgress,
    nestedCardHeight,
  } = props;

  // Dynamic state
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [horizontalAll, setHorizontalAll] = useState(showAllCardsHorizontal);
  const [isMobileDetected, setIsMobileDetected] = useState(false);
  const [textContentDensity, setTextContentDensity] = useState<TextDensity>(textDensity);

  // Callbacks
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.();
  }, [isDarkMode, onThemeChange]);

  const updateHorizontalAllCards = useCallback((state: boolean) => {
    setHorizontalAll(state);
  }, []);

  const updateTextContentDensity = useCallback((value: TextDensity) => {
    setTextContentDensity(value);
  }, []);

  // Responsive detection
  useMatchMedia(`(max-width: ${responsiveBreakPoint - 1}px)`, {
    onMatch: () => setIsMobileDetected(true),
    enabled: enableBreakPoint,
  });

  useMatchMedia(`(min-width: ${responsiveBreakPoint}px)`, {
    onMatch: () => setIsMobileDetected(false),
    enabled: enableBreakPoint,
  });

  // Prepare values for split contexts
  const navigationValue = useMemo(() => ({
    activeItemIndex,
    scrollable,
    disableNavOnKey,
    disableInteraction,
    disableClickOnCircle,
    disableTimelinePoint,
    enableQuickJump,
    onScrollEnd,
  }), [
    activeItemIndex,
    scrollable,
    disableNavOnKey,
    disableInteraction,
    disableClickOnCircle,
    disableTimelinePoint,
    enableQuickJump,
    onScrollEnd,
  ]);

  const themeProps = useMemo(() => ({
    initialTheme: theme,
    darkMode: isDarkMode,
    onThemeChange,
  }), [theme, isDarkMode, onThemeChange]);

  const mediaValue = useMemo(() => ({
    mediaHeight,
    mediaSettings,
    mediaAlign: 'center' as const,
    textOverlay,
  }), [mediaHeight, mediaSettings, textOverlay]);

  const layoutValue = useMemo(() => ({
    mode: mode || 'VERTICAL_ALTERNATING',
    cardHeight,
    cardWidth,
    cardLess,
    flipLayout,
    itemWidth,
    lineWidth,
    cardPositionHorizontal,
    toolbarPosition,
    disableToolbar,
    borderLessCards,
    showAllCardsHorizontal: horizontalAll,
    textDensity: textContentDensity,
    enableLayoutSwitch,
    highlightCardsOnHover,
    useReadMore,
  }), [
    mode,
    cardHeight,
    cardWidth,
    cardLess,
    flipLayout,
    itemWidth,
    lineWidth,
    cardPositionHorizontal,
    toolbarPosition,
    disableToolbar,
    borderLessCards,
    horizontalAll,
    textContentDensity,
    enableLayoutSwitch,
    highlightCardsOnHover,
    useReadMore,
  ]);

  // Provide both old and new contexts
  return (
    <GlobalContextProvider {...props}>
      <CombinedContextProvider
        navigation={navigationValue}
        theme={themeProps}
        media={mediaValue}
        layout={layoutValue}
      >
        {children}
      </CombinedContextProvider>
    </GlobalContextProvider>
  );
};

export default MigrationContextProvider;