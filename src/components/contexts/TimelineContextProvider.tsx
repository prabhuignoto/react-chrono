/**
 * Unified Timeline Context Provider
 * 
 * This provider replaces the multiple context layers with a single, 
 * clean context system that properly handles all timeline props.
 */
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import {
  TimelineProps as TimelinePropsModel,
  TextDensity,
  ButtonTexts,
  SlideShowType,
} from '@models/TimelineModel';
import { Theme } from '@models/Theme';
import {
  getDefaultButtonTexts,
  getDefaultClassNames,
  getDefaultThemeOrDark,
  getSlideShowType,
} from '@utils/index';
import { useMatchMedia } from '../effects/useMatchMedia';

// ==========================================
// CONTEXT INTERFACES
// ==========================================

/**
 * Static configuration that rarely changes
 */
export interface TimelineStaticConfig {
  // Core layout
  mode: NonNullable<TimelinePropsModel['mode']>;
  cardHeight: number;
  cardWidth?: number;
  cardLess: boolean;
  flipLayout?: boolean;
  itemWidth: number;
  lineWidth: number;
  
  // Media configuration
  mediaHeight: number;
  mediaSettings: {
    align: 'left' | 'right' | 'center';
    fit: 'cover' | 'contain' | 'fill' | 'none';
  };
  
  // Timeline point configuration
  timelinePointDimension: number;
  timelinePointShape: 'circle' | 'square' | 'diamond';
  
  // Interaction settings
  disableNavOnKey: boolean;
  disableAutoScrollOnClick: boolean;
  disableInteraction: boolean;
  disableClickOnCircle: boolean;
  disableTimelinePoint: boolean;
  
  // UI features
  enableBreakPoint: boolean;
  enableDarkToggle: boolean;
  enableLayoutSwitch: boolean;
  enableQuickJump: boolean;
  focusActiveItemOnLoad: boolean;
  highlightCardsOnHover: boolean;
  
  // Cards and content
  borderLessCards: boolean;
  cardPositionHorizontal?: 'TOP' | 'BOTTOM';
  parseDetailsAsHTML: boolean;
  useReadMore: boolean;
  textOverlay?: boolean;
  
  // Scrolling
  scrollable: boolean | { scrollbar: boolean };
  
  // Toolbar
  toolbarPosition: 'top' | 'bottom';
  disableToolbar: boolean;
  
  // Slideshow
  slideItemDuration: number;
  showProgressOnSlideshow: boolean;
  showOverallSlideshowProgress: boolean;
  
  // Misc
  titleDateFormat: string;
  uniqueId: string;
  nestedCardHeight: number;
  contentDetailsHeight: number;
  responsiveBreakPoint: number;
  noUniqueId: boolean;
  isChild: boolean;
}

/**
 * Dynamic state that changes frequently
 */
export interface TimelineDynamicState {
  isDarkMode: boolean;
  isMobile: boolean;
  showAllCardsHorizontal: boolean;
  textContentDensity: TextDensity;
  
  // Actions
  toggleDarkMode: () => void;
  updateShowAllCardsHorizontal: (state: boolean) => void;
  updateTextContentDensity: (density: TextDensity) => void;
}

/**
 * Memoized objects that change less frequently
 */
export interface TimelineMemoizedObjects {
  theme: Theme;
  buttonTexts: ButtonTexts;
  classNames: Record<string, string>;
  fontSizes: Record<string, string>;
  semanticTags: Record<string, string>;
  slideShowType: SlideShowType;
}

/**
 * Combined context interface
 */
export interface TimelineContextValue extends 
  TimelineStaticConfig,
  TimelineDynamicState,
  TimelineMemoizedObjects {
  
  // Computed values
  computedCardHeight: number;
  computedActiveItemIndex: number;
  computedMediaAlign: string;
  
  // Timeline-specific data
  items?: TimelinePropsModel['items'];
  activeItemIndex?: number;
  
  // Callbacks
  onScrollEnd?: () => void;
  onThemeChange?: () => void;
}

// ==========================================
// CONTEXT CREATION
// ==========================================

const TimelineContext = createContext<TimelineContextValue | null>(null);

// ==========================================
// PROVIDER PROPS AND COMPONENT
// ==========================================

export interface TimelineContextProviderProps extends Omit<Partial<TimelinePropsModel>, 'children'> {
  children: React.ReactNode;
}

