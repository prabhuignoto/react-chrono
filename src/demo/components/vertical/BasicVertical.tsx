import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, vertical } from '../../App.css';

export interface BasicVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const BasicVertical: FunctionComponent<BasicVerticalProps> = ({ 
  type, 
  items 
}) => (
  <div id="vertical" className={vertical}>
    <div className={componentContainerTree}>
      <Chrono
        items={items}
        mode="vertical"
        id="vertical_basic_test"
        activeItemIndex={2}
        onItemSelected={(selected) => console.log(selected.index)}
        
        layout={{
          cardWidth: 650,
          cardHeight: 200,
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
          compactText: true,
        }}
        
        display={{
          scrollable: { scrollbar: false },
          toolbar: { 
            enabled: true, 
            position: 'bottom',
            search: {
              width: '250px',
              maxWidth: '400px',
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
        }}
        
        darkMode={{
          showToggle: true,
        }}
      />
    </div>
  </div>
); 