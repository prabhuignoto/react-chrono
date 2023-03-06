/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';
import {
  getDefaultButtonTexts,
  getDefaultClassNames,
  getDefaultThemeOrDark,
} from '../utils/index';

const GlobalContext = React.createContext<PropsModel>({});

const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>> = (
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
    mode,
    fontSizes,
    textOverlay,
    darkMode,
  } = props;
  const defaultProps = Object.assign<PropsModel, PropsModel, PropsModel>(
    {},
    {
      alignMedia: mode === 'VERTICAL' && !textOverlay ? 'left' : 'center',
      borderLessCards: false,
      cardLess: false,
      contentDetailsHeight: 150,
      darkMode: false,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      focusActiveItemOnLoad: false,
      lineWidth: 3,
      mediaHeight: 200,
      mode: 'VERTICAL_ALTERNATING',
      scrollable: {
        scrollbar: false,
      },
      showAllCardsHorizontal: false,
      slideShowType: 'reveal',
      textOverlay: false,
      timelineCircleDimension: 16,
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
      fontSizes: {
        cardSubtitle: '0.85rem',
        cardText: '1rem',
        cardTitle: '1.25rem',
        title: '1.5rem',
        ...fontSizes,
      },
      theme: {
        ...getDefaultThemeOrDark(darkMode),
        ...theme,
      },
    },
  );

  const { children } = props;

  return (
    <GlobalContext.Provider value={defaultProps}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
