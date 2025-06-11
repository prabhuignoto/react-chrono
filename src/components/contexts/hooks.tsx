/**
 * Combined hooks for accessing both stable and dynamic contexts
 * This provides a convenient API while maintaining the optimization benefits
 */
import { useContext } from 'react';
import { StableContext, StableContextProps } from './StableContext';
import { DynamicContext, DynamicContextProps } from './DynamicContext';

// Import the legacy context from the new file to avoid circular dependency
import { LegacyGlobalContext } from './legacy-types';
import { getDefaultButtonTexts, getDefaultClassNames } from '../../utils';

// Combined context type for compatibility
export type CombinedContextProps = StableContextProps & DynamicContextProps;

/**
 * Hook to access legacy global context for fallback scenarios
 */
const useLegacyGlobalContext = () => {
  return useContext(LegacyGlobalContext);
};

/**
 * Convert legacy context to stable context props
 */
const convertLegacyToStable = (legacyContext: any): StableContextProps => {
  return {
    staticDefaults: {
      borderLessCards: legacyContext?.borderLessCards ?? false,
      cardLess: legacyContext?.cardLess ?? false,
      disableTimelinePoint: legacyContext?.disableTimelinePoint ?? false,
      disableToolbar: legacyContext?.disableToolbar ?? false,
      enableBreakPoint: legacyContext?.enableBreakPoint ?? true,
      enableDarkToggle: legacyContext?.enableDarkToggle ?? false,
      enableLayoutSwitch: legacyContext?.enableLayoutSwitch ?? true,
      enableQuickJump: legacyContext?.enableQuickJump ?? true,
      focusActiveItemOnLoad: legacyContext?.focusActiveItemOnLoad ?? false,
      highlightCardsOnHover: legacyContext?.highlightCardsOnHover ?? false,
      isChild: legacyContext?.isChild ?? false,
      lineWidth: legacyContext?.lineWidth ?? 3,
      mediaHeight: legacyContext?.mediaHeight ?? 200,
      nestedCardHeight: legacyContext?.nestedCardHeight ?? 150,
      noUniqueId: legacyContext?.noUniqueId ?? false,
      parseDetailsAsHTML: legacyContext?.parseDetailsAsHTML ?? false,
      scrollable: legacyContext?.scrollable ?? { scrollbar: false },
      timelinePointDimension: legacyContext?.timelinePointDimension ?? 16,
      timelinePointShape: legacyContext?.timelinePointShape ?? 'circle',
      titleDateFormat: legacyContext?.titleDateFormat ?? 'MMM DD, YYYY',
      toolbarPosition: legacyContext?.toolbarPosition ?? 'top',
      uniqueId: legacyContext?.uniqueId ?? 'react-chrono-ui',
      useReadMore: legacyContext?.useReadMore ?? true,
    },
    computedCardHeight: legacyContext?.cardHeight ?? 200,
    computedActiveItemIndex: legacyContext?.activeItemIndex ?? 0,
    computedSlideShowType: legacyContext?.slideShowType ?? 'reveal',
    computedMediaAlign: legacyContext?.mediaAlign ?? 'center',
    newContentDetailsHeight: legacyContext?.contentDetailsHeight ?? 150,
    memoizedButtonTexts: {
      ...getDefaultButtonTexts(),
      ...legacyContext?.buttonTexts,
    },
    memoizedClassNames: {
      ...getDefaultClassNames(),
      ...legacyContext?.classNames,
    },
    memoizedFontSizes: legacyContext?.fontSizes ?? {},
    memoizedMediaSettings: legacyContext?.mediaSettings ?? {},
    memoizedSemanticTags: legacyContext?.semanticTags ?? {},
    mode: legacyContext?.mode,
    cardHeight: legacyContext?.cardHeight,
    flipLayout: legacyContext?.flipLayout,
    items: legacyContext?.items,
    fontSizes: legacyContext?.fontSizes,
    textOverlay: legacyContext?.textOverlay,
    mediaSettings: legacyContext?.mediaSettings,
    responsiveBreakPoint: legacyContext?.responsiveBreakPoint,
    enableBreakPoint: legacyContext?.enableBreakPoint,
    slideItemDuration: legacyContext?.slideItemDuration,
    slideShowType: legacyContext?.slideShowType,
    cardPositionHorizontal: legacyContext?.cardPositionHorizontal,
    disableNavOnKey: legacyContext?.disableNavOnKey,
    itemWidth: legacyContext?.itemWidth,
    lineWidth: legacyContext?.lineWidth,
    scrollable: legacyContext?.scrollable,
    onScrollEnd: legacyContext?.onScrollEnd,
    toolbarPosition: legacyContext?.toolbarPosition,
    disableToolbar: legacyContext?.disableToolbar,
    cardWidth: legacyContext?.cardWidth,
    borderLessCards: legacyContext?.borderLessCards,
    disableAutoScrollOnClick: legacyContext?.disableAutoScrollOnClick,
    classNames: legacyContext?.classNames,
    showProgressOnSlideshow: legacyContext?.showProgressOnSlideshow,
    showOverallSlideshowProgress: legacyContext?.showOverallSlideshowProgress,
    disableInteraction: legacyContext?.disableInteraction,
    highlightCardsOnHover: legacyContext?.highlightCardsOnHover,
    disableClickOnCircle: legacyContext?.disableClickOnCircle,
    disableTimelinePoint: legacyContext?.disableTimelinePoint,
    enableQuickJump: legacyContext?.enableQuickJump,
    enableLayoutSwitch: legacyContext?.enableLayoutSwitch,
    cardLess: legacyContext?.cardLess,
    useReadMore: legacyContext?.useReadMore,
  };
};

