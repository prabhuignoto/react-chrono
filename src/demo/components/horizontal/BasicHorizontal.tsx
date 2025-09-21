import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent, useState } from 'react';
import Chrono from '../../../components';
import { componentContainer, componentContainerDesktop, componentContainerBigScreen, componentContainerTablet, horizontal } from '../../App.css';

export interface BasicHorizontalProps {
  type: string;
  items: TimelineItemModel[];
}

export const BasicHorizontal: FunctionComponent<BasicHorizontalProps> = ({ 
  items 
}) => {
  const [itemSelected, setItemSelected] = useState(0);

  return (
    <div className={horizontal} id="horizontal">
      <span>{itemSelected}</span>
      <div className={componentContainerBigScreen} style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
        <Chrono
          items={items}
          mode="horizontal"
          onItemSelected={(selected) => setItemSelected(selected.index)}
          
          layout={{
            cardHeight: 450,
            cardWidth: 550,
            itemWidth: 300,
            pointSize: 20,
          }}
          
          content={{
            allowHTML: true,
          }}
          
          display={{
            pointShape: 'square',
          }}
          
          media={{
            height: 300,
            align: 'center',
            fit: 'cover',
          }}
          
          animation={{
            slideshow: {
              enabled: true,
              duration: 2550,
            },
          }}
          
          accessibility={{
            buttonTexts: {
              first: 'Jump to First',
              last: 'Jump to Last',
              next: 'Next',
              previous: 'Previous',
            },
          }}
          
          darkMode={{
            showToggle: true,
          }}
          
          googleFonts={{
            fontFamily: 'Roboto',
            elements: {
              title: { weight: 'bold', style: 'normal', size: '2.5rem' },
              cardTitle: { weight: 'medium', style: 'normal', size: '1.3rem' },
              cardSubtitle: { weight: 'normal', style: 'normal', size: '1rem' },
              cardText: { weight: 'light', style: 'normal', size: '0.9rem' },
              controls: { weight: 'medium', style: 'normal', size: '0.85rem' },
            }
          }}
        >
          <div className="chrono-icons">
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
            <img src="color-circle.svg" alt="github" />
          </div>
        </Chrono>
      </div>
    </div>
  );
}; 