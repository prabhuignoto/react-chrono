import React from 'react';
import Chrono from '../components/index';
import timelineData from './data';

export default () => (
  <div style={{ width: '100%', height: '750px', border: "1px solid red" }}>
    <Chrono items={timelineData} mode="VERTICAL" />
  </div>
);
