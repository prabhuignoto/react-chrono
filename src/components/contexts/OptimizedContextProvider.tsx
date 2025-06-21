/**
 * Optimized Context Provider - Splits stable and dynamic contexts for better performance
 */
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  TimelineProps as PropsModel,
  TextDensity,
} from '@models/TimelineModel';
import {
  getDefaultButtonTexts,
  getDefaultClassNames,
  getDefaultThemeOrDark,
  getSlideShowType,
} from '@utils/index';
import { useMatchMedia } from '../effects/useMatchMedia';
import { StableContext, StableContextProps } from './StableContext';
import { DynamicContext, DynamicContextProps } from './DynamicContext';

export type ContextProps = PropsModel & {
  isMobile?: boolean;
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: (state: boolean) => void;
  updateTextContentDensity?: (value: TextDensity) => void;
};

interface OptimizedContextProviderProps extends Omit<ContextProps, 'children'> {
  children: React.ReactNode;
}

export const OptimizedContextProvider: FunctionComponent<
  OptimizedContextProviderProps
> = (props) => {
  const {
    cardHeight = 200,
    cardLess = false,
    flipLayout,
    items = [],
    theme,
    buttonTexts,
    classNames,
    mode = 'VERTICAL_ALTERNATING',
    fontSizes,
    textOverlay,
    darkMode,
    slideShow,
    onThemeChange,
    mediaSettings,
    mediaHeight = 200,
    contentDetailsHeight = 10,
    showAllCardsHorizontal,
    textDensity = 'HIGH',
    responsiveBreakPoint = 1024,
    enableBreakPoint,
    semanticTags,
    children,
  } = props;

  // ==========================================
  // DYNAMIC STATE (changes frequently)
  // ==========================================
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [horizontalAll, setHorizontalAll] = useState(
    showAllCardsHorizontal ?? false,
  );
  const [isMobileDetected, setIsMobileDetected] = useState(false);
  const [textContentDensity, setTextContentDensity] =
    useState<TextDensity>(textDensity);

  // Dynamic callbacks
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

  // ==========================================
  // STABLE CONFIGURATION (rarely changes)
  // ==========================================
  const staticDefaults = useMemo(
    () => ({
      borderLessCards: props.borderLessCards ?? false,
      cardLess: cardLess,
      disableToolbar: props.disableToolbar ?? false,
      enableBreakPoint: props.enableBreakPoint ?? true,
      enableDarkToggle: props.enableDarkToggle ?? false,
      enableLayoutSwitch: props.enableLayoutSwitch ?? true,
      enableQuickJump: props.enableQuickJump ?? true,
      focusActiveItemOnLoad: props.focusActiveItemOnLoad ?? false,
      highlightCardsOnHover: props.highlightCardsOnHover ?? false,
      lineWidth: props.lineWidth ?? 3,
      mediaHeight: mediaHeight,
      nestedCardHeight: props.nestedCardHeight ?? 150,
      parseDetailsAsHTML: props.parseDetailsAsHTML ?? false,
      scrollable: props.scrollable ?? {
        scrollbar: false,
      },
      timelinePointDimension: props.timelinePointDimension ?? 16,
      timelinePointShape: props.timelinePointShape ?? ('circle' as const),
      titleDateFormat: props.titleDateFormat ?? 'MMM DD, YYYY',
      toolbarPosition: props.toolbarPosition ?? ('top' as const),
      uniqueId: props.uniqueId ?? 'react-chrono',
      useReadMore: props.useReadMore ?? true,
      disableTimelinePoint: props.disableTimelinePoint ?? false,
      isChild: props.isChild ?? false,
      noUniqueId: props.noUniqueId ?? false,
    }),
    [
      props.borderLessCards,
      cardLess,
      props.disableToolbar,
      props.enableBreakPoint,
      props.enableDarkToggle,
      props.enableLayoutSwitch,
      props.enableQuickJump,
      props.focusActiveItemOnLoad,
      props.highlightCardsOnHover,
      props.lineWidth,
      mediaHeight,
      props.nestedCardHeight,
      props.parseDetailsAsHTML,
      props.scrollable,
      props.timelinePointDimension,
      props.timelinePointShape,
      props.titleDateFormat,
      props.toolbarPosition,
      props.uniqueId,
      props.useReadMore,
      props.disableTimelinePoint,
      props.isChild,
      props.noUniqueId,
    ],
  );

  const newCardHeight = useMemo(
    () =>
      Math.max((contentDetailsHeight ?? 0) + (mediaHeight ?? 0), cardHeight),
    [contentDetailsHeight, mediaHeight, cardHeight],
  );

  const newContentDetailsHeight = useMemo(() => {
    const detailsHeightApprox = Math.round(newCardHeight * 0.75);
    const actualContentDetailsHeight = contentDetailsHeight ?? 0;
    return actualContentDetailsHeight > newCardHeight
      ? Math.min(actualContentDetailsHeight, detailsHeightApprox)
      : Math.max(actualContentDetailsHeight, detailsHeightApprox);
  }, [newCardHeight, contentDetailsHeight]);

  const computedCardHeight = useMemo(
    () => (cardLess ? (cardHeight ?? 80) : cardHeight),
    [cardLess, cardHeight],
  );

  const computedActiveItemIndex = useMemo(
    () => (flipLayout ? items?.length - 1 : 0),
    [flipLayout, items?.length],
  );

  const computedSlideShowType = useMemo(() => getSlideShowType(mode), [mode]);

  const computedMediaAlign = useMemo(
    () => (mode === 'VERTICAL' && !textOverlay ? 'left' : 'center'),
    [mode, textOverlay],
  );

  const memoizedButtonTexts = useMemo(
    () => ({
      ...getDefaultButtonTexts(),
      ...buttonTexts,
    }),
    [buttonTexts],
  );

  const memoizedClassNames = useMemo(
    () => ({
      ...getDefaultClassNames(),
      ...classNames,
    }),
    [classNames],
  );

  const memoizedFontSizes = useMemo(
    () => ({
      cardSubtitle: '0.85rem',
      cardText: '1rem',
      cardTitle: '1rem',
      title: '1rem',
      ...fontSizes,
    }),
    [fontSizes],
  );

  const memoizedMediaSettings = useMemo(
    () => ({
      align: computedMediaAlign,
      fit: 'cover' as const,
      ...mediaSettings,
    }),
    [computedMediaAlign, mediaSettings],
  );

  const memoizedSemanticTags = useMemo(
    () => ({
      cardTitle: 'span' as const,
      cardSubtitle: 'span' as const,
      ...semanticTags,
    }),
    [semanticTags],
  );

  // ==========================================
  // STABLE CONTEXT VALUE
  // ==========================================
  const stableContextValue = useMemo(
    (): StableContextProps => ({
      staticDefaults,
      computedCardHeight,
      computedActiveItemIndex,
      computedSlideShowType,
      computedMediaAlign,
      newContentDetailsHeight,
      memoizedButtonTexts,
      memoizedClassNames,
      memoizedFontSizes,
      memoizedMediaSettings,
      memoizedSemanticTags,

      // Pass through stable props
      mode,
      cardHeight,
      flipLayout,
      items,
      fontSizes,
      textOverlay,
      mediaSettings,
      responsiveBreakPoint,
      enableBreakPoint,
      slideItemDuration: props.slideItemDuration ?? 2000,
      slideShowType: computedSlideShowType,
      cardPositionHorizontal: props.cardPositionHorizontal,
      disableNavOnKey: props.disableNavOnKey,
      itemWidth: props.itemWidth ?? 200,
      lineWidth: props.lineWidth ?? 3,
      scrollable:
        typeof props.scrollable === 'boolean' ? props.scrollable : true,
      onScrollEnd: props.onScrollEnd,
      toolbarPosition: props.toolbarPosition ?? 'top',
      disableToolbar: props.disableToolbar ?? false,
      cardWidth: props.cardWidth,
      borderLessCards: props.borderLessCards ?? false,
      disableAutoScrollOnClick: !!props.disableInteraction,
      classNames: memoizedClassNames,
      showProgressOnSlideshow: slideShow,
      showOverallSlideshowProgress:
        props.showOverallSlideshowProgress ?? slideShow,
      disableInteraction: false,
      highlightCardsOnHover: props.highlightCardsOnHover ?? false,
      disableClickOnCircle: !!props.disableInteraction,
      disableTimelinePoint: !!props.disableInteraction,
      enableQuickJump: props.enableQuickJump ?? true,
      enableLayoutSwitch: props.enableLayoutSwitch ?? true,
      cardLess: cardLess,
      useReadMore: props.useReadMore ?? true,
    }),
    [
      staticDefaults,
      computedCardHeight,
      computedActiveItemIndex,
      computedSlideShowType,
      computedMediaAlign,
      newContentDetailsHeight,
      memoizedButtonTexts,
      memoizedClassNames,
      memoizedFontSizes,
      memoizedMediaSettings,
      memoizedSemanticTags,
      mode,
      cardHeight,
      flipLayout,
      items,
      fontSizes,
      textOverlay,
      mediaSettings,
      responsiveBreakPoint,
      enableBreakPoint,
      slideShow,
      props.cardPositionHorizontal,
      props.disableNavOnKey,
      props.itemWidth,
      props.lineWidth,
      props.scrollable,
      props.onScrollEnd,
      props.toolbarPosition,
      props.disableToolbar,
      props.cardWidth,
      props.borderLessCards,
      props.disableInteraction,
      props.highlightCardsOnHover,
      props.enableQuickJump,
      props.enableLayoutSwitch,
      props.useReadMore,
      props.showOverallSlideshowProgress,
    ],
  );

  // ==========================================
  // DYNAMIC CONTEXT VALUE (theme changes with dark mode)
  // ==========================================
  const memoizedTheme = useMemo(
    () => ({
      ...getDefaultThemeOrDark(isDarkMode),
      ...theme,
    }),
    [isDarkMode, theme],
  );

  const dynamicContextValue = useMemo(
    (): DynamicContextProps => ({
      isDarkMode,
      isMobile: isMobileDetected,
      horizontalAll,
      textContentDensity,
      memoizedTheme,
      toggleDarkMode,
      updateHorizontalAllCards,
      updateTextContentDensity,
    }),
    [
      isDarkMode,
      isMobileDetected,
      horizontalAll,
      textContentDensity,
      memoizedTheme,
      toggleDarkMode,
      updateHorizontalAllCards,
      updateTextContentDensity,
    ],
  );

  return (
    <StableContext.Provider value={stableContextValue}>
      <DynamicContext.Provider value={dynamicContextValue}>
        {children}
      </DynamicContext.Provider>
    </StableContext.Provider>
  );
};
