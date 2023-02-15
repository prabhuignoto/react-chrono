/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';

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
  } = props;
  const defaultProps = Object.assign<PropsModel, PropsModel, PropsModel>(
    {},
    {
      borderLessCards: false,
      cardLess: false,
      contentDetailsHeight: 150,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      focusActiveItemOnLoad: false,
      fontSizes: {
        cardSubtitle: '0.85rem',
        cardText: '0.8rem',
        cardTitle: '1rem',
        title: '1rem',
      },
      lineWidth: 3,
      mediaHeight: 200,
      mode: 'VERTICAL_ALTERNATING',
      scrollable: {
        scrollbar: false,
      },
      showAllCardsHorizontal: false,
      timelineCircleDimension: 16,
      useReadMore: true,
    },
    {
      ...props,
      activeItemIndex: flipLayout ? items?.length - 1 : 0,
      buttonTexts: {
        first: 'Go to First',
        last: 'Go to Last',
        next: 'Next',
        play: 'Play Slideshow',
        previous: 'Previous',
        ...buttonTexts,
      },
      cardHeight: cardLess ? cardHeight || 80 : cardHeight,
      classNames: {
        card: 'rc-card',
        cardMedia: 'rc-card-media',
        cardSubTitle: 'rc-card-subtitle',
        cardText: 'rc-card-text',
        cardTitle: 'rc-card-title',
        controls: 'rc-controls',
        title: 'rc-title',
        ...classNames,
      },
      theme: Object.assign(
        {
          cardBgColor: '#fff',
          cardForeColor: '#000',
          primary: '#0f52ba',
          secondary: '#ffdf00',
          titleColor: '#000',
          titleColorActive: '#0f52ba',
        },
        theme,
      ),
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
