/* eslint-disable react/prop-types */
import {
  createContext,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';
import {
  getDefaultButtonTexts,
  getDefaultClassNames,
  getDefaultThemeOrDark,
  getSlideShowType,
} from '../utils/index';

const GlobalContext = createContext<
  PropsModel & { toggleDarkMode?: () => void }
>({});

type ContextProps = PropsModel & {
  toggleDarkMode?: () => void;
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
  } = props;

  const [isDarkMode, setIsDarkMode] = useState(darkMode);

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

  const defaultProps = useMemo(
    () =>
      Object.assign<ContextProps, ContextProps, ContextProps>(
        {},
        {
          borderLessCards: false,
          cardHeight: newCardHeight,
          cardLess: false,
          disableAutoScrollOnClick: false,
          disableClickOnCircle: false,
          enableBreakPoint: true,
          enableDarkToggle: false,
          focusActiveItemOnLoad: false,
          lineWidth: 3,
          mediaHeight: 200,
          nestedCardHeight: 150,
          scrollable: {
            scrollbar: false,
          },
          showAllCardsHorizontal: false,
          showProgressOnSlideshow: slideShow,
          slideItemDuration: 2000,
          slideShowType: getSlideShowType(mode),
          textOverlay: false,
          timelinePointDimension: 16,
          timelinePointShape: 'circle',
          titleDateFormat: 'MMM DD, YYYY',
          useReadMore: true,
          verticalBreakPoint: 1028,
        },
        {
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
        },
      ),
    [newContentDetailsHeight, newCardHeight, isDarkMode, toggleDarkMode],
  );

  const { children } = props;

  return (
    <GlobalContext.Provider
      value={{ ...defaultProps, darkMode: isDarkMode, toggleDarkMode }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
