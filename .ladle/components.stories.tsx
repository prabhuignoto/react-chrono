import React from 'react';
import { Chrono, type TimelineItem } from '../src/react-chrono';

export default { title: 'React Chrono/Basic' };

export const Basic = () => {
  const items: TimelineItem[] = [
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk Evacuation',
      cardSubtitle: 'Operation Dynamo',
      cardDetailedText: 'The British Expeditionary Force evacuated from Dunkirk.',
    },
    {
      title: 'Dec 1941',
      cardTitle: 'Pearl Harbor',
      cardSubtitle: 'A Day of Infamy',
      cardDetailedText: 'Japanese forces attacked the United States naval base.',
    },
    {
      title: 'May 1945',
      cardTitle: 'VE Day',
      cardSubtitle: 'Victory in Europe',
      cardDetailedText: 'Germany surrenders, ending World War II in Europe.',
    },
  ];

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <Chrono
        items={items}
        mode="vertical"
        layout={{
          cardWidth: 600,
          cardHeight: 280,
          pointSize: 18,
        }}
        display={{
          toolbar: { enabled: true, position: 'top' },
          borderless: true,
        }}
      />
    </div>
  );
};

export const WithGroupedAPI = () => {
  const items: TimelineItem[] = [
    {
      title: 'Q1 2024',
      cardTitle: 'Project Kickoff',
      cardSubtitle: 'January 15, 2024',
      cardDetailedText: 'Project initiated with team assembly and infrastructure setup.',
    },
    {
      title: 'Q2 2024',
      cardTitle: 'Development Phase',
      cardSubtitle: 'April 1, 2024',
      cardDetailedText: 'Core features developed and initial testing phase completed.',
    },
    {
      title: 'Q3 2024',
      cardTitle: 'Testing & Refinement',
      cardSubtitle: 'July 1, 2024',
      cardDetailedText: 'QA testing and performance optimization completed.',
    },
  ];

  return (
    <div style={{ width: '800px', height: '500px' }}>
      <Chrono
        items={items}
        mode="vertical"
        layout={{
          cardWidth: 600,
          cardHeight: 300,
          pointSize: 20,
          responsive: {
            enabled: true,
            breakpoint: 768,
          },
        }}
        interaction={{
          focusOnLoad: true,
          cardHover: true,
        }}
        content={{
          allowHTML: true,
          compactText: false,
        }}
        display={{
          toolbar: { enabled: true, position: 'top' },
          borderless: false,
          scrollable: { scrollbar: false },
        }}
        animation={{
          slideshow: {
            enabled: true,
            duration: 2500,
          },
        }}
        style={{
          fontSizes: {
            title: '1.5rem',
            cardTitle: '1.1rem',
          },
          googleFonts: {
            fontFamily: 'Poppins',
            weights: [400, 500, 600, 700],
            display: 'swap',
            preconnect: true,
          },
        }}
        darkMode={{
          showToggle: true,
        }}
      />
    </div>
  );
};

export const Horizontal = () => {
  const items: TimelineItem[] = [
    { title: 'Jan 2024', cardTitle: 'Start' },
    { title: 'Apr 2024', cardTitle: 'Development' },
    { title: 'Jul 2024', cardTitle: 'Testing' },
    { title: 'Oct 2024', cardTitle: 'Launch' },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Chrono
        items={items}
        mode="horizontal"
        layout={{
          cardWidth: 400,
          cardHeight: 280,
          pointSize: 16,
        }}
        display={{
          toolbar: { enabled: true, position: 'bottom' },
          scrollable: { scrollbar: false },
        }}
      />
    </div>
  );
};


