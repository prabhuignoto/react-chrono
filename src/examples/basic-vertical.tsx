import React from 'react';
import Chrono from '../components/index';
import timelineData from './data';

export default () => (
  <div style={{ width: '100%', height: '750px' }}>
    <Chrono items={timelineData} mode="VERTICAL" />
  </div>
);
