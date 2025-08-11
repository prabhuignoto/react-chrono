import React from 'react';
import { Chrono, type TimelineItem } from '../src/react-chrono';

export default { title: 'React Chrono/Basic' };

export const Basic = () => {
  const items: TimelineItem[] = [
    { title: 'May 1940', cardTitle: 'Dunkirk Evacuation' },
    { title: 'Dec 1941', cardTitle: 'Pearl Harbor' },
  ];

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Chrono items={items} />
    </div>
  );
};


