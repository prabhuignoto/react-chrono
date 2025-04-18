import React from 'react';
import { Chrono } from 'react-chrono';
import { TimelineItem } from './types';

const NestedTimelineDemo: React.FC = () => {
  const nestedItems: TimelineItem[] = [
    {
      title: 'Nested Event 1',
      cardTitle: 'Sub-timeline 1',
      cardSubtitle: 'This demonstrates a nested timeline',
      cardDetailedText:
        'This is the first item in our nested timeline example.',
    },
    {
      title: 'Nested Event 2',
      cardTitle: 'Sub-timeline 2',
      cardSubtitle: 'Second nested event',
      cardDetailedText: 'This is the second item in our nested timeline.',
    },
    {
      title: 'Nested Event 3',
      cardTitle: 'Sub-timeline 3',
      cardSubtitle: 'Third nested event',
      cardDetailedText: 'This is the third item in our nested timeline.',
    },
  ];

  const items: TimelineItem[] = [
    {
      title: 'Event 1',
      cardTitle: 'Main Timeline Event',
      cardSubtitle: 'This event contains a nested timeline',
      cardDetailedText: 'Click on this card to view the nested timeline.',
      url: '#nested',
    },
    {
      title: 'Event 2',
      cardTitle: 'Regular Event',
      cardSubtitle: 'This is a regular timeline event',
      cardDetailedText: 'This is a regular event without any nested content.',
    },
    {
      title: 'Event 3',
      cardTitle: 'Another Nested Timeline',
      cardSubtitle: 'This event also contains a nested timeline',
      cardDetailedText: 'Click on this card to view another nested timeline.',
      url: '#nested2',
    },
  ];

  return (
    <div className="nested-demo">
      <h2>Nested Timelines Demo</h2>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="VERTICAL"
          theme={{
            primary: '#9b59b6',
            secondary: '#c39bd3',
            cardBgColor: '#fff',
            cardForeColor: '#333',
            titleColor: '#333',
            titleColorActive: '#9b59b6',
          }}
          scrollable
          itemWidth={150}
          cardHeight={200}
        />
      </div>

      <div className="nested-timeline" id="nested">
        <h3>Nested Timeline</h3>
        <div className="timeline-container" style={{ height: '400px' }}>
          <Chrono
            items={nestedItems}
            mode="HORIZONTAL"
            theme={{
              primary: '#27ae60',
              secondary: '#81e6a8',
              cardBgColor: '#fff',
              cardForeColor: '#333',
              titleColor: '#333',
              titleColorActive: '#27ae60',
            }}
            scrollable
            itemWidth={150}
            cardHeight={150}
          />
        </div>
      </div>

      <div className="nested-timeline" id="nested2">
        <h3>Another Nested Timeline</h3>
        <div className="timeline-container" style={{ height: '400px' }}>
          <Chrono
            items={nestedItems}
            mode="VERTICAL_ALTERNATING"
            theme={{
              primary: '#e74c3c',
              secondary: '#f1c40f',
              cardBgColor: '#fff',
              cardForeColor: '#333',
              titleColor: '#333',
              titleColorActive: '#e74c3c',
            }}
            scrollable
            itemWidth={150}
            cardHeight={150}
          />
        </div>
      </div>
    </div>
  );
};

export default NestedTimelineDemo;
