/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';

const GlobalContext = React.createContext<PropsModel>({});

const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
  const { cardHeight, cardLess = false } = props;
  const defaultProps = Object.assign(
    {},
    {
      borderLessCards: false,
      cardLess,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      lineWidth: 3,
      scrollable: {
        scrollbar: false,
      },
      timelineCircleDimension: 16,
      useReadMore: true,
    },
    {
      ...props,
      cardHeight: cardLess ? (cardHeight ? cardHeight : 80) : cardHeight,
    },
  );
  const { children } = props;

  console.log(defaultProps);
  return (
    <GlobalContext.Provider value={defaultProps}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
