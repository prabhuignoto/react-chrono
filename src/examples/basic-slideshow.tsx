import Chrono from '../components/index';
import timelineData from './data';
import React from 'react';

export default () => (
  <div style={{ width: '100%', height: '750px' }}>
    <Chrono
      items={timelineData}
      mode="VERTICAL"
      slideShow
      slideItemDuration={4500}
    />
  </div>
);
