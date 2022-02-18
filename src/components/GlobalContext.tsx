/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';

const GlobalContext = React.createContext<PropsModel>({});

const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
  const { cardHeight, cardLess = false, flipLayout, items = [] } = props;
  const defaultProps = Object.assign<PropsModel, PropsModel, PropsModel>(
    {},
    {
      borderLessCards: false,
      cardLess: false,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      lineWidth: 3,
      mode: 'VERTICAL_ALTERNATING',
      scrollable: {
        scrollbar: false,
      },
      timelineCircleDimension: 16,
      useReadMore: true,
    },
    {
      ...props,
      activeItemIndex: flipLayout ? items?.length - 1 : 0,
      cardHeight: cardLess ? (cardHeight ? cardHeight : 80) : cardHeight,
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