/**
 * Convert legacy context to dynamic context props
 */
const convertLegacyToDynamic = (legacyContext: any): DynamicContextProps => {
  return {
    isDarkMode: legacyContext?.darkMode ?? false,
    isMobile: legacyContext?.isMobile ?? false,
    horizontalAll: legacyContext?.showAllCardsHorizontal ?? false,
    textContentDensity: legacyContext?.textDensity ?? 'HIGH',
    memoizedTheme: legacyContext?.theme ?? {},
    toggleDarkMode: legacyContext?.toggleDarkMode ?? (() => {}),
    updateTextContentDensity:
      legacyContext?.updateTextContentDensity ?? (() => {}),
    updateHorizontalAllCards:
      legacyContext?.updateHorizontalAllCards ?? (() => {}),
  };
};

/**
 * Hook to access stable configuration values
 * Use this when components only need configuration data
 */
export const useStableContext = (): StableContextProps => {
  const stableContext = useContext(StableContext);

  // Check if we have properly initialized optimized context
  // The uniqueId being 'react-chrono-ui' indicates default/uninitialized context
  if (
    stableContext &&
    stableContext.staticDefaults.uniqueId !== 'react-chrono-ui'
  ) {
    return stableContext;
  }

  // Fallback to legacy context for tests and backward compatibility
  const legacyContext = useLegacyGlobalContext();
  return convertLegacyToStable(legacyContext);
};

/**
 * Hook to access dynamic state values
 * Use this when components only need dynamic state
 */
export const useDynamicContext = (): DynamicContextProps => {
  const dynamicContext = useContext(DynamicContext);

  // Check if we have properly initialized optimized context
  // If there's no toggleDarkMode function, it's likely uninitialized
  if (
    dynamicContext &&
    dynamicContext.toggleDarkMode &&
    typeof dynamicContext.toggleDarkMode === 'function'
  ) {
    return dynamicContext;
  }

  // Fallback to legacy context for tests and backward compatibility
  const legacyContext = useLegacyGlobalContext();
  return convertLegacyToDynamic(legacyContext);
};

/**
 * Hook to access both stable and dynamic contexts
 * Use this for components that need both types of data
 * This maintains backward compatibility with the old GlobalContext
 */
export const useGlobalContext = (): CombinedContextProps => {
  const stableContext = useContext(StableContext);
  const dynamicContext = useContext(DynamicContext);

  return {
    ...stableContext,
    ...dynamicContext,
  };
};

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useGlobalContext, useStableContext, or useDynamicContext instead
 */
export const useTimelineContext = useGlobalContext;
