/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps } from '../models/TimelineModel';

const GlobalContext = React.createContext<TimelineProps>({});

const GlobalContextProvider: React.FunctionComponent<Partial<TimelineProps>> = (
  props,
) => {
  return (
    <GlobalContext.Provider value={props}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
