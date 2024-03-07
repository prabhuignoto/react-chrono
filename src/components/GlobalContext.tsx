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
    showAllCardsHorizontal || false,
  );

  const [isMobileDetected, setIsMobileDetected] = useState(false);

  const [textContentDensity, setTextContentDensity] =
    useState<TextDensity>(textDensity);

  const newCardHeight = useMemo(
    () => Math.max(contentDetailsHeight || 0 + mediaHeight || 0, cardHeight),
    [],
  );

  const newContentDetailsHeight = useMemo(() => {
    const detailsHeightApprox = Math.round(newCardHeight * 0.75);
    return contentDetailsHeight > newCardHeight
      ? Math.min(contentDetailsHeight, detailsHeightApprox)
      : Math.max(contentDetailsHeight, detailsHeightApprox);
  }, [newCardHeight]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.();
  }, [isDarkMode]);

  const updateHorizontalAllCards = useCallback(
    (state) => {
      setHorizontalAll(state);
    },
    [horizontalAll],
  );

  const updateTextContentDensity = useCallback(
    (value: TextDensity) => {
      setTextContentDensity(value);
    },
    [textContentDensity],
  );

  useMatchMedia(
    `(max-width: ${responsiveBreakPoint - 1}px)`,
    () => setIsMobileDetected(true),
    enableBreakPoint,
  );

  useMatchMedia(
    `(min-width: ${responsiveBreakPoint}px)`,
    () => setIsMobileDetected(false),
    enableBreakPoint,
  );

  // useEffect(() => {
  //   console.log('isMobile', isMobileDetected);
  // }, [isMobileDetected]);

  const defaultProps = useMemo(
    () =>
      ({
        ...{
          borderLessCards: false,
          cardHeight: newCardHeight,
          cardLess: false,
          disableAutoScrollOnClick: !!props.disableInteraction,
          disableClickOnCircle: !!props.disableInteraction,
          disableInteraction: false,
          disableTimelinePoint: !!props.disableInteraction,
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
          showProgressOnSlideshow: slideShow,
          slideItemDuration: 2000,
          slideShowType: getSlideShowType(mode),
          textOverlay: false,
          timelinePointDimension: 16,
          timelinePointShape: 'circle',
          titleDateFormat: 'MMM DD, YYYY',
          toolbarPosition: 'top',
          uniqueId: 'react-chrono',
          useReadMore: true,
        },
        ...props,
        activeItemIndex: flipLayout ? items?.length - 1 : 0,
        buttonTexts: {
          ...getDefaultButtonTexts(),
          ...buttonTexts,
        },
        cardHeight: cardLess ? cardHeight || 80 : cardHeight,
        classNames: {
          ...getDefaultClassNames(),
          ...classNames,
        },
        contentDetailsHeight: newContentDetailsHeight,
        darkMode: isDarkMode,
        fontSizes: {
          cardSubtitle: '0.85rem',
          cardText: '1rem',
          cardTitle: '1rem',
          title: '1rem',
          ...fontSizes,
        },
        isMobile: isMobileDetected,
        mediaSettings: {
          align: mode === 'VERTICAL' && !textOverlay ? 'left' : 'center',
          imageFit: 'cover',
          ...mediaSettings,
        },
        showAllCardsHorizontal: horizontalAll,
        textDensity: textContentDensity,
        theme: {
          ...getDefaultThemeOrDark(isDarkMode),
          ...theme,
        },
        toggleDarkMode,
        updateHorizontalAllCards,
        updateTextContentDensity,
      }) as ContextProps,
    [
      newContentDetailsHeight,
      newCardHeight,
      isDarkMode,
      toggleDarkMode,
      updateHorizontalAllCards,
      textContentDensity,
      isMobileDetected,
    ],
  );

  const providerValue = useMemo(
    () => ({
      ...defaultProps,
      darkMode: isDarkMode,
      toggleDarkMode,
      updateHorizontalAllCards,
    }),
    [defaultProps, isDarkMode],
  );

  const { children } = props;

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
