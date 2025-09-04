import React, { FunctionComponent } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';
import { mixedTimeline } from '../../data';

export interface MixedVerticalProps {
  type: string;
  cardHeight?: number;
}

export const MixedVertical: FunctionComponent<MixedVerticalProps> = ({ 
  type, 
  cardHeight 
}) => (
  <div className={vertical}>
    <div className={
      type === 'desktop' ? componentContainerTreeDesktop :
      type === 'big-screen' ? componentContainerTreeBigScreen :
      type === 'tablet' ? componentContainerTreeTablet :
      type === 'mobile' ? componentContainerTreeMobile :
      componentContainerTree
    }>
      <Chrono
        items={mixedTimeline}
        mode="VERTICAL"
        
        layout={{
          cardHeight: cardHeight ?? 300,
          cardWidth: 550,
          timelineHeight: "80vh",
          scrollable: true,
        }}
        
        animation={{
          slideshow: {
            enabled: true,
            duration: 2500,
          },
        }}
        
        darkMode={{
          showToggle: true,
        }}
        
        content={{
          allowHTML: true,
        }}
        
        display={{
          toolbar: {
            enabled: true,
            sticky: true,
          },
        }}
        
        style={{
          googleFonts: {
            fontFamily: 'Source Sans Pro',
            elements: {
              title: { weight: 'bold', style: 'normal', size: '3rem' },
              cardTitle: { weight: 'semi-bold', style: 'normal', size: '1.4rem' },
              cardSubtitle: { weight: 'normal', style: 'italic', size: '1.1rem' },
              cardText: { weight: 'light', style: 'normal', size: '1rem' },
              controls: { weight: 'medium', style: 'normal', size: '0.9rem' },
            }
          }
        }}
      />
    </div>
  </div>
);