export const TimelineContextProvider: FunctionComponent<TimelineContextProviderProps> = (props) => {
  const {
    children,
    // Core props with defaults
    mode = 'VERTICAL_ALTERNATING',
    cardHeight = 200,
    cardWidth,
    cardLess = false,
    flipLayout,
    itemWidth = 200,
    lineWidth = 3,
    
    // Media props
    mediaHeight = 200,
    mediaSettings,
    
    // Timeline point props
    timelinePointDimension = 16,
    timelinePointShape = 'circle',
    
    // Interaction props
    disableNavOnKey = false,
    disableAutoScrollOnClick = false,
    disableInteraction = false,
    disableClickOnCircle = false,
    disableTimelinePoint = false,
    
    // UI feature props
    enableBreakPoint = true,
    enableDarkToggle = false,
    enableLayoutSwitch = true,
    enableQuickJump = true,
    focusActiveItemOnLoad = false,
    highlightCardsOnHover = false,
    
    // Cards and content props
    borderLessCards = false,
    cardPositionHorizontal,
    parseDetailsAsHTML = false,
    useReadMore = true,
    textOverlay,
    
    // Scrolling props (default aligns with legacy behavior: no scrollbar)
    scrollable = { scrollbar: false },
    
    // Toolbar props
    toolbarPosition = 'top',
    disableToolbar = false,
    
    // Slideshow props
    slideItemDuration = 2000,
    showProgressOnSlideshow = true,
    showOverallSlideshowProgress,
    slideShow,
    slideShowType,
    
    // Other props
    titleDateFormat = 'MMM DD, YYYY',
    uniqueId = 'react-chrono',
    nestedCardHeight = 150,
    contentDetailsHeight = 10,
    responsiveBreakPoint = 1024,
    noUniqueId = false,
    isChild = false,
    
    // Dynamic props
    darkMode = false,
    showAllCardsHorizontal = false,
    textDensity = 'HIGH' as TextDensity,
    
    // Customization props
    theme,
    buttonTexts,
    classNames,
    fontSizes,
    semanticTags,
    
    // Data props
    items,
    activeItemIndex = 0,
    
    // Callbacks
    onScrollEnd,
    onThemeChange,
  } = props;

  // ==========================================
  // DYNAMIC STATE
  // ==========================================
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [showAllCards, setShowAllCards] = useState(
    mode === 'HORIZONTAL_ALL' ? true : showAllCardsHorizontal
  );
  const [isMobileDetected, setIsMobileDetected] = useState(false);
  const [textContentDensity, setTextContentDensity] = useState<TextDensity>(textDensity);

  // ==========================================
  // CALLBACKS
  // ==========================================
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.();
  }, [isDarkMode, onThemeChange]);

  const updateShowAllCardsHorizontal = useCallback((state: boolean) => {
    setShowAllCards(state);
  }, []);

  const updateTextContentDensity = useCallback((density: TextDensity) => {
    setTextContentDensity(density);
  }, []);

  // ==========================================
  // MODE SYNCHRONIZATION
  // ==========================================
  // Update showAllCardsHorizontal when mode or prop changes
  useEffect(() => {
    if (mode === 'HORIZONTAL_ALL') {
      setShowAllCards(true);
    } else if (mode === 'HORIZONTAL') {
      // Respect the incoming prop to allow HORIZONTAL + showAllCardsHorizontal
      setShowAllCards(showAllCardsHorizontal);
    }
  }, [mode, showAllCardsHorizontal]);

  // ==========================================
  // RESPONSIVE DETECTION
  // ==========================================
  useMatchMedia(`(max-width: ${responsiveBreakPoint - 1}px)`, {
    onMatch: () => setIsMobileDetected(true),
    enabled: enableBreakPoint,
  });

  useMatchMedia(`(min-width: ${responsiveBreakPoint}px)`, {
    onMatch: () => setIsMobileDetected(false),
    enabled: enableBreakPoint,
  });

  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  const computedCardHeight = useMemo(
    () => (cardLess ? Math.min(cardHeight, 80) : cardHeight),
    [cardLess, cardHeight]
  );

  const computedActiveItemIndex = useMemo(
    () => (flipLayout && items ? items.length - 1 : 0),
    [flipLayout, items?.length]
  );

  const computedMediaAlign = useMemo(
    () => (mode === 'VERTICAL' && !textOverlay ? 'left' : 'center'),
    [mode, textOverlay]
  );

  // ==========================================
  // MEMOIZED OBJECTS
  // ==========================================
  const memoizedTheme = useMemo(
    () => ({
      ...getDefaultThemeOrDark(isDarkMode),
      ...theme,
    }),
    [isDarkMode, theme]
  );

  const memoizedButtonTexts = useMemo(
    () => ({
      ...getDefaultButtonTexts(),
      ...buttonTexts,
    }),
    [buttonTexts]
  );

  const memoizedClassNames = useMemo(
    () => ({
      ...getDefaultClassNames(),
      ...classNames,
    }),
    [classNames]
  );

  const memoizedFontSizes = useMemo(
    () => ({
      cardSubtitle: '0.85rem',
      cardText: '1rem',
      cardTitle: '1rem',
      title: '1rem',
      ...fontSizes,
    }),
    [fontSizes]
  );

  const memoizedMediaSettings = useMemo(
    () => ({
      align: computedMediaAlign as 'left' | 'right' | 'center',
      fit: 'cover' as const,
      ...mediaSettings,
    }),
    [computedMediaAlign, mediaSettings]
  );

  const memoizedSemanticTags = useMemo(
    () => ({
      cardTitle: 'span' as const,
      cardSubtitle: 'span' as const,
      ...semanticTags,
    }),
    [semanticTags]
  );

  const memoizedSlideShowType = useMemo(
    () => slideShowType ?? getSlideShowType(mode),
    [slideShowType, mode]
  );

  // ==========================================
  // CONTEXT VALUE
  // ==========================================
  const contextValue = useMemo((): TimelineContextValue => ({
    // Static configuration
    mode,
    cardHeight,
    cardWidth,
    cardLess,
    flipLayout,
    itemWidth,
    lineWidth,
    mediaHeight,
    mediaSettings: memoizedMediaSettings,
    timelinePointDimension,
    timelinePointShape,
    disableNavOnKey,
    disableAutoScrollOnClick: disableAutoScrollOnClick || disableInteraction,
    disableInteraction,
    disableClickOnCircle: disableClickOnCircle || disableInteraction,
    disableTimelinePoint: disableTimelinePoint || disableInteraction,
    enableBreakPoint,
    enableDarkToggle,
    enableLayoutSwitch,
    enableQuickJump,
    focusActiveItemOnLoad,
    highlightCardsOnHover,
    borderLessCards,
    cardPositionHorizontal,
    parseDetailsAsHTML,
    useReadMore,
    textOverlay,
    scrollable,
    toolbarPosition,
    disableToolbar,
    slideItemDuration,
    showProgressOnSlideshow: showProgressOnSlideshow && !!slideShow,
    showOverallSlideshowProgress: showOverallSlideshowProgress ?? !!slideShow,
    titleDateFormat,
    uniqueId,
    nestedCardHeight,
    contentDetailsHeight: Math.max(contentDetailsHeight, mediaHeight * 0.75),
    responsiveBreakPoint,
    noUniqueId,
    isChild,
    
    // Dynamic state
    isDarkMode,
    isMobile: isMobileDetected,
    showAllCardsHorizontal: showAllCards,
    textContentDensity,
    toggleDarkMode,
    updateShowAllCardsHorizontal,
    updateTextContentDensity,
    
    // Memoized objects
    theme: memoizedTheme,
    buttonTexts: memoizedButtonTexts,
    classNames: memoizedClassNames,
    fontSizes: memoizedFontSizes,
    semanticTags: memoizedSemanticTags,
    slideShowType: memoizedSlideShowType,
    
    // Computed values
    computedCardHeight,
    computedActiveItemIndex,
    computedMediaAlign,
    
    // Timeline-specific data
    items,
    activeItemIndex,
    
    // Callbacks
    onScrollEnd,
    onThemeChange,
  }), [
    // Static config dependencies
    mode, cardHeight, cardWidth, cardLess, flipLayout, itemWidth, lineWidth,
    mediaHeight, memoizedMediaSettings, timelinePointDimension, timelinePointShape,
    disableNavOnKey, disableAutoScrollOnClick, disableInteraction, disableClickOnCircle,
    disableTimelinePoint, enableBreakPoint, enableDarkToggle, enableLayoutSwitch,
    enableQuickJump, focusActiveItemOnLoad, highlightCardsOnHover, borderLessCards,
    cardPositionHorizontal, parseDetailsAsHTML, useReadMore, textOverlay, scrollable,
    toolbarPosition, disableToolbar, slideItemDuration, showProgressOnSlideshow,
    showOverallSlideshowProgress, slideShow, titleDateFormat, uniqueId, nestedCardHeight,
    contentDetailsHeight, responsiveBreakPoint, noUniqueId, isChild,
    
    // Dynamic state dependencies
    isDarkMode, isMobileDetected, showAllCards, textContentDensity,
    toggleDarkMode, updateShowAllCardsHorizontal, updateTextContentDensity,
    
    // Memoized objects dependencies
    memoizedTheme, memoizedButtonTexts, memoizedClassNames, memoizedFontSizes,
    memoizedSemanticTags, memoizedSlideShowType,
    
    // Computed values dependencies
    computedCardHeight, computedActiveItemIndex, computedMediaAlign,
    
    // Data dependencies
    items, activeItemIndex,
    
    // Callback dependencies
    onScrollEnd, onThemeChange,
  ]);

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  );
};

