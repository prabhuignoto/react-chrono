/* eslint-disable react/prop-types */
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
import {
  FunctionComponent,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useMatchMedia } from './effects/useMatchMedia';

export type ContextProps = PropsModel & {
  isMobile?: boolean;
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: (state: boolean) => void;
  updateTextContentDensity?: (value: TextDensity) => void;
};

const GlobalContext = createContext<ContextProps>({});

export interface ButtonTexts {
  first?: string;
  last?: string;
  play?: string;
  stop?: string;
  previous?: string;
  next?: string;
  dark?: string;
  light?: string;
  timelinePoint?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  clearSearch?: string;
  nextMatch?: string;
  previousMatch?: string;
}

const GlobalContextProvider: FunctionComponent<ContextProps> = (props) => {
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
  } = props;

  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const [horizontalAll, setHorizontalAll] = useState(
    showAllCardsHorizontal ?? false,
  );

  const [isMobileDetected, setIsMobileDetected] = useState(false);

  const [textContentDensity, setTextContentDensity] =
    useState<TextDensity>(textDensity);

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

  useMatchMedia(`(max-width: ${responsiveBreakPoint - 1}px)`, {
    onMatch: () => setIsMobileDetected(true),
    enabled: enableBreakPoint,
  });

  useMatchMedia(`(min-width: ${responsiveBreakPoint}px)`, {
    onMatch: () => setIsMobileDetected(false),
    enabled: enableBreakPoint,
  });

  const staticDefaults = useMemo(
    () => ({
      borderLessCards: false,
      cardLess: false,
      disableToolbar: false,
      enableBreakPoint: true,
      enableDarkToggle: false,
      enableLayoutSwitch: true,
      enableQuickJump: true,
      focusActiveItemOnLoad: false,
      highlightCardsOnHover: false,
      lineWidth: 3,
      mediaHeight: 200,
      nestedCardHeight: 150,
      parseDetailsAsHTML: false,
      scrollable: {
        scrollbar: false,
      },
      timelinePointDimension: 16,
      timelinePointShape: 'circle' as const,
      titleDateFormat: 'MMM DD, YYYY',
      toolbarPosition: 'top' as const,
      uniqueId: 'react-chrono',
      useReadMore: true,
    }),
    [],
  );

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
      imageFit: 'cover' as const,
      ...mediaSettings,
    }),
    [computedMediaAlign, mediaSettings],
  );

  const memoizedTheme = useMemo(
    () => ({
      ...getDefaultThemeOrDark(isDarkMode),
      ...theme,
    }),
    [isDarkMode, theme],
  );

  const defaultProps = useMemo(
    () =>
      ({
        ...staticDefaults,
        mode: 'VERTICAL_ALTERNATING',
        ...props,
        activeItemIndex: computedActiveItemIndex,
        buttonTexts: memoizedButtonTexts,
        cardHeight: computedCardHeight,
        classNames: memoizedClassNames,
        contentDetailsHeight: newContentDetailsHeight,
        darkMode: isDarkMode,
        disableAutoScrollOnClick: !!props.disableInteraction,
        disableClickOnCircle: !!props.disableInteraction,
        disableInteraction: false,
        disableTimelinePoint: !!props.disableInteraction,
        fontSizes: memoizedFontSizes,
        isMobile: isMobileDetected,
        mediaSettings: memoizedMediaSettings,
        showAllCardsHorizontal: horizontalAll,
        showProgressOnSlideshow: slideShow,
        slideItemDuration: 2000,
        slideShowType: computedSlideShowType,
        textDensity: textContentDensity,
        theme: memoizedTheme,
        toggleDarkMode,
        updateHorizontalAllCards,
        updateTextContentDensity,
      }) as ContextProps,
    [
      staticDefaults,
      props,
      computedActiveItemIndex,
      memoizedButtonTexts,
      computedCardHeight,
      memoizedClassNames,
      newContentDetailsHeight,
      isDarkMode,
      memoizedFontSizes,
      isMobileDetected,
      memoizedMediaSettings,
      horizontalAll,
      slideShow,
      computedSlideShowType,
      textContentDensity,
      memoizedTheme,
      toggleDarkMode,
      updateHorizontalAllCards,
      updateTextContentDensity,
    ],
  );

  const providerValue = useMemo(() => defaultProps, [defaultProps]);

  const { children } = props;

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
