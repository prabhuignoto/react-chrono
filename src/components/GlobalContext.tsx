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
    contentDetailsHeight = 100,
  } = props;

  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const newCardHeight = useMemo(
    () => Math.max(contentDetailsHeight || 0 + mediaHeight || 0, cardHeight),
    [],
  );

  const newContentDetailsHeight = useMemo(
    () => Math.max(contentDetailsHeight, Math.round(newCardHeight * 0.75)),
    [newCardHeight],
  );

  const defaultProps = useMemo(
    () =>
      Object.assign<PropsModel, PropsModel, PropsModel>(
        {},
        {
          borderLessCards: false,
          cardHeight: newCardHeight,
          cardLess: false,
          disableAutoScrollOnClick: false,
          disableClickOnCircle: false,
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
          fontSizes: {
            cardSubtitle: '0.85rem',
            cardText: '1rem',
            cardTitle: '1.25rem',
            title: '1.5rem',
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
        },
      ),
    [newContentDetailsHeight, newCardHeight],
  );

  console.log(defaultProps);

  const { children } = props;

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.();
  }, [isDarkMode]);

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
