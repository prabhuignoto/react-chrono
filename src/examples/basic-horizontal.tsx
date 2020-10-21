import { Chrono } from 'react-chrono';
import timelineData from './data';
import React from 'react';

export default () => (
  <div style={{ width: '100%', height: '500px' }}>
    <Chrono items={timelineData} />
  </div>
);
