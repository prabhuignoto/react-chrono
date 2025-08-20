/* eslint-disable react/prop-types */
/**
 * LEGACY GlobalContext - Backward compatibility bridge over the unified context
 *
 * New code should use TimelineContextProvider/useTimelineContext from ./contexts
 */
import { FunctionComponent, useContext, createContext } from 'react';
import { TimelineContextProvider, useTimelineContext } from './contexts';
import {
  TimelineProps as PropsModel,
  TextDensity,
  type ButtonTexts as ModelButtonTexts,
} from '@models/TimelineModel';

export type LegacyContextProps = PropsModel & {
  isMobile?: boolean;
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: (state: boolean) => void;
  updateTextContentDensity?: (value: TextDensity) => void;
};

export type ContextProps = LegacyContextProps;
export type ButtonTexts = ModelButtonTexts;

// Legacy context for backward compatibility
export const GlobalContext = createContext<LegacyContextProps>({});

/**
 * Legacy GlobalContextProvider - wraps unified provider and exposes legacy API
 */
const GlobalContextProvider: FunctionComponent<ContextProps> = (props) => {
  return (
    <TimelineContextProvider {...props}>
      <LegacyContextBridge originalProps={props}>
        {props.children}
      </LegacyContextBridge>
    </TimelineContextProvider>
  );
};

/**
 * Bridge component that maps unified context to the legacy interface
 */
const LegacyContextBridge: FunctionComponent<{
  children: React.ReactNode;
  originalProps: ContextProps;
}> = ({ children, originalProps }) => {
  const ctx = useTimelineContext();

  const computeLegacyContentDetailsHeight = (): number => {
    const cardHeight = originalProps.cardHeight ?? 200;
    const mediaHeight = originalProps.mediaHeight ?? 200;
    const contentDetailsHeight = originalProps.contentDetailsHeight ?? 10;
    const newCardHeight = Math.max(
      (contentDetailsHeight ?? 0) + (mediaHeight ?? 0),
      cardHeight,
    );
    const detailsHeightApprox = Math.round(newCardHeight * 0.75);
    return Math.max(contentDetailsHeight ?? 0, detailsHeightApprox);
  };

  const computeLegacyActiveItemIndex = (): number => {
    if (originalProps.flipLayout) {
      const length = originalProps.items?.length ?? 0;
      return length > 0 ? length - 1 : -1;
    }
    return 0;
  };

  const legacyContext: ContextProps = {
    // Static/config
    mode: ctx.mode,
    cardHeight: ctx.cardHeight,
    cardWidth: ctx.cardWidth,
    cardLess: ctx.cardLess,
    flipLayout: ctx.flipLayout,
    itemWidth: ctx.itemWidth,
    lineWidth: ctx.lineWidth,
    cardPositionHorizontal: ctx.cardPositionHorizontal as any,
    toolbarPosition: ctx.toolbarPosition,
    disableToolbar: ctx.disableToolbar,
    borderLessCards: ctx.borderLessCards,
    parseDetailsAsHTML: ctx.parseDetailsAsHTML,
    useReadMore: ctx.useReadMore,
    scrollable: ctx.scrollable,
    titleDateFormat: ctx.titleDateFormat,
    uniqueId: ctx.uniqueId,
    nestedCardHeight: ctx.nestedCardHeight,
    textOverlay: ctx.textOverlay,
    responsiveBreakPoint: ctx.responsiveBreakPoint,
    enableBreakPoint: ctx.enableBreakPoint,
    enableLayoutSwitch: ctx.enableLayoutSwitch,
    enableQuickJump: ctx.enableQuickJump,
    enableDarkToggle: ctx.enableDarkToggle,
    focusActiveItemOnLoad: ctx.focusActiveItemOnLoad,
    highlightCardsOnHover: ctx.highlightCardsOnHover,
    timelinePointDimension: ctx.timelinePointDimension,
    timelinePointShape: ctx.timelinePointShape as any,

    // Dynamic
    isMobile: ctx.isMobile,
    darkMode: ctx.isDarkMode,
    showAllCardsHorizontal: ctx.showAllCardsHorizontal,
    textDensity: ctx.textContentDensity,

    // Memoized objects
    theme: ctx.theme,
    buttonTexts: ctx.buttonTexts,
    classNames: ctx.classNames,
    fontSizes: ctx.fontSizes as any,
    mediaSettings: ctx.mediaSettings as any,
    semanticTags: ctx.semanticTags as any,

    // Slideshow
    slideItemDuration: ctx.slideItemDuration,
    slideShowType: ctx.slideShowType as any,
    showProgressOnSlideshow: ctx.showProgressOnSlideshow,
    showOverallSlideshowProgress: ctx.showOverallSlideshowProgress,

    // Derived values expected by legacy consumers/tests
    activeItemIndex: computeLegacyActiveItemIndex(),
    contentDetailsHeight: computeLegacyContentDetailsHeight(),

    // Interaction flags
    disableNavOnKey: ctx.disableNavOnKey,
    disableInteraction: false,
    disableAutoScrollOnClick: ctx.disableAutoScrollOnClick,
    disableClickOnCircle: ctx.disableClickOnCircle,
    disableTimelinePoint: ctx.disableTimelinePoint,

    // Data + callbacks
    items: originalProps.items ?? ctx.items ?? [],
    onScrollEnd: ctx.onScrollEnd,
    onThemeChange: ctx.onThemeChange,
    toggleDarkMode: ctx.toggleDarkMode,
    updateHorizontalAllCards: ctx.updateShowAllCardsHorizontal,
    updateTextContentDensity: ctx.updateTextContentDensity,
  };

  return (
    <GlobalContext.Provider value={legacyContext}>
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * Legacy hook to access the global context
 * @deprecated Use useGlobalContext, useStableContext, or useDynamicContext from ./contexts/hooks
 */
export const useGlobalContextLegacy = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'useGlobalContextLegacy must be used within a GlobalContextProvider',
    );
  }
  return context;
};

export default GlobalContextProvider;
