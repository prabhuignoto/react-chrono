import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface NestedVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const NestedVertical: FunctionComponent<NestedVerticalProps> = ({ 
  type, 
  items 
}) => (
  <div className={vertical} id="vertical">
    <div className={
      type === 'desktop' ? componentContainerTreeDesktop :
      type === 'big-screen' ? componentContainerTreeBigScreen :
      type === 'tablet' ? componentContainerTreeTablet :
      type === 'mobile' ? componentContainerTreeMobile :
      componentContainerTree
    } style={{ minHeight: '1200px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
      <Chrono
        items={items}
        mode="horizontal"
        activeItemIndex={2}
        onItemSelected={(selected) => console.log(selected.index)}
        
        layout={{
          cardWidth: 650,
          cardHeight: 300,
          pointSize: 20,
        }}
        
        interaction={{
          focusOnLoad: true,
        }}
        
        content={{
          allowHTML: true,
        }}
        
        display={{
          scrollable: { scrollbar: false },
          toolbar: {
            sticky: false,
          },
        }}
        
        media={{
          height: 300,
          align: 'center',
        }}
        
        animation={{
          slideshow: {
            enabled: true,
            duration: 2500,
          },
        }}
        
        style={{
          fontSizes: {
            title: '0.6rem',
          },
          classNames: {
            cardText: 'custom-text',
          },
          googleFonts: {
            fontFamily: 'Roboto Slab',
            elements: {
              title: { weight: 'normal', style: 'normal', size: '1rem' },
              cardTitle: { weight: 'normal', style: 'normal', size: '1rem' },
              cardSubtitle: { weight: 'normal', style: 'italic', size: '1rem' },
              cardText: { weight: 'light', style: 'normal', size: '0.95rem' },
              controls: { weight: 'medium', style: 'normal', size: '0.875rem' },
            },
            weights: [300, 400, 500, 600, 700, 'italic'],
            display: 'swap',
            preconnect: true
          }
        }}
        
        darkMode={{
          showToggle: true,
        }}
      />
    </div>
  </div>
); 