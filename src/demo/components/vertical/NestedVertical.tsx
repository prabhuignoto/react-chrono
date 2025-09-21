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
    } style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
      <Chrono
        items={items}
        mode="HORIZONTAL"
        slideShow
        cardWidth={500}
        slideItemDuration={2500}
        scrollable={{ scrollbar: false }}
        onItemSelected={(selected) => console.log(selected.index)}
        
        style={{
          fontSizes: {
            title: '1rem',
          },
          googleFonts: {
            fontFamily: 'Roboto Slab',
            elements: {
              title: { weight: 'bold', style: 'normal', size: '1.8rem' },
              cardTitle: { weight: 'bold', style: 'normal', size: '1.3rem' },
              cardSubtitle: { weight: 'normal', style: 'italic', size: '1rem' },
              cardText: { weight: 'light', style: 'normal', size: '0.95rem' },
              controls: { weight: 'medium', style: 'normal', size: '0.875rem' },
            },
            weights: [300, 400, 500, 600, 700, 'italic'],
            display: 'swap',
            preconnect: true
          }
        }}
        
        focusActiveItemOnLoad
        activeItemIndex={2}
        mediaHeight={200}
        nestedCardHeight={100}
        cardHeight={300}
        timelinePointDimension={20}
        classNames={{
          cardText: 'custom-text',
        }}
        parseDetailsAsHTML
        enableDarkToggle
        mediaSettings={{ align: 'center' }}
        stickyToolbar={false}
      />
    </div>
  </div>
); 