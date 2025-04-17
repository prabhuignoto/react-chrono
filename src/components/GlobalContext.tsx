/* eslint-disable react/prop-types */
import {
  TimelineProps as PropsModel,
  TextDensity,
  SlideShowType,
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

interface DefaultProps {
  borderLessCards: boolean;
  disableAutoScrollOnClick: boolean;
  disableClickOnCircle: boolean;
  disableInteraction: boolean;
  disableTimelinePoint: boolean;
  disableToolbar: boolean;
  enableBreakPoint: boolean;
  enableDarkToggle: boolean;
  enableLayoutSwitch: boolean;
  enableQuickJump: boolean;
  focusActiveItemOnLoad: boolean;
  highlightCardsOnHover: boolean;
  lineWidth: number;
  mediaHeight: number;
  nestedCardHeight: number;
  parseDetailsAsHTML: boolean;
  scrollable: { scrollbar: boolean };
  showProgressOnSlideshow: boolean;
  slideItemDuration: number;
  slideShowType: SlideShowType;
  textOverlay: boolean;
  timelinePointDimension: number;
  timelinePointShape: 'circle' | 'square' | 'diamond';
  titleDateFormat: string;
  toolbarPosition: 'top' | 'bottom';
  uniqueId: string;
  useReadMore: boolean;
}

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

  const newCardHeight = Math.max(
    (contentDetailsHeight || 0) + (mediaHeight || 0),
    cardHeight,
  );

  const newContentDetailsHeight = useMemo(() => {
    const detailsHeightApprox = Math.round(newCardHeight * 0.75);
    return contentDetailsHeight > newCardHeight
      ? Math.min(contentDetailsHeight, detailsHeightApprox)
      : Math.max(contentDetailsHeight, detailsHeightApprox);
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

  const defaultProps: DefaultProps = {
    borderLessCards: false,
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
    scrollable: { scrollbar: false },
    showProgressOnSlideshow: slideShow,
    slideItemDuration: 2000,
    slideShowType: getSlideShowType(mode) as SlideShowType,
    textOverlay: false,
    timelinePointDimension: 16,
    timelinePointShape: 'circle' as 'circle' | 'square' | 'diamond',
    titleDateFormat: 'MMM DD, YYYY',
    toolbarPosition: 'top' as 'top' | 'bottom',
    uniqueId: 'react-chrono',
    useReadMore: true,
  };

  const providerValue = useMemo(
    () => ({
      ...defaultProps,
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
        align: (mode === 'VERTICAL' && !textOverlay ? 'left' : 'center') as
          | 'left'
          | 'center'
          | 'right',
        imageFit: 'cover' as 'fill' | 'cover' | 'contain' | 'none',
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
    }),
    [
      defaultProps,
      props,
      flipLayout,
      items,
      buttonTexts,
      cardLess,
      cardHeight,
      classNames,
      newContentDetailsHeight,
      isDarkMode,
      fontSizes,
      isMobileDetected,
      mode,
      textOverlay,
      mediaSettings,
      horizontalAll,
      textContentDensity,
      theme,
      toggleDarkMode,
      updateHorizontalAllCards,
      updateTextContentDensity,
    ],
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
