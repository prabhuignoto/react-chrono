import React from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';
declare const GlobalContext: React.Context<PropsModel>;
declare const GlobalContextProvider: React.FunctionComponent<Partial<PropsModel>>;
export default GlobalContextProvider;
export { GlobalContext };
