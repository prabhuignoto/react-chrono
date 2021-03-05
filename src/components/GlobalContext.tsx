/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps } from '../models/TimelineModel';

const GlobalContext = React.createContext<TimelineProps>({});

const GlobalContextProvider: React.FunctionComponent<Partial<TimelineProps>> = (
  props,
) => {
  const modifiedProps = Object.assign({}, props, {
    cardHeight: 200,
  });
  return (
    <GlobalContext.Provider value={modifiedProps}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
