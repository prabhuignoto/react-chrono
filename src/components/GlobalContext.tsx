/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';

const GlobalContext = React.createContext<PropsModel>({});

const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
  const defaultProps = Object.assign<PropsModel, PropsModel, PropsModel>(
    {},
    {
      borderLessCards: false,
      cardHeight: 200,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      lineWidth: 3,
      scrollable: {
        scrollbar: false,
      },
      timelineCircleDimension: 16,
      useReadMore: true,
    },
    props,
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
