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
      cardHeight: 200,
      useReadMore: true,
      borderLessCards: false,
      timelineCircleDimension: 16,
      lineWidth: 3,
      disableClickOnCircle: false,
      disableAutoScrollOnClick: false,
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
