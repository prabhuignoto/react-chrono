/* eslint-disable react/prop-types */
import { TimelineProps as PropsModel } from '@models/TimelineModel';
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

const GlobalContext = createContext<
  PropsModel & {
    toggleDarkMode?: () => void;
    updateHorizontalAllCards?: (state: boolean) => void;
  }
>({});

type ContextProps = PropsModel & {
  toggleDarkMode?: () => void;
  updateHorizontalAllCards?: () => void;
};

const GlobalContextProvider: FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
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
  } = props;

  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [horizontalAll, setHorizontalAll] = useState(
    showAllCardsHorizontal || false,
  );

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
          enableBreakPoint: true,
          enableDarkToggle: false,
          enableLayoutSwitch: true,
          focusActiveItemOnLoad: false,
          highlightCardsOnHover: false,
          lineWidth: 3,
          mediaHeight: 200,
          nestedCardHeight: 150,
          parseDetailsAsHTML: false,
          scrollable: {
            scrollbar: false,
          },
          showAllCardsHorizontal: horizontalAll,
          showProgressOnSlideshow: slideShow,
          slideItemDuration: 2000,
          slideShowType: getSlideShowType(mode),
          textOverlay: false,
          timelinePointDimension: 16,
          timelinePointShape: 'circle',
          titleDateFormat: 'MMM DD, YYYY',
          uniqueId: 'react-chrono',
          useReadMore: true,
          verticalBreakPoint: 1028,
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
        mediaSettings: {
          align: mode === 'VERTICAL' && !textOverlay ? 'left' : 'center',
          imageFit: 'cover',
          ...mediaSettings,
        },
        theme: {
          ...getDefaultThemeOrDark(isDarkMode),
          ...theme,
        },
        toggleDarkMode,
        updateHorizontalAllCards,
      }) as ContextProps,
    [
      newContentDetailsHeight,
      newCardHeight,
      isDarkMode,
      toggleDarkMode,
      updateHorizontalAllCards,
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
