/* eslint-disable react/prop-types */
/**
 * LEGACY GlobalContext - Maintained for backward compatibility
 *
 * This file now acts as a compatibility layer over the new optimized contexts.
 * New code should use the optimized contexts directly from ./contexts/
 *
 * @deprecated Use OptimizedContextProvider and hooks from ./contexts/ instead
 */
import {
  TimelineProps as PropsModel,
  TextDensity,
} from '@models/TimelineModel';
import { FunctionComponent, useContext } from 'react';
import { OptimizedContextProvider, useGlobalContext } from './contexts';
import {
  LegacyGlobalContext,
  type LegacyContextProps,
  type ButtonTexts,
} from './contexts/legacy-types';

export type ContextProps = LegacyContextProps;
export type { ButtonTexts };

// Re-export the legacy context for backward compatibility
export const GlobalContext = LegacyGlobalContext;

/**
 * Legacy GlobalContextProvider - wraps the new optimized provider
 * @deprecated Use OptimizedContextProvider directly
 */
const GlobalContextProvider: FunctionComponent<ContextProps> = (props) => {
  return (
    <OptimizedContextProvider {...props}>
      <LegacyContextBridge>{props.children}</LegacyContextBridge>
    </OptimizedContextProvider>
  );
};

/**
 * Bridge component that provides the legacy context API
 * using the new optimized contexts under the hood
 */
const LegacyContextBridge: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const combinedContext = useGlobalContext();

  // Map new context properties to legacy interface
  const legacyContext: ContextProps = {
    ...combinedContext,
    // Map property names from new contexts to legacy names
    textDensity: combinedContext.textContentDensity,
    theme: combinedContext.memoizedTheme,
    buttonTexts: combinedContext.memoizedButtonTexts,
    classNames: combinedContext.memoizedClassNames,
    fontSizes: combinedContext.memoizedFontSizes,
    mediaSettings: combinedContext.memoizedMediaSettings,
    semanticTags: combinedContext.memoizedSemanticTags,
    contentDetailsHeight: combinedContext.newContentDetailsHeight,

    // Computed values
    activeItemIndex: combinedContext.computedActiveItemIndex,

    // Type conversion for backward compatibility
    slideShowType: (combinedContext.slideShowType ??
      combinedContext.computedSlideShowType) as any,
    cardPositionHorizontal: combinedContext.cardPositionHorizontal as any,

    // Dynamic state
    isMobile: combinedContext.isMobile,
    showAllCardsHorizontal: combinedContext.horizontalAll,
    darkMode: combinedContext.isDarkMode,

    // Static defaults mapped to top-level properties for legacy compatibility
    borderLessCards: combinedContext.staticDefaults.borderLessCards,
    cardLess: combinedContext.staticDefaults.cardLess,
    disableToolbar: combinedContext.staticDefaults.disableToolbar,
    enableBreakPoint: combinedContext.staticDefaults.enableBreakPoint,
    enableDarkToggle: combinedContext.staticDefaults.enableDarkToggle,
    enableLayoutSwitch: combinedContext.staticDefaults.enableLayoutSwitch,
    enableQuickJump: combinedContext.staticDefaults.enableQuickJump,
    focusActiveItemOnLoad: combinedContext.staticDefaults.focusActiveItemOnLoad,
    highlightCardsOnHover: combinedContext.staticDefaults.highlightCardsOnHover,
    lineWidth: combinedContext.staticDefaults.lineWidth,
    mediaHeight: combinedContext.staticDefaults.mediaHeight,
    nestedCardHeight: combinedContext.staticDefaults.nestedCardHeight,
    parseDetailsAsHTML: combinedContext.staticDefaults.parseDetailsAsHTML,
    scrollable: combinedContext.staticDefaults.scrollable,
    timelinePointDimension:
      combinedContext.staticDefaults.timelinePointDimension,
    timelinePointShape: combinedContext.staticDefaults.timelinePointShape,
    titleDateFormat: combinedContext.staticDefaults.titleDateFormat,
    toolbarPosition: combinedContext.staticDefaults.toolbarPosition,
    uniqueId: combinedContext.staticDefaults.uniqueId,
    useReadMore: combinedContext.staticDefaults.useReadMore,

    // Callbacks
    toggleDarkMode: combinedContext.toggleDarkMode,
    updateHorizontalAllCards: combinedContext.updateHorizontalAllCards,
    updateTextContentDensity: combinedContext.updateTextContentDensity,
  };

  return (
    <LegacyGlobalContext.Provider value={legacyContext}>
      {children}
    </LegacyGlobalContext.Provider>
  );
};

/**
 * Legacy hook to access the global context
 * @deprecated Use useGlobalContext, useStableContext, or useDynamicContext from ./contexts/hooks
 */
export const useGlobalContextLegacy = () => {
  const context = useContext(LegacyGlobalContext);
  if (!context) {
    throw new Error(
      'useGlobalContextLegacy must be used within a GlobalContextProvider',
    );
  }
  return context;
};

export default GlobalContextProvider;
