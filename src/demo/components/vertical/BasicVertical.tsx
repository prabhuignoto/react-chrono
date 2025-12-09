import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import DemoPageLayout from '../DemoPageLayout';

export interface BasicVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

const codeExample = `import { Chrono } from 'react-chrono';

const items = [
  {
    title: "May 1940",
    cardTitle: "World War II",
    cardSubtitle: "The Battle of France",
    cardDetailedText: "The German forces invaded France..."
  },
  // ... more items
];

function BasicVerticalTimeline() {
  return (
    <Chrono
      items={items}
      mode="vertical"
      activeItemIndex={2}
      layout={{
        cardWidth: 650,
        cardHeight: 200,
        responsive: {
          enabled: true,
          breakpoint: 768,
        },
      }}
      display={{
        toolbar: { enabled: true, position: 'bottom' },
      }}
      animation={{
        slideshow: { enabled: true, duration: 2500 },
      }}
    />
  );
}`;

export const BasicVertical: FunctionComponent<BasicVerticalProps> = ({
  type,
  items
}) => (
  <DemoPageLayout
    title="Basic Vertical Timeline"
    description="A clean, vertical timeline layout perfect for chronological storytelling. This is the most commonly used timeline format, displaying events from top to bottom with cards alternating on either side of a central timeline trunk."
    features={[
      'Vertical Layout',
      'Responsive Design',
      'Alternating Cards',
      'Auto Slideshow',
      'Search & Navigation',
      'Keyboard Accessible'
    ]}
    codeExample={codeExample}
  >
    <div style={{ minHeight: '600px', maxHeight: '800px', padding: '20px' }}>
      <Chrono
        items={items}
        mode="vertical"
        id="vertical_basic_test"
        activeItemIndex={2}
        allowDynamicUpdate={true}
        onItemSelected={(selected) => console.log(selected.index)}

        layout={{
          cardWidth: 650,
          cardHeight: 300,
          pointSize: 20,
          responsive: {
            enabled: true,
            breakpoint: 768,
          },
        }}

        interaction={{
          focusOnLoad: false,
          cardHover: true,
        }}

        content={{
          allowHTML: true,
          compactText: true,
        }}

        display={{
          scrollable: { scrollbar: false },
          borderless: true,
          toolbar: {
            enabled: true,
            position: 'top',
            search: {
              width: '450px',
              maxWidth: '600px',
              inputWidth: '100%',
            }
          },
        }}

        media={{
          align: 'center',
          fit: 'cover',
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
          },
          classNames: {
            cardText: 'custom-text',
          },
          googleFonts: {
            fontFamily: 'Poppins',
            elements: {
              title: {
                weight: 'bold',
                style: 'normal',
                size: '2rem'
              },
              cardTitle: {
                weight: 'semi-bold',
                style: 'normal',
                size: '1.2rem'
              },
              cardSubtitle: {
                weight: 'normal',
                style: 'italic',
                size: '1rem'
              },
              cardText: {
                weight: 'light',
                style: 'normal',
                size: '0.95rem'
              },
              controls: {
                weight: 'medium',
                style: 'normal',
                size: '0.875rem'
              }
            },
            weights: [300, 400, 500, 600, 700, 'italic'],
            display: 'swap',
            preconnect: true
          }
        }}

        theme={{
          cardDetailsColor: '#555555',
          titleColor: '#fff',
        }}

        darkMode={{
          showToggle: true,
        }}
      />
    </div>
  </DemoPageLayout>
); 