// ==========================================
// CONTEXT HOOK
// ==========================================

/**
 * Hook to access the timeline context
 */
export const useTimelineContext = (): TimelineContextValue => {
  const context = useContext(TimelineContext);
  
  if (!context) {
    throw new Error('useTimelineContext must be used within a TimelineContextProvider');
  }
  
  return context;
};

/**
 * Hook to access only static configuration (performance optimized)
 */
export const useTimelineStaticConfig = (): TimelineStaticConfig => {
  const context = useTimelineContext();
  
  return useMemo(() => ({
    mode: context.mode,
    cardHeight: context.cardHeight,
    cardWidth: context.cardWidth,
    cardLess: context.cardLess,
    flipLayout: context.flipLayout,
    itemWidth: context.itemWidth,
    lineWidth: context.lineWidth,
    mediaHeight: context.mediaHeight,
    mediaSettings: context.mediaSettings,
    timelinePointDimension: context.timelinePointDimension,
    timelinePointShape: context.timelinePointShape,
    disableNavOnKey: context.disableNavOnKey,
    disableAutoScrollOnClick: context.disableAutoScrollOnClick,
    disableInteraction: context.disableInteraction,
    disableClickOnCircle: context.disableClickOnCircle,
    disableTimelinePoint: context.disableTimelinePoint,
    enableBreakPoint: context.enableBreakPoint,
    enableDarkToggle: context.enableDarkToggle,
    enableLayoutSwitch: context.enableLayoutSwitch,
    enableQuickJump: context.enableQuickJump,
    focusActiveItemOnLoad: context.focusActiveItemOnLoad,
    highlightCardsOnHover: context.highlightCardsOnHover,
    borderLessCards: context.borderLessCards,
    cardPositionHorizontal: context.cardPositionHorizontal,
    parseDetailsAsHTML: context.parseDetailsAsHTML,
    useReadMore: context.useReadMore,
    textOverlay: context.textOverlay,
    scrollable: context.scrollable,
    toolbarPosition: context.toolbarPosition,
    disableToolbar: context.disableToolbar,
    slideItemDuration: context.slideItemDuration,
    showProgressOnSlideshow: context.showProgressOnSlideshow,
    showOverallSlideshowProgress: context.showOverallSlideshowProgress,
    titleDateFormat: context.titleDateFormat,
    uniqueId: context.uniqueId,
    nestedCardHeight: context.nestedCardHeight,
    contentDetailsHeight: context.contentDetailsHeight,
    responsiveBreakPoint: context.responsiveBreakPoint,
    noUniqueId: context.noUniqueId,
    isChild: context.isChild,
  }), [context]);
};

/**
 * Hook to access only dynamic state (performance optimized)
 */
export const useTimelineDynamicState = (): TimelineDynamicState => {
  const context = useTimelineContext();
  
  return useMemo(() => ({
    isDarkMode: context.isDarkMode,
    isMobile: context.isMobile,
    showAllCardsHorizontal: context.showAllCardsHorizontal,
    textContentDensity: context.textContentDensity,
    toggleDarkMode: context.toggleDarkMode,
    updateShowAllCardsHorizontal: context.updateShowAllCardsHorizontal,
    updateTextContentDensity: context.updateTextContentDensity,
  }), [context]);
};

/**
 * Hook to access only memoized objects (performance optimized)
 */
export const useTimelineMemoizedObjects = (): TimelineMemoizedObjects => {
  const context = useTimelineContext();
  
  return useMemo(() => ({
    theme: context.theme,
    buttonTexts: context.buttonTexts,
    classNames: context.classNames,
    fontSizes: context.fontSizes,
    semanticTags: context.semanticTags,
    slideShowType: context.slideShowType,
  }), [context]);
};