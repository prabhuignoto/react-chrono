/* eslint-disable react/prop-types */
import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';

const GlobalContext = React.createContext<PropsModel>({});

const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
  const defaultProps = Object.assign<
    PropsModel,
    PropsModel,
    PropsModel
  >(
    {},
    {
      cardHeight: 200,
      useReadMore: true,
    },
    props,
  );
  return (
    <GlobalContext.Provider value={defaultProps}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
